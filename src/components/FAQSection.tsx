import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Crown } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

export const FAQSection: React.FC = () => {
  const { faqs } = STORE_CONFIG;
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative bg-[#060608] py-24 sm:py-32 border-t border-[#d4af37]/20 overflow-hidden">
      {/* Subtle Gold Ambient Lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#d4af37]/5 blur-[160px]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#121118] px-5 py-1.5 text-xs font-luxury font-bold uppercase tracking-[0.25em] text-[#fae596]">
            <Crown className="h-3.5 w-3.5 text-[#d4af37]" />
            <span>ANSWERS & ASSISTANCE</span>
          </div>
          <h2 className="mt-4 font-luxury text-3xl sm:text-5xl font-black text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9c978b] font-sans-body max-w-xl mx-auto leading-relaxed">
            Everything you need to know regarding TikTok UK monetized accounts, instant coin delivery, and Pakistan withdrawal setup.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-14 space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`overflow-hidden rounded-3xl transition-all duration-300 ${
                  isOpen
                    ? 'border border-[#d4af37]/60 bg-gradient-to-b from-[#14121b] to-[#0a0a0f] shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.15)]'
                    : 'obsidian-card'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                  id={`faq-btn-${faq.id}`}
                >
                  <span
                    className={`font-luxury text-base sm:text-lg font-bold transition-colors ${
                      isOpen ? 'text-[#fae596]' : 'text-white'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 border-[#d4af37] bg-[#d4af37]/20 text-[#fae596]'
                        : 'border-[#d4af37]/20 text-[#8e8a7e]'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm text-[#cbc6b8] leading-relaxed border-t border-[#d4af37]/15 pt-4 font-sans-body animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
