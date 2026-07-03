import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FiThumbsUp } from 'react-icons/fi';

const ProgressBar = ({ label, percentage, count }) => (
  <div className="flex items-center gap-3 text-sm mb-2">
    <span className="w-8 text-slate-500 font-bold">{label}</span>
    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-yellow-400 rounded-full" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <span className="w-10 text-right text-slate-400 font-medium">{percentage}%</span>
  </div>
);

const ReviewItem = ({ review }) => (
  <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm mb-4 last:mb-0">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-4">
        <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h4 className="font-bold text-dark">{review.name}</h4>
          <span className="text-xs text-slate-400">{review.date}</span>
        </div>
      </div>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar 
            key={star} 
            size={14} 
            className={star <= review.rating ? "text-yellow-400" : "text-slate-200"} 
          />
        ))}
      </div>
    </div>
    <p className="text-slate-500 text-sm leading-relaxed mb-4">{review.content}</p>
    <div className="flex items-center justify-end">
      <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#379c6b] transition-colors">
        <FiThumbsUp size={14} /> Helpful
      </button>
    </div>
  </div>
);

const CustomerReviews = ({ data }) => {
  if (!data) return null;

  return (
    <div className="mb-12">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-dark mb-1">Customer reviews</h2>
          <p className="text-sm text-slate-400">Read what our customers have to say about this product.</p>
        </div>
        <button className="bg-[#279c66] hover:bg-[#1f7e52] text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-colors shadow-sm active:scale-95 hidden sm:block">
          Write a review
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Summary */}
        <div className="w-full lg:w-1/3 bg-[#fcfbf9] p-8 rounded-[24px] border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)] self-start sticky top-[100px]">
          <div className="text-center mb-6">
            <span className="text-6xl font-black text-dark mb-2 block">{data.summary.average}</span>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar 
                  key={star} 
                  size={18} 
                  className={star <= Math.round(data.summary.average) ? "text-yellow-400" : "text-slate-200"} 
                />
              ))}
            </div>
            <span className="text-sm text-slate-500 font-medium">Based on {data.summary.total} reviews</span>
          </div>
          
          <div className="pt-6 border-t border-slate-100">
            <ProgressBar label="5 Star" percentage={data.summary.distribution[5]} count={data.summary.distribution[5]} />
            <ProgressBar label="4 Star" percentage={data.summary.distribution[4]} count={data.summary.distribution[4]} />
            <ProgressBar label="3 Star" percentage={data.summary.distribution[3]} count={data.summary.distribution[3]} />
            <ProgressBar label="2 Star" percentage={data.summary.distribution[2]} count={data.summary.distribution[2]} />
            <ProgressBar label="1 Star" percentage={data.summary.distribution[1]} count={data.summary.distribution[1]} />
          </div>
          
          {/* Mobile Write Review Button */}
          <button className="w-full mt-6 bg-[#279c66] hover:bg-[#1f7e52] text-white text-sm font-bold py-3 px-6 rounded-xl transition-colors shadow-sm active:scale-95 sm:hidden">
            Write a review
          </button>
        </div>

        {/* Right Reviews List */}
        <div className="w-full lg:w-2/3">
          {data.reviews.map(review => (
            <ReviewItem key={review.id} review={review} />
          ))}
          <button className="w-full py-4 bg-white border border-slate-200 hover:border-[#379c6b] hover:text-[#379c6b] text-slate-500 font-bold rounded-xl transition-all mt-4">
            Load more reviews
          </button>
        </div>

      </div>
    </div>
  );
};

export default CustomerReviews;
