import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const filterChips = [
  'All Reviews',
  'Spices & Masalas',
  'Fast Delivery',
  'Quality & Packaging'
];

const dummyReviews = [
  {
    id: 1,
    content: "I've been shopping at Grandma's Basket for over a year now, and I couldn't be happier. The variety of regional spices available is impressive. The checkout process is quick and efficient!",
    name: 'Tanvir Ahammed Tamim',
    role: "Grandma's Basket Customer",
    avatar: 'https://i.pravatar.cc/150?u=tanvir',
    bg: 'bg-[#0f4128]',
    accentColor: 'text-green-300',
    category: 'Spices & Masalas'
  },
  {
    id: 2,
    content: "Grandma's Basket has completely transformed my grocery shopping. The store is well-organized, produce is fresh, and next-day UK express delivery makes it my ultimate go-to store!",
    name: 'Sohidur Rahman',
    role: "Grandma's Basket Customer",
    avatar: 'https://i.pravatar.cc/150?u=sohidur',
    bg: 'bg-[#7a1817]',
    accentColor: 'text-red-300',
    category: 'Fast Delivery'
  },
  {
    id: 3,
    content: "Outstanding quality Indian spices and authentic flours! The Aashirvaad Atta and organic dal are always fresh, pure, and delivered in perfect sealed packaging across the UK.",
    name: 'Priya Sharma',
    role: "Grandma's Basket Customer",
    avatar: 'https://i.pravatar.cc/150?u=priya',
    bg: 'bg-[#1e2329]',
    accentColor: 'text-yellow-500',
    category: 'Quality & Packaging'
  }
];

const Testimonials = ({ data }) => {
  const [activeChip, setActiveChip] = useState('All Reviews');

  const apiReviews = Array.isArray(data) ? data : (data?.data || []);
  const reviewsData = apiReviews.length > 0 ? apiReviews : dummyReviews;

  const filteredReviews = activeChip === 'All Reviews'
    ? reviewsData.slice(0, 3)
    : reviewsData.filter(r => r.category === activeChip).slice(0, 3);

  return (
    <section className="py-16 bg-[#F8F9FA]">
      <div className="container">

        {/* Section Header & Chips */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0C3823]">
              What our customers say
            </h2>
            <p className="text-slate-500 text-xs md:text-sm mt-1 font-medium">
              Verified reviews from 50,000+ happy UK grocery shoppers
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-xs">
              <FiChevronLeft size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#0C3823] text-white flex items-center justify-center hover:bg-[#008851] transition-colors shadow-md">
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Category Chips Bar */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {filterChips.map(chip => (
            <button
              key={chip}
              onClick={() => setActiveChip(chip)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeChip === chip
                ? 'bg-[#0C3823] text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-[#0C3823] hover:text-[#0C3823]'
                }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Testimonials Up to 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(filteredReviews.length > 0 ? filteredReviews : reviewsData.slice(0, 3)).map((item, index) => (
            <div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`${item.bg} text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative min-h-[320px] group hover:-translate-y-1 transition-all duration-300`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <FaQuoteLeft className="text-white/30 text-3xl" />
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <FaStar key={s} className="text-[#FF6B00]" size={13} />
                    ))}
                  </div>
                </div>

                <p className="text-rose-50/90 text-xs md:text-sm leading-relaxed mb-6 font-normal">
                  "{item.content}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 mt-auto pt-4 border-t border-white/10">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-xs flex-shrink-0"
                />
                <div>
                  <h4 className="font-bold text-sm text-white leading-tight">{item.name}</h4>
                  <span className={`text-[11px] ${item.accentColor} font-medium block`}>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;

