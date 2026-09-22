import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { STORE_CONFIG, INITIAL_REVIEWS, calculateCoinPrice } from './src/config/storeConfig';
import { Order, Review } from './src/types';

const app = express();
const PORT = 3000;

// Middleware for parsing JSON and large payload (screenshot data URLs)
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// In-memory store for Orders and Reviews
let orderSequence = 1;
const orders: Order[] = [
  {
    id: 'MR7-2026-0001',
    customerName: 'Ahmad Shah',
    phone: '03001234567',
    productId: 'premium-uk-earning',
    productName: 'PREMIUM UK EARNING PACKAGE',
    quantity: 1,
    amount: 2000,
    paymentMethod: 'Easypaisa',
    transactionId: 'EP-9821034',
    paymentStatus: 'Payment Verification',
    orderStatus: 'Processing',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    additionalNotes: 'Need urgent setup assistance on WhatsApp',
  },
];

let reviews: Review[] = [...INITIAL_REVIEWS];

/* ---------------- API ROUTES ---------------- */

// 1. Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', brand: STORE_CONFIG.brandName, timestamp: new Date().toISOString() });
});

// 2. Public Store Config
app.get('/api/config', (req: Request, res: Response) => {
  res.json(STORE_CONFIG);
});

// 3. Server-side price calculation & verification
app.post('/api/orders/calculate', (req: Request, res: Response) => {
  try {
    const { productId, quantity = 1, customCoins } = req.body;
    const qty = Math.max(1, parseInt(quantity, 10) || 1);

    if (productId === 'custom-coins') {
      const coins = parseInt(customCoins, 10) || 0;
      if (coins <= 0) {
        return res.status(400).json({ error: 'Coin quantity must be greater than 0' });
      }
      const unitPrice = calculateCoinPrice(coins);
      const total = unitPrice * qty;
      return res.json({
        productId,
        productName: `TikTok Coins (${coins.toLocaleString()} Coins)`,
        quantity: qty,
        coinCount: coins,
        unitPrice,
        amount: total,
        currency: 'PKR',
      });
    }

    // Check predefined coin package
    const coinPkg = STORE_CONFIG.coinPackages.find((p) => p.id === productId);
    if (coinPkg) {
      const total = coinPkg.price * qty;
      return res.json({
        productId,
        productName: `${coinPkg.coins.toLocaleString()} TikTok Coins Package`,
        quantity: qty,
        coinCount: coinPkg.coins,
        unitPrice: coinPkg.price,
        amount: total,
        currency: 'PKR',
      });
    }

    // Check main products
    const product = STORE_CONFIG.products.find((p) => p.id === productId);
    if (product) {
      const total = product.price * qty;
      return res.json({
        productId,
        productName: product.name,
        quantity: qty,
        unitPrice: product.price,
        amount: total,
        currency: 'PKR',
      });
    }

    return res.status(400).json({ error: 'Invalid product selected' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Calculation error' });
  }
});

// 4. Create Order
app.post('/api/orders', (req: Request, res: Response) => {
  try {
    const {
      customerName,
      phone,
      productId,
      quantity = 1,
      customCoins,
      paymentMethod,
      transactionId,
      screenshotUrl,
      additionalNotes,
    } = req.body;

    if (!customerName || !phone || !productId || !paymentMethod) {
      return res.status(400).json({ error: 'Please provide full name, phone number, product, and payment method' });
    }

    // Server-side recalculation of genuine amount
    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    let productName = '';
    let calculatedAmount = 0;
    let coinCount: number | undefined = undefined;

    if (productId === 'custom-coins') {
      const coins = parseInt(customCoins, 10) || 0;
      if (coins <= 0) return res.status(400).json({ error: 'Invalid custom coin count' });
      calculatedAmount = calculateCoinPrice(coins) * qty;
      productName = `TikTok Coins (${coins.toLocaleString()} Coins)`;
      coinCount = coins;
    } else {
      const coinPkg = STORE_CONFIG.coinPackages.find((p) => p.id === productId);
      if (coinPkg) {
        calculatedAmount = coinPkg.price * qty;
        productName = `${coinPkg.coins.toLocaleString()} TikTok Coins Package`;
        coinCount = coinPkg.coins;
      } else {
        const product = STORE_CONFIG.products.find((p) => p.id === productId);
        if (product) {
          calculatedAmount = product.price * qty;
          productName = product.name;
        } else {
          return res.status(400).json({ error: 'Product not recognized' });
        }
      }
    }

    orderSequence += 1;
    const year = new Date().getFullYear();
    const orderNumberStr = String(orderSequence).padStart(4, '0');
    const orderId = `MR7-${year}-${orderNumberStr}`;

    const isCod = paymentMethod.toLowerCase().includes('cash on delivery') || paymentMethod === 'cod';

    const newOrder: Order = {
      id: orderId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      productId,
      productName,
      quantity: qty,
      coinCount,
      amount: calculatedAmount,
      paymentMethod,
      transactionId: transactionId ? String(transactionId).trim() : undefined,
      screenshotUrl,
      additionalNotes: additionalNotes ? String(additionalNotes).trim() : undefined,
      paymentStatus: isCod ? 'Pending Payment' : 'Payment Verification',
      orderStatus: isCod ? 'Pending Payment' : 'Processing',
      createdAt: new Date().toISOString(),
    };

    orders.unshift(newOrder);

    // Format WhatsApp notification text as requested in prompt:
    const paymentStatusDisplay = isCod ? 'CASH ON DELIVERY (CONFIRMATION REQUIRED)' : 'PAYMENT VERIFICATION REQUIRED';
    const whatsappMessage = `NEW MR. 7 ORDER\n\nOrder ID: ${newOrder.id}\nCustomer Name: ${newOrder.customerName}\nPhone: ${newOrder.phone}\nProduct: ${newOrder.productName}\nQuantity: ${newOrder.quantity}\nAmount: Rs. ${newOrder.amount.toLocaleString()}\nPayment Method: ${newOrder.paymentMethod}\nTransaction ID: ${newOrder.transactionId || 'N/A'}\nPayment Status: ${paymentStatusDisplay}${newOrder.additionalNotes ? `\nNotes: ${newOrder.additionalNotes}` : ''}`;

    const whatsappUrl = `https://wa.me/${STORE_CONFIG.supportWhatsAppRaw}?text=${encodeURIComponent(whatsappMessage)}`;

    return res.status(201).json({
      order: newOrder,
      whatsappMessage,
      whatsappUrl,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to submit order' });
  }
});

// 5. Lookup Order
app.get('/api/orders/:identifier', (req: Request, res: Response) => {
  const identifier = req.params.identifier.trim().toLowerCase();
  const order = orders.find(
    (o) => o.id.toLowerCase() === identifier || o.phone.replace(/[^0-9]/g, '') === identifier.replace(/[^0-9]/g, '')
  );

  if (!order) {
    return res.status(404).json({ error: 'Order not found. Please verify your Order ID or Phone Number.' });
  }
  return res.json({ order });
});

// 6. Reviews List
app.get('/api/reviews', (req: Request, res: Response) => {
  res.json({ reviews });
});

// 7. Add Review
app.post('/api/reviews', (req: Request, res: Response) => {
  const { customerName, rating, review, location } = req.body;
  if (!customerName || !review || !rating) {
    return res.status(400).json({ error: 'Name, rating, and review text are required' });
  }

  const newReview: Review = {
    id: `rev-${Date.now()}`,
    customerName: String(customerName).trim(),
    rating: Math.min(5, Math.max(1, Number(rating))),
    review: String(review).trim(),
    location: location ? String(location).trim() : 'Pakistan',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    verified: false,
  };

  reviews.unshift(newReview);
  res.status(201).json({ review: newReview });
});

// 8. Future Payment Gateway Abstraction Endpoint (Stripe/JazzCash/PayMob ready)
app.post('/api/payment/gateway-initiate', (req: Request, res: Response) => {
  const { orderId, provider = 'generic_gateway' } = req.body;
  const order = orders.find((o) => o.id === orderId);
  if (!order) {
    return res.status(404).json({ error: 'Order not found for gateway processing' });
  }

  // Demonstration of gateway-ready payload structure
  res.json({
    provider,
    orderId: order.id,
    amount: order.amount,
    currency: 'PKR',
    status: 'initialized',
    redirectUrl: null,
    message: 'Manual payment active. When payment gateway keys are configured, redirect URL will be returned here.',
  });
});

/* ---------------- VITE / STATIC MIDDLEWARE ---------------- */
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[MR. 7] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
