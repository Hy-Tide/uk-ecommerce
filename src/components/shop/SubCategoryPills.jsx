import React, { useRef, useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const SubCategoryPills = ({ categories }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [categories]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
      // Small timeout to recheck scroll after smooth scrolling completes
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <div className="relative mb-6 pb-2 group flex items-center">
      {/* Left Button */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-2 w-12 bg-gradient-to-r from-[#fcfbf9] via-[#fcfbf9]/90 to-transparent z-10 flex items-center justify-start pointer-events-none">
          <button 
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-slate-200 flex items-center justify-center text-slate-600 hover:text-dark hover:border-[#379c6b] hover:shadow-md transition-all pointer-events-auto active:scale-95"
            aria-label="Scroll left"
          >
            <FiChevronLeft size={18} />
          </button>
        </div>
      )}

      {/* Scrollable Container */}
      <div 
        ref={scrollRef} 
        onScroll={checkScroll}
        className="flex items-center gap-3 overflow-x-auto hide-scrollbar scroll-smooth w-full py-1 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <button className="bg-[#e8f5ed] text-[#379c6b] font-bold text-sm px-5 py-2 rounded-xl whitespace-nowrap flex-shrink-0 shadow-sm transition-transform active:scale-95">All Products</button>
        {categories.map((sub, idx) => (
          <button key={sub._id || idx} className="bg-white border border-slate-200 text-slate-500 hover:text-dark hover:border-slate-300 font-bold text-sm px-5 py-2 rounded-xl whitespace-nowrap transition-all flex-shrink-0 shadow-sm hover:shadow active:scale-95">
            {sub.name || sub}
          </button>
        ))}
      </div>

      {/* Right Button */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-[#fcfbf9] via-[#fcfbf9]/90 to-transparent z-10 flex items-center justify-end pointer-events-none">
          <button 
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-slate-200 flex items-center justify-center text-slate-600 hover:text-dark hover:border-[#379c6b] hover:shadow-md transition-all pointer-events-auto active:scale-95"
            aria-label="Scroll right"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      )}
      
      {/* Inline styles for hide-scrollbar just in case */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SubCategoryPills;
