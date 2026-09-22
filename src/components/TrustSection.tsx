import React from 'react';
import { Clock, Award, Headphones, MessageCircle, Lock, Crown, CheckCircle2, Star } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

export const TrustSection: React.FC = () => {
  const trustItems = [
    {
      icon: Clock,
      title: 'Ultra-Fast Handover',
      desc: '3-minute average delivery for coins and instant credential transfer for verified UK accounts.',
    },
    {
      icon: Lock,
      title: '100% Safe & Secure',
      desc: 'No TikTok account password ever required for coins recharge. Completely authentic protocol.',
    },
    {
      icon: Award,
      title: 'Monetization Guarantee',
      desc: 'Genuine UK-region accounts pre-checked for Creator Rewards Program and live gift eligibility.',
    },
    {
      icon: Headphones,
      title: 'VIP Order Guidance',
      desc: 'Step-by-step guidance on how to secure your UK account, change recovery emails, and configure tax info.',
    },
    {
      icon: MessageCircle,
      title: '24/7 WhatsApp Desk',
      desc: `Direct priority line to ${STORE_CONFIG.supportWhatsApp} for one-on-one personal customer assistance.`,
    },
  ];

  return (
    <section className="relative bg-[#060609] py-24 sm:py-32 border-t border-[#d4af37]/20 overflow-hidden">
      {/* Subtle Ambient Gold Lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-[#d4af37]/5 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#121118] px-5 py-1.5 text-xs font-luxury font-bold uppercase tracking-[0.25em] text-[#fae596] mb-3">
            <Crown className="h-3.5 w-3.5 text-[#d4af37]" />
            <span>THE MR. 7 STANDARD OF EXCELLENCE</span>
          </div>

          <h3 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Why Creators & Streamers Choose{' '}
            <span className="gold-text-gradient">MR. 7</span>
          </h3>

          <p className="mt-4 text-sm sm:text-base text-[#9a9588] max-w-2xl mx-auto font-sans-body leading-relaxed">
            Professional digital asset provision with uncompromised integrity, verified receipts, and direct customer care in Pakistan.
          </p>
        </div>

        {/* Verified Performance Stats */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-white">
          <div className="flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#121117] px-4 py-2 backdrop-blur-md">
            <CheckCircle2 className="h-4 w-4 text-[#d4af37]" />
            <span>2,450+ Verified Handlers in Pakistan</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#121117] px-4 py-2 backdrop-blur-md">
            <Star className="h-4 w-4 text-[#fae596] fill-[#fae596]" />
            <span>4.98 / 5 Rating from Top Streamers</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#121117] px-4 py-2 backdrop-blur-md">
            <Crown className="h-4 w-4 text-[#d4af37]" />
            <span>3-Minute Rapid Handover Avg</span>
          </div>
        </div>

        {/* Trust Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="obsidian-card group rounded-3xl p-7 text-center transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/35 bg-[#14131b] text-[#fae596] shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-7 w-7 text-[#d4af37]" />
                </div>
                <h4 className="mt-5 font-luxury text-base font-bold text-white transition-colors group-hover:text-[#fae596]">
                  {item.title}
                </h4>
                <p className="mt-2 text-xs text-[#8f8b80] leading-relaxed font-sans-body">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
