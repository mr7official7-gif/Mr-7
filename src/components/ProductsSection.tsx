import React from 'react';
import {
  Check,
  Sparkles,
  Flame,
  ArrowRight,
  ShieldCheck,
  Coins,
  Headphones,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

interface ProductsSectionProps {
  onSelectProduct: (productId: string) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onSelectProduct }) => {
  const { products } = STORE_CONFIG;

  return (
    <section
      id="uk-accounts"
      className="relative colorful-section-mesh py-24 sm:py-32 border-b border-[#00f2fe]/20 overflow-hidden"
    >
      {/* Colorful Ambient Lighting */}
      <div className="pointer-events-none absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-[#00f2fe]/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-[#fe2c55]/12 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00f2fe]/40 bg-[#071b26] px-5 py-1.5 text-xs font-luxury font-bold uppercase tracking-[0.25em] text-[#38bdf8] shadow-[0_0_20px_rgba(0,242,254,0.2)]">
            <Sparkles className="h-3.5 w-3.5 text-[#ffd700]" />
            <span>UK TIKTOK EARNING PACKAGES</span>
          </div>

          <h2 className="mt-4 font-luxury text-3xl sm:text-5xl font-black text-white leading-tight">
            Select Your <span className="colorful-luxury-text">Monetized UK Account</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#d1d5db] font-sans-body max-w-xl mx-auto leading-relaxed">
            Authentic UK-registered TikTok accounts with Creator Rewards eligibility, live stream broadcasting enabled, and dedicated earning support.
          </p>
        </div>

        {/* The 2 Side-by-Side Colorful UK Packages (1500 PKR & 2000 PKR) */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* ============================================================
              PACKAGE 1: UK Earning Account — Rs. 1,500 (Cyan / Blue Luxury)
              ============================================================ */}
          <div className="colorful-card-cyan rounded-3xl p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden">
            {/* Top Accent Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00f2fe] via-[#38bdf8] to-[#60a5fa]" />

            <div>
              {/* Badge & Title */}
              <div className="flex items-center justify-between">
                <span className="badge-cyan rounded-full px-3.5 py-1 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#00f2fe]" />
                  STARTER PACKAGE
                </span>
                <span className="font-mono text-xs font-bold text-[#9ca3af] line-through">
                  Rs. 2,000
                </span>
              </div>

              <h3 className="mt-5 font-luxury text-2xl sm:text-3xl font-black text-white">
                UK Earning Account
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#94a3b8] font-sans-body">
                Official monetization-ready account with live stream feature enabled.
              </p>

              {/* Price Banner */}
              <div className="mt-6 rounded-2xl border border-[#00f2fe]/30 bg-[#061822]/90 p-5 flex items-baseline justify-between shadow-inner">
                <div>
                  <span className="text-[10px] font-luxury font-bold uppercase tracking-[0.2em] text-[#38bdf8]">
                    Package Price
                  </span>
                  <div className="font-luxury text-3xl sm:text-4xl font-black text-[#00f2fe]">
                    Rs. 1,500
                  </div>
                </div>
                <span className="rounded-xl bg-[#00f2fe]/20 px-3 py-1 text-xs font-black text-[#7dd3fc] border border-[#00f2fe]/40">
                  SAVE RS. 500
                </span>
              </div>

              {/* Verified Features Checklist */}
              <div className="mt-8 space-y-3.5">
                <div className="text-xs font-luxury font-bold uppercase tracking-[0.15em] text-[#38bdf8]">
                  Included in 1500 Package:
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-[#cbd5e1]">
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00f2fe]/20 text-[#00f2fe]">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span>
                      <strong className="text-white">UK Earning Account:</strong> Clean UK IP creation
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00f2fe]/20 text-[#00f2fe]">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span>
                      <strong className="text-white">Live feature opening included</strong>
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00f2fe]/20 text-[#00f2fe]">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span>
                      <strong className="text-white">Support until earning:</strong> Complete guidance
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00f2fe]/20 text-[#00f2fe]">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span>
                      <strong className="text-white">Customer support:</strong> Active priority assistance
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00f2fe]/20 text-[#00f2fe]">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span>
                      <strong className="text-white">Professional assistance:</strong> Login credentials handover
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Order Now (Buy Now) Button */}
            <div className="mt-9 pt-6 border-t border-[#00f2fe]/20">
              <button
                onClick={() => onSelectProduct('uk-earning-account')}
                className="colorful-btn-cyan flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-xs sm:text-sm font-luxury font-black uppercase tracking-[0.2em] shadow-lg active:scale-95"
                id="buy-1500-pkg-btn"
              >
                <span>ORDER NOW — RS. 1,500</span>
                <ArrowRight className="h-4 w-4 stroke-[3]" />
              </button>
            </div>
          </div>

          {/* ============================================================
              PACKAGE 2: PREMIUM UK EARNING PACKAGE — Rs. 2,000 (Magenta / Gold Luxury)
              ============================================================ */}
          <div className="colorful-card-magenta rounded-3xl p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden ring-2 ring-[#fe2c55]/50">
            {/* Top Accent Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#fe2c55] via-[#f43f5e] to-[#ffd700]" />

            <div>
              {/* Badge & Title */}
              <div className="flex items-center justify-between">
                <span className="badge-magenta rounded-full px-3.5 py-1 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="h-3.5 w-3.5 text-[#fe2c55] fill-[#fe2c55]" />
                  MOST POPULAR • VIP
                </span>
                <span className="font-mono text-xs font-bold text-[#9ca3af] line-through">
                  Rs. 3,000
                </span>
              </div>

              <h3 className="mt-5 font-luxury text-2xl sm:text-3xl font-black text-white">
                PREMIUM UK EARNING PACKAGE
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#fda4af] font-sans-body">
                VIP all-inclusive setup with <strong className="text-white font-bold">120 FREE Starter TikTok Coins</strong>.
              </p>

              {/* Price Banner */}
              <div className="mt-6 rounded-2xl border border-[#fe2c55]/40 bg-[#250915]/90 p-5 flex items-baseline justify-between shadow-inner">
                <div>
                  <span className="text-[10px] font-luxury font-bold uppercase tracking-[0.2em] text-[#fda4af]">
                    VIP Package Price
                  </span>
                  <div className="font-luxury text-3xl sm:text-4xl font-black text-[#fe2c55]">
                    Rs. 2,000
                  </div>
                </div>
                <span className="rounded-xl bg-[#fe2c55]/25 px-3 py-1 text-xs font-black text-[#fecdd3] border border-[#fe2c55]/40">
                  SAVE RS. 1,000
                </span>
              </div>

              {/* Verified Features Checklist */}
              <div className="mt-8 space-y-3.5">
                <div className="text-xs font-luxury font-bold uppercase tracking-[0.15em] text-[#fda4af]">
                  Included in 2000 Premium Package:
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-[#cbd5e1]">
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fe2c55]/20 text-[#fe2c55]">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span>
                      <strong className="text-white">UK Earning Account:</strong> Full Creator Rewards eligibility
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fe2c55]/20 text-[#fe2c55]">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span>
                      <strong className="text-white">Live feature opening included</strong>
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ffd700]/25 text-[#ffd700]">
                      <Coins className="h-3.5 w-3.5 stroke-[2.5]" />
                    </div>
                    <span>
                      <strong className="text-[#ffd700]">120 FREE TikTok Coins included</strong> (Gifting ready!)
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fe2c55]/20 text-[#fe2c55]">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span>
                      <strong className="text-white">Support until earning:</strong> Step-by-step mentor guidance
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fe2c55]/20 text-[#fe2c55]">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span>
                      <strong className="text-white">Premium VIP assistance:</strong> 24/7 priority line
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Order Now (Buy Now) Button */}
            <div className="mt-9 pt-6 border-t border-[#fe2c55]/20">
              <button
                onClick={() => onSelectProduct('premium-uk-earning')}
                className="colorful-btn-magenta flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-xs sm:text-sm font-luxury font-black uppercase tracking-[0.2em] shadow-lg active:scale-95"
                id="buy-2000-pkg-btn"
              >
                <span>ORDER NOW — RS. 2,000 (VIP)</span>
                <ArrowRight className="h-4 w-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>

        {/* Assurance Bar */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#9ca3af] font-sans-body">
            🔒 Both packages come with instant delivery via WhatsApp, password change assistance, and complete security.
          </p>
        </div>
      </div>
    </section>
  );
};
