import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, X, CheckCircle2, User, Crown } from 'lucide-react';
import { Review } from '../types';
import { INITIAL_REVIEWS } from '../config/storeConfig';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {
        // fallback to initial
      });
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !reviewText.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          rating,
          review: reviewText,
          location: location.trim() || 'Pakistan',
        }),
      });
      const data = await res.json();
      if (res.ok && data.review) {
        setReviews([data.review, ...reviews]);
        setSubmittedFeedback(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmittedFeedback(false);
          setCustomerName('');
          setReviewText('');
          setLocation('');
        }, 1800);
      }
    } catch {
      // ignore
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="relative bg-[#060608] py-24 sm:py-32 border-t border-[#d4af37]/20 overflow-hidden">
      {/* Subtle Ambient Gold Lighting */}
      <div className="pointer-events-none absolute top-10 left-10 h-80 w-80 rounded-full bg-[#d4af37]/5 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[#fae596]/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#121118] px-4 py-1 text-xs font-luxury font-bold uppercase tracking-[0.25em] text-[#fae596]">
              <Crown className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>TESTIMONIALS & FEEDBACK</span>
            </div>
            <h2 className="mt-4 font-luxury text-3xl sm:text-5xl font-black text-white">
              Customer Experiences
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#9b968a] font-sans-body max-w-xl leading-relaxed">
              Real feedback from Pakistani content creators, live streamers, and agencies who trust MR. 7 for verified accounts and instant coins.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="gold-shimmer-button flex items-center gap-2 rounded-2xl px-6 py-3.5 text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(212,175,55,0.3)] active:scale-95"
            id="leave-review-open-btn"
          >
            <MessageSquarePlus className="h-4 w-4 text-[#120e03]" />
            <span>Leave a Review</span>
          </button>
        </div>

        {/* Review Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => {
            return (
              <div
                key={rev.id}
                className="obsidian-card flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Rating stars */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rev.rating
                            ? 'fill-[#d4af37] text-[#d4af37] drop-shadow-[0_0_6px_rgba(212,175,55,0.6)]'
                            : 'text-[#2a2933]'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="mt-4 text-xs sm:text-sm text-[#cac5b8] leading-relaxed italic font-sans-body">
                    "{rev.review}"
                  </p>
                </div>

                {/* Customer footer */}
                <div className="mt-6 flex items-center justify-between border-t border-[#d4af37]/15 pt-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#14131b] font-bold text-xs text-[#fae596]">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{rev.customerName}</h4>
                      {rev.location && (
                        <span className="text-[10px] text-[#8c887c]">{rev.location}</span>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-[#716d63]">{rev.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leave Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-[#d4af37]/50 bg-[#0e0e14] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.2)] text-[#ede9e1]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full border border-[#d4af37]/30 bg-[#16151f] p-1.5 text-[#9f9b92] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="font-luxury text-xl font-bold text-white">Share Your Experience</h3>
            <p className="text-xs text-[#9c978b] mt-1 font-sans-body">
              Your honest feedback helps the MR. 7 community.
            </p>

            {submittedFeedback ? (
              <div className="mt-6 flex flex-col items-center py-6 text-center">
                <CheckCircle2 className="h-12 w-12 text-[#d4af37]" />
                <h4 className="mt-3 font-luxury font-bold text-white">Thank You!</h4>
                <p className="text-xs text-[#b8b4aa] mt-1">Your review has been recorded.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-luxury font-bold uppercase tracking-wider text-[#d4af37] mb-1">
                    Your Name <span className="text-[#fae596]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Khan"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full rounded-xl border border-[#d4af37]/30 bg-[#060609] px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-luxury font-bold uppercase tracking-wider text-[#d4af37] mb-1">
                    City / Location (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lahore, Pakistan"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl border border-[#d4af37]/30 bg-[#060609] px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-luxury font-bold uppercase tracking-wider text-[#d4af37] mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setRating(num)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            num <= rating
                              ? 'fill-[#d4af37] text-[#d4af37]'
                              : 'text-[#2b2a36]'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-[#fae596] font-bold ml-2 font-luxury">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-luxury font-bold uppercase tracking-wider text-[#d4af37] mb-1">
                    Your Review <span className="text-[#fae596]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your experience with MR. 7 products or support..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full rounded-xl border border-[#d4af37]/30 bg-[#060609] px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="gold-shimmer-button w-full rounded-xl py-3 text-xs font-black uppercase tracking-[0.2em] shadow-lg disabled:opacity-50"
                  id="submit-review-btn"
                >
                  {isSubmitting ? 'Saving...' : 'Submit Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
