import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappMessage = encodeURIComponent(
    'Assalam-o-Alaikum, I want to know more about MR. 7 products and services.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Tooltip Pill */}
      {showTooltip && (
        <div className="mb-2.5 hidden sm:flex items-center gap-2 rounded-2xl border border-[#25D366]/40 bg-[#0c1a11]/95 px-3.5 py-2 text-xs text-[#d1fae5] shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2">
          <span className="h-2 w-2 rounded-full bg-[#25D366] animate-ping" />
          <span>Chat with MR. 7 Support</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="ml-1 text-[#6ee7a2] hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={`https://wa.me/${STORE_CONFIG.supportWhatsAppRaw}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-black shadow-[0_4px_25px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_35px_rgba(37,211,102,0.65)] active:scale-95"
        aria-label="Chat with MR. 7 on WhatsApp"
        id="floating-whatsapp-btn"
      >
        <MessageCircle className="h-7 w-7 fill-current text-white transition-transform group-hover:rotate-12" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4af37] opacity-75" />
          <span className="relative inline-flex h-4 w-4 rounded-full bg-[#d4af37]" />
        </span>
      </a>
    </div>
  );
};
