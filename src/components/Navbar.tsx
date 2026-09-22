import React, { useState } from 'react';
import { MessageCircle, Menu, X, Search, Sparkles, Shield, Crown, Star, ChevronRight, Coins } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

interface NavbarProps {
  onOpenCheckout: (productId?: string) => void;
  onOpenTrackOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCheckout, onOpenTrackOrder }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'UK Accounts (1500/2000)', href: '#uk-accounts' },
    { name: 'TikTok Coins', href: '#coins' },
    { name: 'Coin Calculator', href: '#calculator' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-2xl transition-all shadow-[0_12px_40px_rgba(0,0,0,0.9)]">
      {/* Top Colorful Animated Ticker */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0c1626] via-[#1a0c1a] to-[#141208] border-b border-[#00f2fe]/30 py-2 px-3">
        <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto text-[11px]">
          <div className="hidden sm:flex items-center gap-2 pl-2 font-bold tracking-widest text-[10px]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#00f2fe] animate-ping" />
            <span className="colorful-luxury-text font-black uppercase">LIVE VIP STORE ACTIVE</span>
          </div>

          <div className="overflow-hidden whitespace-nowrap w-full sm:w-auto flex-1 mx-4">
            <div className="animate-marquee-luxury inline-flex items-center gap-10 text-xs">
              <span className="inline-flex items-center gap-2 text-white">
                <span className="h-2 w-2 rounded-full bg-[#00f2fe]" />
                <span className="font-bold text-[#38bdf8]">UK Accounts:</span>
                <span className="text-white">Rs. 1,500 Starter & Rs. 2,000 VIP with 120 Coins</span>
              </span>
              <span className="text-[#ffd700]">◆</span>
              <span className="inline-flex items-center gap-2 text-white">
                <span className="h-2 w-2 rounded-full bg-[#fe2c55]" />
                <span className="font-bold text-[#fe2c55]">TikTok Coins:</span>
                <span className="text-[#fecdd3]">Direct Instant Recharge via UID & Live Support</span>
              </span>
              <span className="text-[#00f2fe]">◆</span>
              <span className="inline-flex items-center gap-2 text-white">
                <span className="h-2 w-2 rounded-full bg-[#86efac]" />
                <span className="font-bold text-[#86efac]">Guaranteed Handover:</span>
                <span className="text-[#d1fae5]">Within 5–15 Minutes with Full Recovery Access</span>
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 pr-2">
            <span className="text-[10px] text-[#86efac] font-mono tracking-wider bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
              WHATSAPP: 0307-7898-599
            </span>
          </div>
        </div>
      </div>

      {/* Main Colorful Luxury Navigation Bar */}
      <div className="border-b border-[#00f2fe]/20 bg-[#07080f]/95 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="group flex items-center gap-3.5"
            id="brand-logo"
          >
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#00f2fe]/60 bg-gradient-to-tr from-[#00f2fe]/30 via-[#a855f7]/30 to-[#fe2c55]/30 p-0.5 shadow-[0_0_25px_rgba(0,242,254,0.35)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_35px_rgba(254,44,85,0.5)]">
              <div className="flex h-full w-full items-center justify-center rounded-[12px] bg-[#07080e] border border-white/15">
                <span className="font-luxury text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] via-[#ffd700] to-[#fe2c55]">
                  7
                </span>
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#fe2c55] shadow-[0_0_10px_#fe2c55] animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-luxury text-2xl font-black tracking-[0.15em] text-white transition-colors group-hover:text-[#00f2fe]">
                  MR. <span className="colorful-luxury-text">7</span>
                </span>
                <span className="rounded-full bg-[#fe2c55]/20 px-2 py-0.5 text-[8px] font-extrabold tracking-widest text-[#fda4af] border border-[#fe2c55]/40 uppercase">
                  VERIFIED STORE
                </span>
              </div>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#9ca3af] font-sans-body font-bold">
                TIKTOK DIGITAL MARKETPLACE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="group relative text-xs font-bold uppercase tracking-[0.12em] text-[#d1d5db] transition-colors hover:text-[#00f2fe] focus:outline-none"
                id={`nav-link-${link.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              >
                <span>{link.name}</span>
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-[#00f2fe] to-[#fe2c55] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenTrackOrder}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-[#121622]/80 px-4 py-2.5 text-xs font-semibold text-[#e2e8f0] hover:border-[#00f2fe] hover:text-[#00f2fe] transition-all shadow-sm"
              id="nav-track-order-btn"
            >
              <Search className="h-3.5 w-3.5 text-[#00f2fe]" />
              <span>Track Order</span>
            </button>

            <a
              href={`https://wa.me/${STORE_CONFIG.supportWhatsAppRaw}?text=${encodeURIComponent(
                'Assalam-o-Alaikum MR. 7 VIP Support, I want to order TikTok UK accounts / coins.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-emerald-500/50 bg-[#092113] px-4 py-2.5 text-xs font-bold text-[#86efac] hover:bg-[#0c2f1b] hover:border-emerald-400 transition-all shadow-sm"
              id="nav-whatsapp-btn"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenCheckout()}
              className="colorful-btn-gradient flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-[0_0_25px_rgba(254,44,85,0.4)] active:scale-95"
              id="nav-buy-now-btn"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#ffd700]" />
              <span>ORDER NOW</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenTrackOrder}
              className="rounded-lg border border-[#00f2fe]/40 bg-[#0b1622] p-2 text-xs text-[#00f2fe]"
              title="Track Order"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg border border-white/20 bg-[#12141f] p-2 text-white hover:bg-white/10"
              aria-label="Toggle Navigation Menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-[#fe2c55]" /> : <Menu className="h-6 w-6 text-[#00f2fe]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-[#00f2fe]/30 bg-[#060810]/98 p-5 backdrop-blur-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-[#e2e8f0] hover:bg-[#0c1826] hover:text-[#00f2fe]"
              >
                <span>{link.name}</span>
                <ChevronRight className="h-4 w-4 text-[#00f2fe]/60" />
              </button>
            ))}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCheckout();
                }}
                className="colorful-btn-gradient flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg"
              >
                <Sparkles className="h-4 w-4 text-[#ffd700]" />
                <span>ORDER NOW / BUY NOW</span>
              </button>

              <a
                href={`https://wa.me/${STORE_CONFIG.supportWhatsAppRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-md"
              >
                <MessageCircle className="h-4 w-4" />
                <span>CHAT ON WHATSAPP (0307-7898-599)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
