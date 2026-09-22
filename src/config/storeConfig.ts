import { StoreConfig, Review } from '../types';

export const STORE_CONFIG: StoreConfig = {
  brandName: 'MR. 7',
  tagline: 'Premium TikTok Accounts & Live Gifting Services',
  heroSubtitle:
    'Premium TikTok digital services, UK accounts, live features and coin packages — with reliable customer support.',
  supportWhatsApp: '+92 307 7898599',
  supportWhatsAppRaw: '923077898599',
  supportEmail: 'mrsaller95@gmail.com',
  baseCoinRate: 5, // Rs. 5 per coin standard baseline

  products: [
    {
      id: 'uk-earning-account',
      name: 'UK Earning Account',
      subtitle: 'Official monetization ready account with live stream eligibility',
      price: 1500,
      originalPrice: 2000,
      isPopular: false,
      category: 'account',
      features: [
        'UK Earning Account',
        'Live feature opening included',
        'Support until earning',
        'Customer support',
        'Professional assistance',
      ],
    },
    {
      id: 'premium-uk-earning',
      name: 'PREMIUM UK EARNING PACKAGE',
      subtitle: 'VIP all-inclusive setup with free starter TikTok coins',
      price: 2000,
      originalPrice: 3000,
      isPopular: true,
      badge: 'MOST POPULAR',
      category: 'account',
      features: [
        'UK Account',
        'Live feature opening included',
        'Support until earning',
        '120 FREE Coins included',
        'Customer support',
        'Premium VIP assistance',
      ],
    },
  ],

  coinPackages: [
    { id: 'coins-30', coins: 30, price: 180, perCoinRate: 6 },
    { id: 'coins-70', coins: 70, price: 350, perCoinRate: 5 },
    { id: 'coins-100', coins: 100, price: 500, perCoinRate: 5 },
    { id: 'coins-235', coins: 235, price: 1000, perCoinRate: 4.25, isBestValue: true },
    { id: 'coins-1000', coins: 1000, price: 5000, perCoinRate: 5 },
  ],

  paymentMethods: [
    {
      id: 'easypaisa',
      name: 'Easypaisa',
      type: 'manual',
      accountTitle: 'Abdul Rehman Ahmad',
      accountNumber: '0348-3025-551',
      badge: 'Fast Transfer',
      instructions: 'Transfer the exact order amount to the Easypaisa mobile account number below, take a screenshot of the receipt, and upload it.',
    },
    {
      id: 'sadapay',
      name: 'SadaPay',
      type: 'manual',
      accountTitle: 'Muhammad Yasir Hussain',
      accountNumber: '0309-490-2077',
      badge: 'Zero Fee',
      instructions: 'Send money to this SadaPay wallet number. Capture the payment confirmation screen and paste the reference ID.',
    },
    {
      id: 'meezan',
      name: 'Meezan Bank',
      type: 'manual',
      bankName: 'Meezan Bank Ltd',
      accountTitle: 'Abdul Rehman Ahmad',
      accountNumber: '00-3 00-11 31 30 3 03',
      badge: 'Bank Transfer',
      instructions: 'Deposit or transfer via online banking/ATM to the Meezan Bank account. Keep the transaction reference slip for verification.',
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      type: 'cod',
      badge: 'Direct WhatsApp',
      instructions: 'Pay directly on delivery/handover coordination. Clicking Place Order will immediately format and open WhatsApp to verify your location and dispatch.',
    },
  ],

  faqs: [
    {
      id: 'faq-1',
      question: 'How do I place an order?',
      answer:
        'Select any product (UK Earning Account, Premium Package, or TikTok Coins), click "BUY NOW", fill in your contact information, choose your preferred payment method (Easypaisa, SadaPay, Meezan Bank, or Cash on Delivery), and submit the order.',
    },
    {
      id: 'faq-2',
      question: 'What payment methods are available?',
      answer:
        'We accept Easypaisa (Abdul Rehman Ahmad), SadaPay (Muhammad Yasir Hussain), Meezan Bank wire transfer (Abdul Rehman Ahmad), and Cash on Delivery for coordinated orders.',
    },
    {
      id: 'faq-3',
      question: 'How do I send payment proof?',
      answer:
        'When you select manual payment in the checkout window, you will see an image upload box to attach your payment screenshot along with an input for your Transaction ID / Reference Number.',
    },
    {
      id: 'faq-4',
      question: 'How does the UK account package work?',
      answer:
        'We provide an authentic UK-region TikTok account configured for monetization eligibility. The package includes live streaming setup, complete configuration instructions, and continuous support until earning.',
    },
    {
      id: 'faq-5',
      question: 'How do I purchase custom coin quantities?',
      answer:
        'Use our interactive Custom Coin Calculator on the website. Simply enter any number of coins (such as 500, 10,000, 100,000, or 200,000) to see the exact price automatically calculated, then click BUY NOW.',
    },
    {
      id: 'faq-6',
      question: 'How can I contact support?',
      answer:
        'You can reach MR. 7 directly on WhatsApp at 0307-7898-599 or email us at mrsaller95@gmail.com. We provide responsive customer service.',
    },
    {
      id: 'faq-7',
      question: 'How long does order processing take?',
      answer:
        'Digital credentials and coin gifting transfers are initiated as soon as your payment proof is verified by our team, typically within 15 to 45 minutes.',
    },
  ],
};

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Hamza Malik',
    rating: 5,
    review:
      'Got the Premium UK Earning Package. The account was delivered within 30 minutes with live feature already enabled and 120 coins credited. Very trustworthy service in Pakistan.',
    date: 'March 18, 2026',
    location: 'Lahore, Pakistan',
    verified: true,
  },
  {
    id: 'rev-2',
    customerName: 'Usman Tariq',
    rating: 5,
    review:
      'Calculated 2,500 coins on the calculator, paid via SadaPay. Sent screenshot on WhatsApp and received live gifting directly during my stream. Professional assistance from MR. 7.',
    date: 'March 15, 2026',
    location: 'Karachi, Pakistan',
    verified: true,
  },
  {
    id: 'rev-3',
    customerName: 'Bilal Farooq',
    rating: 5,
    review:
      'Clean process and prompt response on WhatsApp 0307-7898-599. They helped me with UK account login and security steps patiently. Recommended for content creators.',
    date: 'March 10, 2026',
    location: 'Islamabad, Pakistan',
    verified: true,
  },
  {
    id: 'rev-4',
    customerName: 'Zeeshan Ali',
    rating: 5,
    review:
      'Ordered 1,000 coins package via Easypaisa. The transaction was verified smoothly without hassle. Smooth and respectful customer service.',
    date: 'March 04, 2026',
    location: 'Faisalabad, Pakistan',
    verified: true,
  },
];

/**
 * Calculates coin price based on preset deals or dynamic tiered pricing
 */
export function calculateCoinPrice(coins: number): number {
  if (coins <= 0) return 0;
  // Exact presets check
  const preset = STORE_CONFIG.coinPackages.find((p) => p.coins === coins);
  if (preset) return preset.price;

  // Custom quantities logic
  if (coins <= 30) return Math.round(coins * 6);
  if (coins <= 100) return Math.round(coins * 5);
  if (coins <= 500) return Math.round(coins * 4.8);
  if (coins <= 2000) return Math.round(coins * 4.5);
  if (coins <= 10000) return Math.round(coins * 4.4);
  return Math.round(coins * 4.3); // Bulk discount for high volume like 100K+
}
