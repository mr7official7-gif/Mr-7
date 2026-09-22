import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductsSection } from './components/ProductsSection';
import { CoinSection } from './components/CoinSection';
import { CoinCalculator } from './components/CoinCalculator';
import { TrustSection } from './components/TrustSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderLookupModal } from './components/OrderLookupModal';
import { Order } from './types';

export default function App() {
  // Modal & Flow states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>('uk-earning-account');
  const [selectedCustomCoins, setSelectedCustomCoins] = useState<number>(1000);

  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<string>('');

  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [trackOrderId, setTrackOrderId] = useState<string | undefined>(undefined);

  // Handlers
  const handleOpenCheckout = (productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setIsCheckoutOpen(true);
  };

  const handleBuyCustomCoins = (coinCount: number) => {
    setSelectedProductId('custom-coins');
    setSelectedCustomCoins(coinCount);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: Order, whatsappUrl: string) => {
    setIsCheckoutOpen(false);
    setSubmittedOrder(order);
    setSubmittedWhatsAppUrl(whatsappUrl);
    setIsSuccessOpen(true);
  };

  const handleTrackOrderFromSuccess = (orderId: string) => {
    setIsSuccessOpen(false);
    setTrackOrderId(orderId);
    setIsTrackOrderOpen(true);
  };

  const handleOpenTrackModal = () => {
    setTrackOrderId(undefined);
    setIsTrackOrderOpen(true);
  };

  const handleScrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#ede9e1] font-sans-body selection:bg-[#d4af37]/30 selection:text-[#f7e7a9]">
      {/* Top Luxury Navigation */}
      <Navbar
        onOpenCheckout={handleOpenCheckout}
        onOpenTrackOrder={handleOpenTrackModal}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero onBuyNow={() => handleOpenCheckout()} />

        {/* 2. UK Earning Accounts Products Section */}
        <ProductsSection onSelectProduct={handleOpenCheckout} />

        {/* 3. TikTok Coins Packages Section */}
        <CoinSection
          onSelectCoinPackage={handleOpenCheckout}
          onScrollToCalculator={handleScrollToCalculator}
        />

        {/* 4. Interactive Custom Coin Calculator */}
        <CoinCalculator onBuyCustomCoins={handleBuyCustomCoins} />

        {/* 5. Trust Badges & Safety Highlights */}
        <TrustSection />

        {/* 6. Customer Reviews & Experience */}
        <ReviewsSection />

        {/* 7. Frequently Asked Questions */}
        <FAQSection />

        {/* 8. MR. 7 Helpline & Direct Support */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Buy Now / Checkout Interface Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        initialProductId={selectedProductId}
        initialCustomCoins={selectedCustomCoins}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Success & WhatsApp Notification Modal */}
      <OrderSuccessModal
        order={submittedOrder}
        whatsappUrl={submittedWhatsAppUrl}
        onClose={() => setIsSuccessOpen(false)}
        onTrackOrder={handleTrackOrderFromSuccess}
      />

      {/* Live Order Status Tracking Modal */}
      <OrderLookupModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        initialOrderId={trackOrderId}
      />
    </div>
  );
}
