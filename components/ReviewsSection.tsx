
import React, { useState } from 'react';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

interface ReviewsSectionProps {
  targetName: string;
  userRole: string;
}

const StarRating: React.FC<{ rating: number; max?: number; size?: string; onRate?: (r: number) => void }> = ({ rating, max = 5, size = "w-5 h-5", onRate }) => {
  return (
    <div className="flex items-center">
      {[...Array(max)].map((_, i) => (
        <button 
            key={i} 
            type="button"
            disabled={!onRate}
            onClick={() => onRate && onRate(i + 1)}
            className={`${onRate ? 'cursor-pointer hover:scale-110 transition-transform focus:outline-none' : 'cursor-default'}`}
        >
            <svg 
                className={`${size} ${i < rating ? 'text-[#F9A826]' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        </button>
      ))}
    </div>
  );
};

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ targetName, userRole }) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      author: "James K.",
      rating: 5,
      date: "Oct 24, 2024",
      comment: "Excellent service! Very professional and helpful throughout the process.",
      avatar: "https://ui-avatars.com/api/?name=James+K&background=random"
    },
    {
      id: 2,
      author: "Linda M.",
      rating: 4,
      date: "Oct 20, 2024",
      comment: "Great experience overall, though communication could be slightly faster.",
      avatar: "https://ui-avatars.com/api/?name=Linda+M&background=random"
    }
  ]);

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLoggedIn = userRole !== 'guest';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating === 0) {
        alert("Please select a rating.");
        return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
        const newReview: Review = {
            id: Date.now(),
            author: "You (Demo User)",
            rating: newRating,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            comment: newComment,
            avatar: "https://ui-avatars.com/api/?name=You&background=0A2B4C&color=fff"
        };
        
        setReviews([newReview, ...reviews]);
        setNewRating(0);
        setNewComment("");
        setIsSubmitting(false);
    }, 1000);
  };

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 mt-8">
      <h3 className="text-xl font-bold text-[#0A2B4C] mb-6">Reviews &amp; Ratings</h3>
      
      <div className="flex flex-col md:flex-row items-center gap-8 mb-10 bg-gray-50 p-6 rounded-xl">
        <div className="text-center md:border-r border-gray-200 md:pr-8 w-full md:w-auto">
            <span className="block text-5xl font-extrabold text-[#0A2B4C]">{averageRating.toFixed(1)}</span>
            <div className="flex justify-center my-2">
                <StarRating rating={Math.round(averageRating)} size="w-5 h-5" />
            </div>
            <span className="text-sm text-gray-500 font-medium">{reviews.length} Reviews</span>
        </div>
        <div className="flex-1 w-full">
            {[5, 4, 3, 2, 1].map(star => {
                const count = reviews.filter(r => r.rating === star).length;
                const percentage = (count / reviews.length) * 100;
                return (
                    <div key={star} className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                        <span className="w-3 font-semibold">{star}</span>
                        <svg className="w-4 h-4 text-[#F9A826]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-[#F9A826] rounded-full" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <span className="w-8 text-right text-gray-500">{count}</span>
                    </div>
                );
            })}
        </div>
      </div>

      <div className="mb-10">
        <h4 className="font-bold text-lg text-gray-800 mb-4">Leave a Review</h4>
        {isLoggedIn ? (
            <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                    <StarRating rating={newRating} onRate={setNewRating} size="w-8 h-8" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Review</label>
                    <textarea 
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#F9A826] focus:ring-1 focus:ring-[#F9A826]" 
                        rows={4} 
                        placeholder={`Share your experience with ${targetName}...`}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-[#0A2B4C] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#08223c] transition-colors disabled:opacity-70 shadow-md"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        ) : (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-8 text-center">
                <p className="text-gray-600 mb-4">You must be logged in to leave a review.</p>
                <div className="flex justify-center gap-4">
                    <a href="#" className="px-6 py-2 bg-[#0A2B4C] text-white font-semibold rounded-lg hover:bg-[#08223c] transition-colors">Log In</a>
                    <a href="#" className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">Register</a>
                </div>
            </div>
        )}
      </div>

      <div className="space-y-6">
        {reviews.map(review => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <div className="flex gap-4">
                    <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white shadow-sm" />
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                            <h5 className="font-bold text-[#0A2B4C]">{review.author}</h5>
                            <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                        <div className="mb-2">
                            <StarRating rating={review.rating} size="w-3 h-3" />
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
