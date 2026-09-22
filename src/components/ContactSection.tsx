import React from 'react';
import { MessageCircle, Mail, Headphones, Clock, Crown } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

export const ContactSection: React.FC = () => {
  const { supportWhatsApp, supportWhatsAppRaw, supportEmail } = STORE_CONFIG;

  const whatsappMessage = encodeURIComponent(
    'Assalam-o-Alaikum MR. 7 VIP Support, I need assistance regarding your TikTok accounts / coins.'
  );

  return (
    <section id="contact" className="relative bg-[#060608] py-24 sm:py-32 border-t border-[#d4af37]/20 overflow-hidden">
      {/* Subtle Gold Ambient Lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#d4af37]/5 blur-[160px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#121118] px-5 py-1.5 text-xs font-luxury font-bold uppercase tracking-[0.25em] text-[#fae596]">
            <Crown className="h-3.5 w-3.5 text-[#d4af37]" />
            <span>24/7 VIP CONCIERGE</span>
          </div>
          <h2 className="mt-4 font-luxury text-3xl sm:text-5xl font-black text-white">
            MR. 7 Support Desk
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9c978b] font-sans-body max-w-xl mx-auto leading-relaxed">
            Need consultation prior to ordering or require live assistance with TikTok account setup? Contact our team directly.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* WhatsApp Card */}
          <div className="flex flex-col justify-between rounded-3xl border border-emerald-500/40 bg-[#09170f] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(16,185,129,0.15)] hover:-translate-y-1 transition-all">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/40 bg-[#0c2417] text-emerald-400 shadow-lg">
                <MessageCircle className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-luxury text-2xl font-bold text-white">
                WhatsApp VIP Concierge
              </h3>
              <p className="mt-2 text-xs text-[#95a89b] font-sans-body leading-relaxed">
                Connect directly for instant responses, custom order placement, and live stream coin gifting assistance.
              </p>
              <div className="mt-6 font-mono text-2xl font-black text-[#86efac]">
                {supportWhatsApp}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-500/20">
              <a
                href={`https://wa.me/${supportWhatsAppRaw}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 text-xs font-luxury font-bold uppercase tracking-[0.2em] text-[#052110] hover:bg-emerald-400 active:scale-95 transition-all shadow-lg shadow-emerald-500/30"
                id="contact-whatsapp-btn"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Email Card */}
          <div className="obsidian-card flex flex-col justify-between rounded-3xl p-8 hover:-translate-y-1 transition-all">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/40 bg-[#16141c] text-[#fae596] shadow-lg">
                <Mail className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-luxury text-2xl font-bold text-white">
                VIP Email Inquiries
              </h3>
              <p className="mt-2 text-xs text-[#9c978b] font-sans-body leading-relaxed">
                Send official corporate inquiries, agency bulk coin procurement requests, or partnership proposals.
              </p>
              <div className="mt-6 font-mono text-base sm:text-lg font-bold text-[#fae596] break-all">
                {supportEmail}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#d4af37]/15">
              <a
                href={`mailto:${supportEmail}?subject=${encodeURIComponent(
                  'Inquiry regarding MR. 7 TikTok Services'
                )}`}
                className="gold-shimmer-button flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-xs font-black uppercase tracking-[0.2em] shadow-md active:scale-95 transition-all"
                id="contact-email-btn"
              >
                <Mail className="h-4 w-4 text-[#120e03]" />
                <span>SEND VIP EMAIL</span>
              </a>
            </div>
          </div>
        </div>

        {/* Operating Hours Note */}
        <div className="mt-10 flex items-center justify-center gap-2 rounded-2xl border border-[#d4af37]/25 bg-[#0e0e14] p-4 text-xs font-luxury font-bold text-[#a6a193]">
          <Clock className="h-4 w-4 text-[#d4af37]" />
          <span>Active Priority Support: 7 Days a Week • Direct Response via WhatsApp</span>
        </div>
      </div>
    </section>
  );
};
