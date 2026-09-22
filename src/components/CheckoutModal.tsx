import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Copy,
  Check,
  Upload,
  Sparkles,
  MessageCircle,
  AlertCircle,
  Crown,
} from 'lucide-react';
import { STORE_CONFIG, calculateCoinPrice } from '../config/storeConfig';
import { Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductId?: string;
  initialCustomCoins?: number;
  onOrderSuccess: (order: Order, whatsappUrl: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  initialProductId,
  initialCustomCoins,
  onOrderSuccess,
}) => {
  const { products, coinPackages, paymentMethods, supportWhatsAppRaw } = STORE_CONFIG;

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProductId || products[0].id
  );
  const [customCoins, setCustomCoins] = useState<number>(initialCustomCoins || 500);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('easypaisa');
  const [transactionId, setTransactionId] = useState('');
  const [screenshotData, setScreenshotData] = useState<string | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState('');

  // UI / Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync initial product if changed
  useEffect(() => {
    if (initialProductId) {
      setSelectedProductId(initialProductId);
    }
    if (initialCustomCoins) {
      setCustomCoins(initialCustomCoins);
      setSelectedProductId('custom-coins');
    }
  }, [initialProductId, initialCustomCoins, isOpen]);

  if (!isOpen) return null;

  // Calculate total amount dynamically
  const calculateTotal = (): number => {
    const qty = Math.max(1, quantity);
    if (selectedProductId === 'custom-coins') {
      return calculateCoinPrice(customCoins) * qty;
    }
    const coinPkg = coinPackages.find((p) => p.id === selectedProductId);
    if (coinPkg) {
      return coinPkg.price * qty;
    }
    const product = products.find((p) => p.id === selectedProductId);
    if (product) {
      return product.price * qty;
    }
    return 0;
  };

  const currentTotal = calculateTotal();

  // Find product display name
  const getSelectedProductName = (): string => {
    if (selectedProductId === 'custom-coins') {
      return `TikTok Coins (${customCoins.toLocaleString()} Coins)`;
    }
    const coinPkg = coinPackages.find((p) => p.id === selectedProductId);
    if (coinPkg) return `${coinPkg.coins.toLocaleString()} TikTok Coins Package`;
    const prod = products.find((p) => p.id === selectedProductId);
    return prod ? prod.name : 'Selected Item';
  };

  const currentMethod = paymentMethods.find((m) => m.id === selectedPaymentMethod);
  const isCod = selectedPaymentMethod === 'cod';

  // Handle Copy Number
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Handle Screenshot Upload with Drag and Drop & File Reader
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage('Image size should be less than 8MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setScreenshotData(reader.result as string);
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  // Submit Order
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMessage('Please enter a valid phone or WhatsApp number');
      return;
    }

    // For manual payment, require transaction ID or screenshot
    if (!isCod && !transactionId.trim() && !screenshotData) {
      setErrorMessage('Please provide either a Transaction ID or upload a payment screenshot');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          phone,
          productId: selectedProductId,
          quantity,
          customCoins: selectedProductId === 'custom-coins' ? customCoins : undefined,
          paymentMethod: currentMethod ? currentMethod.name : selectedPaymentMethod,
          transactionId: transactionId.trim() || undefined,
          screenshotUrl: screenshotData || undefined,
          additionalNotes: additionalNotes.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit order');
      }

      // If COD, automatically open WhatsApp with prepared message as instructed!
      if (isCod) {
        window.open(data.whatsappUrl, '_blank');
      }

      onOrderSuccess(data.order, data.whatsappUrl);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while submitting your order. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl my-auto rounded-3xl border border-[#d4af37]/50 bg-[#0d0d12] p-5 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,55,0.2)] text-[#ede9e1]">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 sm:right-6 sm:top-6 rounded-full border border-[#d4af37]/30 bg-[#16151f] p-2 text-[#9f9b92] hover:border-[#d4af37] hover:text-white transition-colors"
          id="checkout-close-btn"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-[#d4af37]/20 pb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d4af37]/50 bg-[#16141c] text-[#fae596] shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Crown className="h-5 w-5 text-[#d4af37]" />
          </div>
          <div>
            <h3 className="font-luxury text-xl sm:text-2xl font-black tracking-wide text-white">
              VIP Checkout
            </h3>
            <p className="text-xs text-[#9d978a] font-sans-body">
              MR. 7 Verified TikTok Order Processing
            </p>
          </div>
        </div>

        {/* Error notification banner */}
        {errorMessage && (
          <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-200">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="mt-6 space-y-6">
          {/* Step 1: Customer Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-luxury font-bold uppercase tracking-[0.2em] text-[#d4af37]">
              1. Customer Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#b5b1a7] mb-1">
                  Full Name <span className="text-[#fae596]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Abdul Rehman"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-xl border border-[#d4af37]/30 bg-[#060609] px-4 py-2.5 text-sm text-white placeholder-[#504e46] focus:border-[#d4af37] focus:outline-none"
                  id="checkout-fullname"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#b5b1a7] mb-1">
                  WhatsApp / Phone Number <span className="text-[#fae596]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0300-1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-[#d4af37]/30 bg-[#060609] px-4 py-2.5 text-sm text-white placeholder-[#504e46] focus:border-[#d4af37] focus:outline-none"
                  id="checkout-phone"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Product & Quantity Selection */}
          <div className="space-y-4 pt-2 border-t border-[#d4af37]/15">
            <h4 className="text-xs font-luxury font-bold uppercase tracking-[0.2em] text-[#d4af37]">
              2. Selected Product & Order Summary
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#b5b1a7] mb-1">
                  Selected Item
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full rounded-xl border border-[#d4af37]/30 bg-[#060609] px-4 py-2.5 text-sm text-white focus:border-[#d4af37] focus:outline-none"
                  id="checkout-product-select"
                >
                  <optgroup label="UK TikTok Accounts">
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — Rs. {p.price.toLocaleString()}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Pre-set Coin Packages">
                    {coinPackages.map((cp) => (
                      <option key={cp.id} value={cp.id}>
                        {cp.coins.toLocaleString()} TikTok Coins — Rs. {cp.price.toLocaleString()}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Custom Calculator">
                    <option value="custom-coins">
                      Custom Coin Quantity ({customCoins.toLocaleString()} Coins)
                    </option>
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#b5b1a7] mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  className="w-full rounded-xl border border-[#d4af37]/30 bg-[#060609] px-4 py-2.5 text-sm text-white focus:border-[#d4af37] focus:outline-none text-center font-bold"
                  id="checkout-quantity"
                />
              </div>
            </div>

            {/* If custom coins is selected, allow quick input */}
            {selectedProductId === 'custom-coins' && (
              <div className="p-3 rounded-xl border border-[#d4af37]/35 bg-[#16140e] flex items-center justify-between gap-4">
                <span className="text-xs text-[#fae596] font-semibold">Custom Coins Amount:</span>
                <input
                  type="number"
                  min="10"
                  value={customCoins}
                  onChange={(e) => setCustomCoins(Math.max(10, parseInt(e.target.value, 10) || 10))}
                  className="w-36 rounded-lg border border-[#d4af37]/40 bg-[#08070b] px-3 py-1.5 text-right font-luxury text-sm font-bold text-white focus:outline-none"
                />
              </div>
            )}

            {/* Total Amount Card */}
            <div className="flex items-center justify-between rounded-2xl border border-[#d4af37]/35 bg-[#14120e] p-4">
              <div>
                <span className="text-[11px] font-luxury font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                  Total Payable Amount
                </span>
                <p className="text-xs text-[#8f8b80] mt-0.5">{getSelectedProductName()}</p>
              </div>
              <div className="font-luxury text-2xl sm:text-3xl font-black gold-text-gradient">
                Rs. {currentTotal.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Step 3: Payment Method Selection */}
          <div className="space-y-4 pt-2 border-t border-[#d4af37]/15">
            <h4 className="text-xs font-luxury font-bold uppercase tracking-[0.2em] text-[#d4af37]">
              3. Select Payment Method
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {paymentMethods.map((method) => {
                const isSelected = selectedPaymentMethod === method.id;

                return (
                  <div
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`cursor-pointer rounded-2xl p-4 transition-all ${
                      isSelected
                        ? 'border-2 border-[#d4af37] bg-[#16140e] shadow-lg shadow-[#d4af37]/15'
                        : 'border border-[#d4af37]/20 bg-[#0a0a0f] hover:border-[#d4af37]/50'
                    }`}
                    id={`payment-method-${method.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-4 w-4 rounded-full border items-center justify-center ${
                            isSelected
                              ? 'border-[#d4af37] bg-[#d4af37]'
                              : 'border-[#4e4d45]'
                          }`}
                        >
                          {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-[#120f04]" />}
                        </div>
                        <span className="font-bold text-sm text-white">{method.name}</span>
                      </div>
                      {method.badge && (
                        <span className="rounded-full bg-[#d4af37]/20 px-2.5 py-0.5 text-[10px] font-bold text-[#fae596] border border-[#d4af37]/30">
                          {method.badge}
                        </span>
                      )}
                    </div>

                    {/* Method details */}
                    {method.accountTitle && (
                      <div className="mt-2 text-xs text-[#9f9b91]">
                        <span>Title: </span>
                        <strong className="text-[#e2ded5]">{method.accountTitle}</strong>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Selected Method Details Box */}
            {currentMethod && (
              <div className="rounded-2xl border border-[#d4af37]/35 bg-[#121118] p-4 sm:p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-luxury font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                      {currentMethod.name} Transfer Details
                    </span>
                    {currentMethod.accountTitle && (
                      <p className="text-sm font-semibold text-white mt-1">
                        Account Name: {currentMethod.accountTitle}
                      </p>
                    )}
                  </div>

                  {currentMethod.accountNumber && (
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(currentMethod.accountNumber!, currentMethod.id)
                      }
                      className="flex items-center gap-1.5 rounded-lg border border-[#d4af37]/50 bg-[#1c180e] px-3 py-1.5 text-xs font-bold text-[#fae596] hover:bg-[#d4af37] hover:text-[#120f04] transition-all"
                      id="copy-number-btn"
                    >
                      {copiedId === currentMethod.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span>COPIED!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>COPY NUMBER</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {currentMethod.accountNumber && (
                  <div className="rounded-xl border border-[#d4af37]/30 bg-[#060609] p-3 font-mono text-base font-bold text-[#fae596] tracking-wider flex items-center justify-between">
                    <span>{currentMethod.accountNumber}</span>
                  </div>
                )}

                <p className="text-xs text-[#9c978b] leading-relaxed">
                  {currentMethod.instructions}
                </p>
              </div>
            )}
          </div>

          {/* Step 4: Payment Confirmation Details */}
          {!isCod ? (
            <div className="space-y-4 pt-2 border-t border-[#d4af37]/15">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-luxury font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                  4. Payment Confirmation
                </h4>
                <span className="rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-2.5 py-0.5 text-[10px] font-luxury font-bold uppercase tracking-wider text-[#fae596]">
                  Verification Required
                </span>
              </div>

              {/* Transaction ID */}
              <div>
                <label className="block text-xs font-medium text-[#b5b1a7] mb-1">
                  Transaction ID / Reference Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. EP-92384912 or Sadapay Ref / TRX ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full rounded-xl border border-[#d4af37]/30 bg-[#060609] px-4 py-2.5 text-sm text-white placeholder-[#504e46] focus:border-[#d4af37] focus:outline-none font-mono"
                  id="checkout-trx-id"
                />
              </div>

              {/* Screenshot Upload */}
              <div>
                <label className="block text-xs font-medium text-[#b5b1a7] mb-1">
                  Upload Payment Screenshot
                </label>
                <label className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#d4af37]/30 bg-[#0a0a0f] p-4 text-center cursor-pointer hover:border-[#d4af37] transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="checkout-screenshot-input"
                  />
                  {screenshotData ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={screenshotData}
                        alt="Payment screenshot"
                        className="h-16 w-16 rounded-lg object-cover border border-[#d4af37]/50"
                      />
                      <div className="text-left">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Screenshot Attached
                        </span>
                        <p className="text-[11px] text-[#8e8a80] mt-0.5">Click to change screenshot</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-[#d4af37] mb-1" />
                      <span className="text-xs font-semibold text-[#dfdbd1]">
                        Tap to select or drag receipt image
                      </span>
                      <span className="text-[10px] text-[#73716a] mt-0.5">
                        Supports JPG, PNG (Max 8MB)
                      </span>
                    </>
                  )}
                </label>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-medium text-[#b5b1a7] mb-1">
                  Additional Notes (TikTok Username or Instructions)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. My TikTok username is @example, please confirm on WhatsApp"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="w-full rounded-xl border border-[#d4af37]/30 bg-[#060609] px-4 py-2 text-xs text-white placeholder-[#504e46] focus:border-[#d4af37] focus:outline-none"
                  id="checkout-notes"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3 pt-2 border-t border-[#d4af37]/15">
              <h4 className="text-xs font-luxury font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                4. Cash on Delivery Coordination
              </h4>
              <div className="rounded-xl border border-[#d4af37]/35 bg-[#16140e] p-4 text-xs text-[#ded9cc] leading-relaxed">
                <p className="font-bold text-white mb-1">Direct Verification Required:</p>
                When you click Place Order, we will register your order and open WhatsApp with your full order summary to finalize delivery and payment coordination.
              </div>

              {/* Additional Notes for COD */}
              <div>
                <label className="block text-xs font-medium text-[#b5b1a7] mb-1">
                  Delivery City / Address / Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="Enter your address or TikTok handle for coordination"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="w-full rounded-xl border border-[#d4af37]/30 bg-[#060609] px-4 py-2 text-xs text-white placeholder-[#504e46] focus:border-[#d4af37] focus:outline-none"
                  id="checkout-cod-notes"
                />
              </div>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-4 border-t border-[#d4af37]/20 flex flex-col gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="gold-shimmer-button w-full rounded-2xl py-4 text-xs sm:text-sm font-black uppercase tracking-[0.2em] shadow-[0_0_35px_rgba(212,175,55,0.35)] active:scale-95 disabled:opacity-50"
              id="checkout-submit-btn"
            >
              {isSubmitting ? (
                <span>PROCESSING ORDER...</span>
              ) : isCod ? (
                <span>PLACE ORDER & OPEN WHATSAPP</span>
              ) : (
                <span>SUBMIT ORDER (Rs. {currentTotal.toLocaleString()})</span>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#8e8a7d]">
              <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>Safe & Confidential. Direct VIP Support on WhatsApp: 0307-7898-599</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
