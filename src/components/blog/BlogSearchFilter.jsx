import React, { useState } from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

const BlogSearchFilter = ({ categories = [] }) => {
  const tags = categories.map(c => typeof c === 'string' ? c : c.name).filter(Boolean);
  const [activeTag, setActiveTag] = useState(tags[0] || null);

  return (
    <section className="sticky top-0 z-40 bg-[#FBF6EE]/95 backdrop-blur-lg border-b border-[#e8e0d4] py-4 shadow-[0_4px_20px_-4px_rgba(28,75,46,0.08)]">
      <div className="container px-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-4">

          {/* Search Bar */}
          <div className="relative w-full lg:w-[380px] flex-shrink-0">
            <input
              type="text"
              placeholder="Search articles, recipes..."
              className="w-full bg-[#FBF6EE] border border-slate-200 rounded-full pl-11 pr-4 py-2.5 outline-none focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/10 transition-all font-medium text-slate-700 text-sm"
            />
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-slate-200 hidden lg:block flex-shrink-0"></div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <FiFilter className="text-slate-400 text-sm" />
            <select className="bg-transparent font-bold text-slate-600 text-sm outline-none cursor-pointer">
              <option value="latest">Latest First</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending Now</option>
            </select>
          </div>

          {/* Divider */}
          {tags.length > 0 && <div className="w-px h-6 bg-slate-200 hidden md:block flex-shrink-0 mx-1"></div>}

          {/* Scrollable Tags */}
          {tags.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar flex-grow">
              {tags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTag(tag)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex-shrink-0 ${
                    activeTag === tag
                      ? 'bg-[#FF8A00] text-white shadow-sm shadow-[#FF8A00]/30'
                      : 'bg-slate-50 hover:bg-[#FF8A00]/10 hover:text-[#FF8A00] border border-slate-200 text-slate-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Clear */}
          <button
            onClick={() => setActiveTag(null)}
            className="flex-shrink-0 flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors"
          >
            <FiX size={14} /> Clear
          </button>

        </div>
      </div>
    </section>
  );
};

export default BlogSearchFilter;
