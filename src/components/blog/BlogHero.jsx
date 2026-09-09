import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiUsers, FiStar, FiArrowRight } from 'react-icons/fi';

const floatingChips = [
  { label: '🥗 Healthy Recipes', href: '#categories' },
  { label: '🌶️ Spice Guides', href: '#categories' },
  { label: '🪔 Festival Specials', href: '#categories' },
];

const BlogHero = ({ banner }) => {
  const displayTitle = banner?.title || "Discover Recipes, Grocery Tips & Living";
  const displayImage = banner?.image_url || "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=2000";
  const displayDesc = banner?.description || "Stay updated with authentic Indian recipes, grocery guides, nutrition tips, seasonal specials, product spotlights, and cooking inspiration.";

  return (
    <section className="relative w-full min-h-[520px] md:min-h-[620px] flex flex-col justify-center overflow-hidden bg-[#1D3B2A]">
      {/* Background Image & Editorial Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={displayImage}
          alt={displayTitle}
          className="w-full h-full object-cover"
        />
        {/* Editorial Dark Forest Green Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D3B2A]/97 via-[#1D3B2A]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D3B2A]/95 via-transparent to-[#1D3B2A]/40"></div>
      </div>

      <div className="container relative z-10 px-4 pt-16 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Content Column */}
          <div className="lg:col-span-7" data-aos="fade-right">

            {/* Small Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FF8A00]/20 backdrop-blur-md border border-[#FF8A00]/30 text-[#FF8A00] px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse"></span>
              Fresh Stories & Cooking Inspiration
            </div>

            {/* Large Heading */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-5"
              dangerouslySetInnerHTML={{ __html: displayTitle.replace('Grocery Tips', '<span class="text-[#FF8A00]">Grocery Tips</span>') }}
            />

            {/* Description */}
            <p className="text-lg text-white/80 leading-relaxed mb-7 max-w-xl font-medium">
              {displayDesc}
            </p>

            {/* Floating Category Chips */}
            <div className="flex flex-wrap items-center gap-2 mb-9">
              {floatingChips.map((chip) => (
                <a
                  key={chip.label}
                  href={chip.href}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white/90 hover:text-white text-sm font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
                >
                  {chip.label}
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="#latest"
                className="bg-[#FF8A00] hover:bg-[#e67a00] text-white font-bold text-base px-8 py-3.5 rounded-full shadow-[0_0_20px_rgba(255,138,0,0.4)] hover:shadow-[0_0_30px_rgba(255,138,0,0.6)] hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
              >
                Explore Articles <FiArrowRight size={20} />
              </a>
              <a
                href="#categories"
                className="bg-transparent hover:bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold text-base px-8 py-3.5 rounded-full hover:-translate-y-1 transition-all duration-300"
              >
                Browse Categories
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2.5 bg-white/10 border border-white/15 backdrop-blur-sm px-4 py-2.5 rounded-xl">
                <FiBookOpen className="text-[#FF8A00] text-lg flex-shrink-0" />
                <div>
                  <p className="text-white font-black text-sm leading-none">500+</p>
                  <p className="text-white/60 text-xs font-medium mt-0.5">Articles</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 bg-white/10 border border-white/15 backdrop-blur-sm px-4 py-2.5 rounded-xl">
                <FiUsers className="text-[#FF8A00] text-lg flex-shrink-0" />
                <div>
                  <p className="text-white font-black text-sm leading-none">100K+</p>
                  <p className="text-white/60 text-xs font-medium mt-0.5">Monthly Readers</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 bg-white/10 border border-white/15 backdrop-blur-sm px-4 py-2.5 rounded-xl">
                <FiStar className="text-[#FF8A00] text-lg flex-shrink-0" />
                <div>
                  <p className="text-white font-black text-sm leading-none">4.9 ★</p>
                  <p className="text-white/60 text-xs font-medium mt-0.5">Reader Rating</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
