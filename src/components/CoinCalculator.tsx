import React, { useState } from 'react';
import {
  Calculator,
  Coins,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingDown,
} from 'lucide-react';
import { calculateCoinPrice, STORE_CONFIG } from '../config/storeConfig';

interface CoinCalculatorProps {
  onBuyCustomCoins: (coinCount: number) => void;
}

const PRESET_AMOUNTS = [70, 235, 500, 1000, 2000, 5000];

export const CoinCalculator: React.FC<CoinCalculatorProps> = ({ onBuyCustomCoins }) => {
  const [coins, setCoins] = useState<number>(500);

  // Dynamic calculations
  const price = calculateCoinPrice(coins);
  const standardPrice = coins * STORE_CONFIG.baseCoinRate;
  const savings = Math.max(0, standardPrice - price);
  const effectiveRate = price / coins;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoins(parseInt(e.target.value, 10));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      setCoins(10);
    } else {
      setCoins(Math.max(10, Math.min(50000, val)));
    }
  };

  return (
    <section
      id="calculator"
      className="relative colorful-section-mesh py-24 sm:py-32 border-b border-[#00f2fe]/20 overflow-hidden"
    >
      {/* Colorful Ambient Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-[#00f2fe]/10 via-[#ffd700]/10 to-[#fe2c55]/10 blur-[160px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00f2fe]/40 bg-[#061824] px-5 py-1.5 text-xs font-luxury font-bold uppercase tracking-[0.25em] text-[#38bdf8] shadow-[0_0_20px_rgba(0,242,254,0.2)]">
            <Calculator className="h-3.5 w-3.5 text-[#ffd700]" />
            <span>CUSTOM QUANTITY QUOTATION</span>
          </div>

          <h2 className="mt-4 font-luxury text-3xl sm:text-5xl font-black text-white leading-tight">
            Interactive <span className="colorful-luxury-text">Coin Calculator</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#d1d5db] font-sans-body max-w-xl mx-auto leading-relaxed">
            Slide or enter any coin quantity to get real-time wholesale discounts. Click order to lock in your discounted rate.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="mt-14 rounded-3xl border border-[#00f2fe]/35 bg-gradient-to-b from-[#081824]/95 to-[#060a10]/95 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,242,254,0.15)] relative overflow-hidden backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls: 7 Cols */}
            <div className="lg:col-span-7 space-y-6">
              {/* Presets Pills */}
              <div>
                <label className="text-xs font-luxury font-bold uppercase tracking-[0.2em] text-[#38bdf8] block mb-2.5">
                  Popular Presets (Tap to Select)
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_AMOUNTS.map((amt) => {
                    const isSelected = coins === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setCoins(amt)}
                        className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                          isSelected
                            ? 'border-2 border-[#00f2fe] bg-[#00f2fe] text-[#031c26] shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                            : 'border border-[#00f2fe]/30 bg-[#061e2b]/60 text-[#cbd5e1] hover:border-[#00f2fe]/60'
                        }`}
                      >
                        {amt.toLocaleString()} Coins
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Number Input Box */}
              <div>
                <label className="text-xs font-luxury font-bold uppercase tracking-[0.2em] text-[#38bdf8] block mb-2">
                  Enter Custom Coins Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="10"
                    max="50000"
                    step="10"
                    value={coins}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border-2 border-[#00f2fe]/40 bg-[#04111a] px-5 py-4 font-luxury text-2xl sm:text-3xl font-black text-white focus:border-[#00f2fe] focus:outline-none shadow-inner"
                    id="coin-custom-input"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs font-luxury font-bold text-[#ffd700] bg-[#ffd700]/15 px-3 py-1.5 rounded-xl border border-[#ffd700]/30">
                    <Coins className="h-4 w-4" />
                    <span>COINS</span>
                  </div>
                </div>
              </div>

              {/* Range Slider */}
              <div>
                <div className="flex justify-between text-xs text-[#94a3b8] font-mono mb-2">
                  <span>10 Coins</span>
                  <span className="text-[#00f2fe] font-bold">Slide to adjust</span>
                  <span>10,000 Coins</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="10000"
                  step="10"
                  value={coins}
                  onChange={handleSliderChange}
                  className="w-full accent-[#00f2fe] h-2 bg-[#062436] rounded-lg cursor-pointer"
                  id="coin-range-slider"
                />
              </div>

              {/* Value indicators */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-[#9ca3af] block">
                    Per Coin Rate
                  </span>
                  <span className="text-sm font-bold text-[#86efac] font-mono">
                    Rs. {effectiveRate.toFixed(2)} / coin
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-[#9ca3af] block">
                    Discount Savings
                  </span>
                  <span className="text-sm font-bold text-[#ffd700] font-mono">
                    {savings > 0 ? `Rs. ${savings.toLocaleString()} Off` : 'Standard Rate'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Summary: 5 Cols */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#ffd700]/40 bg-gradient-to-b from-[#1f1908] to-[#0d0a03] p-6 shadow-2xl relative">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#ffd700]/20">
                  <span className="text-xs font-luxury font-bold uppercase tracking-[0.2em] text-[#fae596]">
                    Order Summary
                  </span>
                  <span className="badge-gold rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase">
                    INSTANT LOCK
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <span className="text-xs text-[#d1d5db]">Total Coins Selected:</span>
                    <div className="font-luxury text-3xl font-black text-white">
                      {coins.toLocaleString()} <span className="text-sm text-[#ffd700]">Coins</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#ffd700]/15">
                    <span className="text-xs text-[#fae596] font-bold uppercase tracking-wider">
                      Final Total Payable:
                    </span>
                    <div className="font-luxury text-3xl sm:text-4xl font-black text-[#ffd700]">
                      Rs. {price.toLocaleString()}
                    </div>
                  </div>

                  {savings > 0 && (
                    <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-xl">
                      <TrendingDown className="h-4 w-4 shrink-0" />
                      <span>You save Rs. {savings.toLocaleString()} on this custom tier!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Buy Custom Coins Button */}
              <div className="mt-8 pt-4 border-t border-[#ffd700]/20">
                <button
                  type="button"
                  onClick={() => onBuyCustomCoins(coins)}
                  className="colorful-btn-gradient w-full rounded-2xl py-4 text-xs sm:text-sm font-luxury font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(254,44,85,0.4)] active:scale-95"
                  id="calc-order-now-btn"
                >
                  <span>ORDER NOW ({coins.toLocaleString()} COINS)</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
