import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiMic, FiCommand } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';

const SmartRecipeSearch = () => {
  const popularSearches = [
    'Butter Chicken', 'Paneer', 'Dosa', 'Biryani', 'Chaat', 'Idli', 'Masala Tea', 'Sambar'
  ];

  return (
    <section className="w-full relative z-20 -mt-[40px] px-4 md:px-[80px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-[1000px] mx-auto bg-white rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row items-center gap-4">

          {/* Main Search Input */}
          <div className="relative flex-1 w-full">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-[24px]">
              <FiSearch />
            </div>
            <input
              type="text"
              placeholder="Search by recipe, ingredient, or cuisine..."
              className="w-full bg-[#FAFAF8] border-2 border-transparent focus:border-[#2E8B57]/30 focus:bg-white transition-all rounded-full py-5 pl-[60px] pr-[120px] text-[18px] text-[#294535] outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Search Button */}
          <button className="w-full md:w-auto bg-[#2E8B57] hover:bg-[#236b43] text-white px-10 py-5 rounded-full font-[600] text-[18px] transition-colors flex items-center justify-center gap-2 flex-shrink-0">
            Search
          </button>
        </div>

        {/* Popular Searches */}
        <div className="mt-8 flex flex-col md:flex-row items-start md:items-center gap-4">
          <span className="text-[#294535] font-[600] text-[15px] whitespace-nowrap">
            Popular Searches:
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {popularSearches.map((term, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-[#FAFAF8] hover:bg-[#2E8B57] hover:text-white text-[#6B7280] rounded-full text-[14px] font-[500] transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default SmartRecipeSearch;
