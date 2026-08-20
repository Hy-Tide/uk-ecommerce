import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const reviewsData = [
  {
    id: 1,
    category: 'Spices & Masalas',
    bg: 'bg-[#0C3823]',
    accentColor: 'text-emerald-300',
    name: 'Tanvir Ahammed Tamim',
    role: "Grandma's Basket Customer",
    content: "I've been shopping at Grandma's Basket for over a year now, and I couldn't be happier. The variety of regional spices available is impressive. The checkout process is quick and efficient!",
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    category: 'Fast Delivery',
    bg: 'bg-[#700B0B]',
    accentColor: 'text-rose-200',
    name: 'Sohidur Rahman',
    role: "Grandma's Basket Customer",
    content: "Grandma's Basket has completely transformed my grocery shopping. The store is well-organized, produce is fresh, and next-day UK express delivery makes it my ultimate go-to store!",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    category: 'Quality & Packaging',
    bg: 'bg-[#162123]',
    accentColor: 'text-amber-300',
    name: 'Priya Sharma',
    role: "Grandma's Basket Customer",
    content: "Outstanding quality Indian spices and authentic flours! The Aashirvaad Atta and organic dal are always fresh, pure, and delivered in perfect sealed packaging across the UK.",
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80'
  }
];

const filterChips = [
  'All Reviews',
  'Spices & Masalas',
  'Fast Delivery',
  'Quality & Packaging'
];

const Testimonials = () => {
  const [activeChip, setActiveChip] = useState('All Reviews');

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
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

        {/* Feature Highlights Section */}
        <div className="mt-12">

          <div className="text-center max-w-2xl mx-auto mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-black text-[#0C3823] tracking-tight">
              We Provide the <span className="text-[#FF6B00]">Best Quality</span> in All of the UK
            </h2>
          </div>

          {/* 5 Vertical Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

            {/* Card 1 */}
            <div className="bg-[#F3F4F6] rounded-3xl p-6 flex flex-col items-center text-center hover:shadow-md transition-transform hover:-translate-y-1" data-aos="fade-up" data-aos-delay="50">
              <h4 className="font-bold text-[#0C3823] text-sm md:text-base leading-snug mb-8 min-h-[40px] flex items-center justify-center">
                Authentic Indian Spices & Groceries
              </h4>
              <div className="mt-auto w-24 h-24 flex items-center justify-center">
                <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
                  <path d="M20 50C20 68 33 82 50 82C67 82 80 68 80 50H20Z" fill="#FF6B00" stroke="#0C3823" strokeWidth="4" />
                  <ellipse cx="50" cy="50" rx="30" ry="8" fill="#FACC15" stroke="#0C3823" strokeWidth="3" />
                  <path d="M50 18C50 18 35 32 45 42C55 52 50 50 50 50" stroke="#008851" strokeWidth="4" strokeLinecap="round" />
                  <path d="M60 22C60 22 48 34 55 42" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F3F4F6] rounded-3xl p-6 flex flex-col items-center text-center hover:shadow-md transition-transform hover:-translate-y-1" data-aos="fade-up" data-aos-delay="100">
              <h4 className="font-bold text-[#0C3823] text-sm md:text-base leading-snug mb-8 min-h-[40px] flex items-center justify-center">
                Next-Day UK Express Delivery
              </h4>
              <div className="mt-auto w-24 h-24 flex items-center justify-center">
                <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
                  <rect x="15" y="35" width="45" height="35" rx="4" fill="#0C3823" stroke="#0C3823" strokeWidth="3" />
                  <path d="M60 45H75L85 55V70H60V45Z" fill="#FF6B00" stroke="#0C3823" strokeWidth="3" />
                  <circle cx="32" cy="72" r="7" fill="#FACC15" stroke="#0C3823" strokeWidth="3" />
                  <circle cx="70" cy="72" r="7" fill="#FACC15" stroke="#0C3823" strokeWidth="3" />
                  <path d="M10 42H22M5 52H18M12 62H25" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F3F4F6] rounded-3xl p-6 flex flex-col items-center text-center hover:shadow-md transition-transform hover:-translate-y-1" data-aos="fade-up" data-aos-delay="150">
              <h4 className="font-bold text-[#0C3823] text-sm md:text-base leading-snug mb-8 min-h-[40px] flex items-center justify-center">
                50,000+ Happy UK Families
              </h4>
              <div className="mt-auto w-24 h-24 flex items-center justify-center">
                <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
                  <path d="M50 15L62 38L88 42L69 60L74 85L50 73L26 85L31 60L12 42L38 38L50 15Z" fill="#FF6B00" stroke="#0C3823" strokeWidth="4" strokeLinejoin="round" />
                  <path d="M50 35C45 30 35 32 35 40C35 48 50 56 50 56C50 56 65 48 65 40C65 32 55 30 50 35Z" fill="#EF4444" stroke="#0C3823" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#F3F4F6] rounded-3xl p-6 flex flex-col items-center text-center hover:shadow-md transition-transform hover:-translate-y-1" data-aos="fade-up" data-aos-delay="200">
              <h4 className="font-bold text-[#0C3823] text-sm md:text-base leading-snug mb-8 min-h-[40px] flex items-center justify-center">
                100% Pure & Organic Certified
              </h4>
              <div className="mt-auto w-24 h-24 flex items-center justify-center">
                <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="32" fill="#10B981" stroke="#0C3823" strokeWidth="4" />
                  <path d="M35 50L45 60L65 38" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M50 12V6M50 94V88M12 50H6M94 50H88" stroke="#0C3823" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-[#F3F4F6] rounded-3xl p-6 flex flex-col items-center text-center hover:shadow-md transition-transform hover:-translate-y-1" data-aos="fade-up" data-aos-delay="250">
              <h4 className="font-bold text-[#0C3823] text-sm md:text-base leading-snug mb-8 min-h-[40px] flex items-center justify-center">
                Secure Payment & Easy Returns
              </h4>
              <div className="mt-auto w-24 h-24 flex items-center justify-center">
                <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none">
                  <path d="M50 15L80 28V50C80 68 67 82 50 88C33 82 20 68 20 50V28L50 15Z" fill="#8B5CF6" stroke="#0C3823" strokeWidth="4" />
                  <rect x="38" y="48" width="24" height="18" rx="3" fill="white" stroke="#0C3823" strokeWidth="3" />
                  <path d="M43 48V42C43 38 46 35 50 35C54 35 57 38 57 42V48" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;

