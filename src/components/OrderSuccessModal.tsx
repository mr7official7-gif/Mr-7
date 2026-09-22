import React from 'react';
import { CheckCircle2, MessageCircle, Copy, Check, X, ShieldAlert, ArrowRight } from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessModalProps {
  order: Order | null;
  whatsappUrl: string;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  whatsappUrl,
  onClose,
  onTrackOrder,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!order) return null;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isCod = order.paymentMethod.toLowerCase().includes('cash on delivery') || order.paymentMethod === 'cod';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl my-auto rounded-3xl border border-[#d4af37]/50 bg-[#0d0d12] p-6 sm:p-8 shadow-[0_0_70px_rgba(212,175,55,0.25)] text-[#f0ebe1]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 sm:right-6 sm:top-6 rounded-full border border-[#2e2d36] bg-[#16161c] p-2 text-[#9f9b91] hover:border-[#d4af37]/40 hover:text-white transition-colors"
          id="success-modal-close-btn"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Success Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d4af37] bg-gradient-to-br from-[#292211] to-[#121008] text-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <CheckCircle2 className="h-9 w-9 text-[#d4af37]" />
          </div>

          <h3 className="mt-4 font-luxury text-2xl sm:text-3xl font-black text-white">
            Order Submitted Successfully!
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#b2aea4]">
            Your order has been registered in the MR. 7 system.
          </p>

          {/* Order ID Banner */}
          <div className="mt-6 flex w-full items-center justify-between rounded-2xl border border-[#d4af37]/40 bg-[#16140e] p-4">
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9d988c]">
                Your Unique Order ID
              </span>
              <div className="font-luxury text-xl sm:text-2xl font-black tracking-wider text-[#f7e7a9]">
                {order.id}
              </div>
            </div>
            <button
              onClick={handleCopyOrderId}
              className="flex items-center gap-1.5 rounded-xl border border-[#d4af37]/40 bg-[#251f0f] px-3.5 py-2 text-xs font-bold text-[#f7e7a9] hover:bg-[#d4af37] hover:text-[#120f04] transition-all"
              id="copy-order-id-btn"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-400" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>COPY ID</span>
                </>
              )}
            </button>
          </div>

          {/* Verification Status Warning / Notice */}
          <div className="mt-4 flex w-full items-center gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200 text-left">
            <ShieldAlert className="h-5 w-5 shrink-0 text-amber-400" />
            <div>
              <strong className="block font-bold">
                {isCod ? 'CASH ON DELIVERY REGISTERED' : 'PAYMENT VERIFICATION REQUIRED'}
              </strong>
              <span>
                {isCod
                  ? 'Please share this order details on WhatsApp to confirm delivery details.'
                  : 'Our support team will verify your transaction screenshot and activate your service shortly.'}
              </span>
            </div>
          </div>

          {/* Order Details Summary Table */}
          <div className="mt-5 w-full space-y-2 rounded-2xl border border-[#24232c] bg-[#121217] p-4 text-xs text-left">
            <div className="flex justify-between border-b border-[#1f1e27] pb-2">
              <span className="text-[#8e8a80]">Customer Name:</span>
              <span className="font-semibold text-white">{order.customerName}</span>
            </div>
            <div className="flex justify-between border-b border-[#1f1e27] pb-2">
              <span className="text-[#8e8a80]">WhatsApp / Phone:</span>
              <span className="font-semibold text-white">{order.phone}</span>
            </div>
            <div className="flex justify-between border-b border-[#1f1e27] pb-2">
              <span className="text-[#8e8a80]">Product:</span>
              <span className="font-semibold text-[#f7e7a9]">{order.productName}</span>
            </div>
            <div className="flex justify-between border-b border-[#1f1e27] pb-2">
              <span className="text-[#8e8a80]">Quantity:</span>
              <span className="font-semibold text-white">{order.quantity}</span>
            </div>
            <div className="flex justify-between border-b border-[#1f1e27] pb-2">
              <span className="text-[#8e8a80]">Total Amount:</span>
              <span className="font-bold text-[#d4af37] text-sm">
                Rs. {order.amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#1f1e27] pb-2">
              <span className="text-[#8e8a80]">Payment Method:</span>
              <span className="font-semibold text-white">{order.paymentMethod}</span>
            </div>
            {order.transactionId && (
              <div className="flex justify-between">
                <span className="text-[#8e8a80]">Transaction / Ref ID:</span>
                <span className="font-mono font-bold text-[#65e896]">{order.transactionId}</span>
              </div>
            )}
          </div>

          {/* WhatsApp Notification Action */}
          <div className="mt-6 flex w-full flex-col gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black shadow-lg shadow-[#25D366]/20 transition-all hover:bg-[#20ba59] active:scale-95"
              id="success-whatsapp-notify-btn"
            >
              <MessageCircle className="h-5 w-5 fill-current" />
              <span>SEND ORDER NOTIFICATION ON WHATSAPP</span>
            </a>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onTrackOrder(order.id)}
                className="flex-1 rounded-xl border border-[#d4af37]/40 bg-[#171510] py-3 text-xs font-bold uppercase tracking-wider text-[#f7e7a9] hover:bg-[#d4af37] hover:text-[#120f04] transition-all"
                id="success-track-btn"
              >
                Track Order Status
              </button>

              <button
                onClick={onClose}
                className="rounded-xl border border-[#2b2a33] bg-[#141418] px-5 py-3 text-xs font-semibold text-[#a6a298] hover:text-white transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
