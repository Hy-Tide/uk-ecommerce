import React from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

const BlogSearchFilter = () => {
  const tags = ['Recipes', 'Health', 'Spices', 'Grocery Tips', 'Festivals', 'Nutrition', 'Vegan', 'Snacks'];

  return (
    <section className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-y border-slate-100 py-4 shadow-sm">
      <div className="container px-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative w-full lg:w-[400px]">
            <input 
              type="text" 
              placeholder="Search articles, recipes..." 
              className="w-full bg-[#fcfbf9] border border-slate-200 rounded-full pl-12 pr-4 py-3 outline-none focus:border-[#2E8B57] focus:ring-2 focus:ring-[#2E8B57]/10 transition-all font-medium text-slate-700"
            />
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          </div>

          {/* Filters & Tags */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 flex-grow justify-end overflow-hidden">
            
            {/* Dropdown */}
            <div className="flex items-center gap-2">
              <FiFilter className="text-slate-400" />
              <select className="bg-transparent font-bold text-slate-700 outline-none cursor-pointer">
                <option value="latest">Latest First</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending Now</option>
              </select>
            </div>

            <div className="w-px h-6 bg-slate-200 hidden md:block mx-2"></div>

            {/* Scrollable Tags */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar flex-grow md:max-w-[400px] xl:max-w-[600px] mask-fade-edges">
              {tags.map((tag, index) => (
                <button 
                  key={index}
                  className="whitespace-nowrap px-4 py-2 bg-slate-50 hover:bg-[#2E8B57] hover:text-white border border-slate-100 rounded-full text-sm font-medium text-slate-600 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            <button className="flex-shrink-0 flex items-center gap-1 text-sm font-bold text-slate-400 hover:text-rose-500 transition-colors">
              <FiX /> Clear Filters
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogSearchFilter;
