import React from 'react';
import { Coins, Sparkles, Flame, ArrowRight, ShieldCheck, Zap, Calculator } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

interface CoinSectionProps {
  onSelectCoinPackage: (packageId: string) => void;
  onScrollToCalculator: () => void;
}

export const CoinSection: React.FC<CoinSectionProps> = ({
  onSelectCoinPackage,
  onScrollToCalculator,
}) => {
  const { coinPackages } = STORE_CONFIG;

  return (
    <section
      id="coins"
      className="relative colorful-section-mesh py-24 sm:py-32 border-b border-[#ffd700]/20 overflow-hidden"
    >
      {/* Background glow flares */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#ffd700]/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd700]/40 bg-[#1c1708] px-5 py-1.5 text-xs font-luxury font-bold uppercase tracking-[0.25em] text-[#fae596] shadow-[0_0_20px_rgba(255,215,0,0.2)]">
            <Coins className="h-3.5 w-3.5 text-[#ffd700]" />
            <span>INSTANT TIKTOK COINS</span>
          </div>

          <h2 className="mt-4 font-luxury text-3xl sm:text-5xl font-black text-white leading-tight">
            TikTok Coins <span className="gold-text-gradient">Packages</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#d1d5db] font-sans-body max-w-xl mx-auto leading-relaxed">
            Fast and secure TikTok coin recharge for PK live streams, matches, and gifting. Choose a package or calculate any custom quantity below.
          </p>
        </div>

        {/* Coin Packages Grid with Order Now Buttons */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coinPackages.map((pkg, idx) => {
            const isBest = pkg.isBestValue;
            const isLarge = pkg.coins >= 1000;

            return (
              <div
                key={pkg.id}
                className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                  isBest
                    ? 'colorful-card-magenta ring-2 ring-[#fe2c55]/60'
                    : isLarge
                    ? 'colorful-card-gold ring-2 ring-[#ffd700]/50'
                    : 'colorful-card-cyan'
                }`}
              >
                {/* Highlight Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/40">
                      <Coins className="h-4 w-4" />
                    </div>
                    <span className="font-luxury text-lg font-bold text-white">
                      {pkg.coins.toLocaleString()} Coins
                    </span>
                  </div>

                  {isBest ? (
                    <span className="badge-magenta rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                      <Flame className="h-3 w-3 text-[#fe2c55] fill-[#fe2c55]" />
                      BEST VALUE
                    </span>
                  ) : isLarge ? (
                    <span className="badge-gold rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-wider">
                      AGENCY BUNDLE
                    </span>
                  ) : (
                    <span className="badge-cyan rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-wider">
                      POPULAR
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="mt-6 my-4 p-4 rounded-2xl bg-black/40 border border-white/10">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-[#9ca3af] font-bold">
                      Payable Amount:
                    </span>
                    <span className="text-xs text-[#86efac] font-mono font-bold">
                      Rs. {(pkg.perCoinRate ?? (pkg.price / pkg.coins)).toFixed(2)}/coin
                    </span>
                  </div>
                  <div className="mt-1 font-luxury text-3xl font-black text-white">
                    Rs. {pkg.price.toLocaleString()}
                  </div>
                </div>

                {/* Benefits */}
                <ul className="space-y-2 text-xs text-[#cbd5e1] mb-6">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#86efac]" />
                    <span>Instant Live Stream Gifting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00f2fe]" />
                    <span>Recharge via TikTok UID / Username</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ffd700]" />
                    <span>100% Safe & Anti-Ban Delivery</span>
                  </li>
                </ul>

                {/* Action Button */}
                <button
                  onClick={() => onSelectCoinPackage(pkg.id)}
                  className={`w-full rounded-2xl py-3.5 text-xs font-luxury font-black uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${
                    isBest
                      ? 'colorful-btn-magenta'
                      : isLarge
                      ? 'gold-shimmer-button'
                      : 'colorful-btn-cyan'
                  }`}
                  id={`buy-coins-${pkg.id}`}
                >
                  <span>ORDER NOW (RS. {pkg.price.toLocaleString()})</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Scroll to Calculator CTA Bar */}
        <div className="mt-12 rounded-3xl border border-[#ffd700]/30 bg-gradient-to-r from-[#17140b]/90 via-[#1e1329]/90 to-[#0c1a24]/90 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#ffd700]/50 bg-[#251f08] text-[#ffd700]">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-luxury text-base font-bold text-white">
                Want a specific or custom quantity of coins?
              </h4>
              <p className="text-xs text-[#d1d5db]">
                Use our interactive coin calculator below to choose any amount with live price discounts.
              </p>
            </div>
          </div>

          <button
            onClick={onScrollToCalculator}
            className="shrink-0 flex items-center gap-2 rounded-2xl border border-[#ffd700]/60 bg-[#2b2108] px-6 py-3 text-xs font-luxury font-black uppercase tracking-[0.15em] text-[#fae596] hover:bg-[#ffd700] hover:text-[#120f04] transition-all"
            id="scroll-to-calculator-btn"
          >
            <span>OPEN COIN CALCULATOR</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
