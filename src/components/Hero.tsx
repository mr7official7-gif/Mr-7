import React from 'react';
import { Sparkles, ShieldCheck, Zap, ArrowRight, Star, Coins, Flame, Check } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

interface HeroProps {
  onBuyNow: (productId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onBuyNow }) => {
  const { brandName } = STORE_CONFIG;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative colorful-hero-mesh pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden border-b border-[#00f2fe]/20"
    >
      {/* Dynamic Aurora Ambient Flares */}
      <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-gradient-to-r from-[#00f2fe]/20 via-[#a855f7]/20 to-[#fe2c55]/20 blur-[130px]" />
      <div className="pointer-events-none absolute -top-24 -left-20 h-80 w-80 rounded-full bg-[#00f2fe]/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 -right-20 h-96 w-96 rounded-full bg-[#fe2c55]/15 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Colorful Luxury Pill */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#00f2fe]/40 bg-[#0c1622]/80 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(0,242,254,0.25)] backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-[#00f2fe] animate-ping" />
          <Sparkles className="h-4 w-4 text-[#ffd700]" />
          <span className="colorful-luxury-text font-black">
            {brandName} • OFFICIAL TIKTOK DIGITAL STORE
          </span>
          <span className="hidden sm:inline rounded-full bg-[#fe2c55]/20 px-2 py-0.5 text-[10px] text-[#fe2c55] font-extrabold border border-[#fe2c55]/30">
            VERIFIED 2026
          </span>
        </div>

        {/* Main Headline */}
        <div className="mt-8 max-w-4xl mx-auto">
          <h1 className="font-luxury text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.15]">
            Premium <span className="colorful-luxury-text">TikTok Accounts</span> & Live Gifting
          </h1>
          <p className="mt-5 text-base sm:text-xl text-[#d1d5db] font-sans-body max-w-2xl mx-auto leading-relaxed">
            Authentic <strong className="text-[#00f2fe]">UK Creator Rewards</strong> earning accounts starting at just <strong className="text-[#ffd700]">Rs. 1,500</strong> and instant <strong className="text-[#fe2c55]">TikTok Coins</strong> delivery across Pakistan.
          </p>
        </div>

        {/* Primary Action Buttons (Buy Now & Packages) */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onBuyNow('uk-earning-account')}
            className="colorful-btn-gradient flex items-center justify-center gap-3 rounded-2xl px-8 py-4 text-sm font-luxury font-black uppercase tracking-[0.15em] shadow-[0_0_35px_rgba(254,44,85,0.4)] transition-all active:scale-95"
            id="hero-buy-now-btn"
          >
            <span>ORDER NOW (BUY NOW)</span>
            <ArrowRight className="h-4 w-4 stroke-[3]" />
          </button>

          <button
            onClick={() => scrollToSection('uk-accounts')}
            className="flex items-center justify-center gap-2 rounded-2xl border border-[#00f2fe]/60 bg-[#061e2a]/80 px-7 py-4 text-sm font-luxury font-bold uppercase tracking-[0.15em] text-[#00f2fe] hover:bg-[#00f2fe] hover:text-[#041219] shadow-[0_0_20px_rgba(0,242,254,0.25)] transition-all active:scale-95"
            id="hero-view-packages-btn"
          >
            <Sparkles className="h-4 w-4" />
            <span>UK PACKAGES (Rs. 1500 / 2000)</span>
          </button>

          <button
            onClick={() => scrollToSection('coins')}
            className="flex items-center justify-center gap-2 rounded-2xl border border-[#ffd700]/50 bg-[#211a08]/80 px-7 py-4 text-sm font-luxury font-bold uppercase tracking-[0.15em] text-[#fae596] hover:bg-[#ffd700] hover:text-[#120f04] shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all active:scale-95"
            id="hero-coins-btn"
          >
            <Coins className="h-4 w-4 text-[#ffd700]" />
            <span>TIKTOK COINS</span>
          </button>
        </div>

        {/* Colorful Quick Highlight Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto text-left">
          {/* Feature 1: UK 1500 PKR */}
          <div
            onClick={() => scrollToSection('uk-accounts')}
            className="cursor-pointer rounded-2xl border border-[#00f2fe]/40 bg-gradient-to-b from-[#08222e]/80 to-[#070d13]/90 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(0,242,254,0.15)] hover:border-[#00f2fe] hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#00f2fe]/20 px-3 py-1 text-[11px] font-black text-[#00f2fe] border border-[#00f2fe]/40">
                STARTER PKG
              </span>
              <span className="font-mono text-xs font-bold text-white/70">Rs. 2,000</span>
            </div>
            <div className="mt-3 font-luxury text-2xl font-black text-white">
              UK Account — <span className="text-[#00f2fe]">Rs. 1,500</span>
            </div>
            <p className="mt-1 text-xs text-[#9ca3af]">
              Live feature unlocked, UK IP creation & monetization ready.
            </p>
          </div>

          {/* Feature 2: UK 2000 PKR Premium */}
          <div
            onClick={() => scrollToSection('uk-accounts')}
            className="cursor-pointer rounded-2xl border border-[#fe2c55]/50 bg-gradient-to-b from-[#2a0e1a]/80 to-[#10070b]/90 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_25px_rgba(254,44,85,0.2)] hover:border-[#fe2c55] hover:-translate-y-1 transition-all relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 h-20 w-20 bg-[#fe2c55]/20 rounded-full blur-xl" />
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#fe2c55]/25 px-3 py-1 text-[11px] font-black text-[#fda4af] border border-[#fe2c55]/50 flex items-center gap-1">
                <Flame className="h-3 w-3 text-[#fe2c55] fill-[#fe2c55]" />
                MOST POPULAR
              </span>
              <span className="font-mono text-xs font-bold text-white/70">Rs. 3,000</span>
            </div>
            <div className="mt-3 font-luxury text-2xl font-black text-white">
              VIP Package — <span className="text-[#fe2c55]">Rs. 2,000</span>
            </div>
            <p className="mt-1 text-xs text-[#fca5a5]">
              Includes 120 FREE TikTok Coins + VIP earning guide.
            </p>
          </div>

          {/* Feature 3: Coins & Calculator */}
          <div
            onClick={() => scrollToSection('calculator')}
            className="cursor-pointer rounded-2xl border border-[#ffd700]/45 bg-gradient-to-b from-[#261d08]/80 to-[#110d04]/90 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,215,0,0.15)] hover:border-[#ffd700] hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#ffd700]/20 px-3 py-1 text-[11px] font-black text-[#ffd700] border border-[#ffd700]/40">
                INSTANT GIFTING
              </span>
              <span className="font-mono text-xs font-bold text-[#86efac]">Online Delivery</span>
            </div>
            <div className="mt-3 font-luxury text-2xl font-black text-white">
              Coins & Calculator
            </div>
            <p className="mt-1 text-xs text-[#d1d5db]">
              Packages from 30 coins or calculate custom live gift bundles.
            </p>
          </div>
        </div>

        {/* Live Safety Guarantee Bar */}
        <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-6 text-xs text-[#d1d5db] bg-[#0b0f16]/90 border border-[#00f2fe]/20 px-6 py-3 rounded-2xl shadow-lg">
          <span className="flex items-center gap-1.5 text-[#00f2fe] font-bold">
            <ShieldCheck className="h-4 w-4" /> 100% Genuine UK Verified
          </span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="flex items-center gap-1.5 text-[#86efac] font-bold">
            <Zap className="h-4 w-4" /> Instant Delivery on WhatsApp
          </span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="flex items-center gap-1.5 text-[#ffd700] font-bold">
            <Star className="h-4 w-4 fill-current" /> Easypaisa / SadaPay / COD
          </span>
        </div>
      </div>
    </section>
  );
};
