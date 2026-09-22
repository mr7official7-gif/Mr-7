import React from 'react';
import { MessageCircle, Mail, Crown, ShieldCheck } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

export const Footer: React.FC = () => {
  const { brandName, supportWhatsApp, supportWhatsAppRaw, supportEmail } = STORE_CONFIG;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#040406] border-t border-[#d4af37]/20 pt-16 pb-12 text-[#9a9587] overflow-hidden">
      {/* Subtle gold ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[700px] bg-gradient-to-t from-[#d4af37]/5 to-transparent blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d4af37]/50 bg-[#14121a] text-[#fae596] shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <span className="font-luxury text-xl font-black text-white">7</span>
              </div>
              <div>
                <span className="font-luxury text-xl font-black text-white">{brandName}</span>
                <p className="text-[10px] font-luxury font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                  TikTok Digital Boutique
                </p>
              </div>
            </div>
            <p className="text-xs text-[#8f8a7e] leading-relaxed font-sans-body">
              Specialized provider of authentic UK TikTok monetized accounts, Creator Rewards program activation, and instant coin packages across Pakistan.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-luxury text-sm font-bold uppercase tracking-[0.2em] text-[#fae596]">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs font-semibold text-[#a8a395]">
              <li>
                <a href="#hero" className="hover:text-[#fae596] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#uk-accounts" className="hover:text-[#fae596] transition-colors">
                  UK Earning Accounts
                </a>
              </li>
              <li>
                <a href="#coins" className="hover:text-[#fae596] transition-colors">
                  TikTok Coins Packages
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#fae596] transition-colors">
                  Custom Coin Calculator
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#fae596] transition-colors">
                  Verified Reviews
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#fae596] transition-colors">
                  FAQ & Order Help
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Payment Options Accepted */}
          <div>
            <h4 className="font-luxury text-sm font-bold uppercase tracking-[0.2em] text-[#fae596]">
              Accepted Payment
            </h4>
            <ul className="mt-4 space-y-2 text-xs font-medium text-[#a8a395]">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                <span>Easypaisa (Abdul Rehman Ahmad)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                <span>SadaPay (Muhammad Yasir Hussain)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                <span>Meezan Bank (Abdul Rehman Ahmad)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#fae596]" />
                <span>Cash on Delivery (Coordinated Handover)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Helpline */}
          <div>
            <h4 className="font-luxury text-sm font-bold uppercase tracking-[0.2em] text-[#fae596]">
              Helpline & Support
            </h4>
            <div className="mt-4 space-y-3 text-xs">
              <a
                href={`https://wa.me/${supportWhatsAppRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#86efac] hover:underline font-mono font-bold"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>{supportWhatsApp}</span>
              </a>
              <a
                href={`mailto:${supportEmail}`}
                className="flex items-center gap-2 text-[#fae596] hover:underline"
              >
                <Mail className="h-4 w-4" />
                <span>{supportEmail}</span>
              </a>
              <div className="flex items-center gap-2 text-[#807b70] pt-2">
                <ShieldCheck className="h-4 w-4 text-[#d4af37]" />
                <span>Encrypted & Confidential Transactions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-14 pt-8 border-t border-[#d4af37]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736e63]">
          <div>
            © {currentYear} {brandName}. All rights reserved. TikTok Digital Store Pakistan.
          </div>
          <div className="flex items-center gap-4 font-medium">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Customer Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
