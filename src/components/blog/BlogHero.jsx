import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiUsers, FiStar, FiCalendar } from 'react-icons/fi';

const BlogHero = () => {
  return (
    <section className="relative w-full min-h-[500px] md:min-h-[600px] flex flex-col justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=2000" 
          alt="Indian Spices and Groceries" 
          className="w-full h-full object-cover"
        />
        {/* Editorial Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D3B2A]/90 via-[#1D3B2A]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D3B2A]/90 via-transparent to-[#1D3B2A]/30"></div>
      </div>

      <div className="container relative z-10 px-4 pt-20 pb-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FF8A00]/20 backdrop-blur-md border border-[#FF8A00]/30 text-[#FF8A00] px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse"></span>
              Fresh Stories & Cooking Inspiration
            </div>

            {/* Large Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6">
              Discover Recipes, Grocery Tips & Healthy Living
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-xl font-medium">
              Stay updated with authentic Indian recipes, grocery guides, nutrition tips, seasonal specials, product spotlights, and cooking inspiration curated by our experts.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="#latest"
                className="bg-[#2E8B57] hover:bg-[#236b43] text-white font-bold text-base px-8 py-4 rounded-[16px] shadow-[0_8px_20px_rgba(46,139,87,0.3)] hover:-translate-y-1 transition-all duration-300"
              >
                Explore Latest Articles
              </a>
              <a 
                href="#categories"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-base px-8 py-4 rounded-[16px] hover:-translate-y-1 transition-all duration-300"
              >
                Browse Categories
              </a>
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-wrap items-center gap-6 md:gap-10 border-t border-white/10 pt-8"
        >
          <div className="flex items-center gap-3 text-white/90">
            <FiBookOpen className="text-[#FF8A00] text-xl" />
            <span className="font-bold text-sm">500+ Articles</span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <FiUsers className="text-[#FF8A00] text-xl" />
            <span className="font-bold text-sm">100K+ Monthly Readers</span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <FiStar className="text-[#FF8A00] text-xl" />
            <span className="font-bold text-sm">4.9★ Reader Rating</span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <FiCalendar className="text-[#FF8A00] text-xl" />
            <span className="font-bold text-sm">Weekly Fresh Content</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogHero;
