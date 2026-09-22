import React, { useState, useEffect } from 'react';
import { X, Search, Clock, CheckCircle2, AlertCircle, MessageCircle, Package, ArrowRight } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { STORE_CONFIG } from '../config/storeConfig';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({
  isOpen,
  onClose,
  initialOrderId,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialOrderId || '');
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialOrderId) {
      setSearchTerm(initialOrderId);
      fetchOrder(initialOrderId);
    }
  }, [initialOrderId, isOpen]);

  if (!isOpen) return null;

  const fetchOrder = async (query: string) => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError(null);
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(query.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Order not found');
      }

      setOrder(data.order);
    } catch (err: any) {
      setError(err.message || 'Unable to locate order. Please check the Order ID.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(searchTerm);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Completed':
      case 'Paid':
        return 'border-green-500/40 bg-green-950/40 text-green-300';
      case 'Payment Verification':
      case 'Processing':
        return 'border-amber-500/40 bg-amber-950/40 text-amber-300';
      case 'Cancelled':
        return 'border-red-500/40 bg-red-950/40 text-red-300';
      default:
        return 'border-[#d4af37]/40 bg-[#2b220d]/40 text-[#f7e7a9]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg my-auto rounded-3xl border border-[#d4af37]/40 bg-[#0d0d12] p-5 sm:p-8 shadow-[0_0_60px_rgba(212,175,55,0.2)] text-[#ede9e1]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 sm:right-6 sm:top-6 rounded-full border border-[#2e2d36] bg-[#16161c] p-2 text-[#9f9b91] hover:border-[#d4af37]/40 hover:text-white transition-colors"
          id="track-modal-close-btn"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#22212a] pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d4af37]/40 bg-[#221c0e] text-[#d4af37]">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-luxury text-xl sm:text-2xl font-black tracking-wide text-white">
              Track Order Status
            </h3>
            <p className="text-xs text-[#a39f96]">
              Enter your Order ID (e.g. MR7-2026-0001) or Phone Number
            </p>
          </div>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="mt-6 flex gap-2">
          <input
            type="text"
            required
            placeholder="e.g. MR7-2026-0001 or 03001234567"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 rounded-xl border border-[#2c2b36] bg-[#141419] px-4 py-3 text-sm text-white placeholder-[#504e57] focus:border-[#d4af37] focus:outline-none font-mono"
            id="track-search-input"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa7c11] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#141003] hover:brightness-110 active:scale-95 disabled:opacity-50"
            id="track-submit-search-btn"
          >
            {isLoading ? <Clock className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>

        {/* Error Feedback */}
        {error && (
          <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-200">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Order Details Display */}
        {order && (
          <div className="mt-6 space-y-4 rounded-2xl border border-[#d4af37]/30 bg-[#121217] p-5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-[#22212c] pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8e8a80]">Order ID</span>
                <h4 className="font-luxury text-lg font-bold text-white tracking-wider">{order.id}</h4>
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${getStatusBadge(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#8e8a80]">Customer:</span>
                <span className="font-medium text-white">{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e8a80]">Item:</span>
                <span className="font-semibold text-[#f7e7a9]">{order.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e8a80]">Quantity:</span>
                <span className="text-white">{order.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e8a80]">Amount:</span>
                <span className="font-bold text-[#d4af37]">Rs. {order.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e8a80]">Payment Method:</span>
                <span className="text-white">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e8a80]">Payment Status:</span>
                <span className="font-medium text-amber-300">{order.paymentStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e8a80]">Placed On:</span>
                <span className="text-[#a6a297]">{new Date(order.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#22212c]">
              <a
                href={`https://wa.me/${STORE_CONFIG.supportWhatsAppRaw}?text=${encodeURIComponent(
                  `Assalam-o-Alaikum, I am inquiring about Order ID: ${order.id} for ${order.productName}. Please share status update.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 py-2.5 text-xs font-semibold text-[#6ee7a2] hover:bg-[#25D366]/20 transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Ask Support on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
