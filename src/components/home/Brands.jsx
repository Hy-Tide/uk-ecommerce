import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { FiArrowRight } from 'react-icons/fi';

const Brands = () => {
  const brandList = [
    { name: 'MDH', letter: 'M', color: '#f97316', bg: '#fff7ed', category: 'Spices', count: '120 products' },
    { name: "Haldiram's", letter: 'H', color: '#f97316', bg: '#fff7ed', category: 'Snacks & Sweets', count: '340 products' },
    { name: 'Tilda', letter: 'T', color: '#16a34a', bg: '#f0fdf4', category: 'Rice', count: '45 products' },
    { name: 'Dabur', letter: 'D', color: '#0ea5e9', bg: '#f0f9ff', category: 'Health & Wellness', count: '88 products' },
    { name: 'Patanjali', letter: 'P', color: '#a855f7', bg: '#faf5ff', category: 'Natural & Organic', count: '210 products' },
    { name: 'Everest', letter: 'E', color: '#b91c1c', bg: '#fef2f2', category: 'Spices', count: '96 products' },
    { name: 'Aashirvaad', letter: 'A', color: '#15803d', bg: '#f0fdf4', category: 'Flour & Staples', count: '74 products' },
  ];

  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-0.5 bg-[#379c6b]"></div>
              <span className="text-[#379c6b] text-[10px] font-bold uppercase tracking-[0.2em]">Top Brands</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1c1f23] tracking-tight">Trusted Brands</h2>
            <p className="text-slate-500 mt-1">Only the most authentic brands, every product guaranteed</p>
          </div>
          <Link to={ROUTES.BRANDS} className="text-[#379c6b] font-bold text-sm border-b-[2px] border-[#379c6b] pb-0.5 inline-flex items-center gap-1 hover:text-[#1a5d2b] transition-colors">
            Browse All Brands <FiArrowRight size={14} />
          </Link>
        </div>
        
        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {brandList.map((brand, idx) => (
            <Link 
              key={idx} 
              to={ROUTES.BRANDS}
              className="bg-white rounded-[20px] p-6 flex flex-col items-center justify-center text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-slate-100 hover:-translate-y-1 transition-transform group"
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: brand.bg, color: brand.color }}
              >
                {brand.letter}
              </div>
              <h3 
                className="font-black text-[15px] mb-1.5"
                style={{ color: brand.color }}
              >
                {brand.name}
              </h3>
              <span className="text-[10px] text-slate-500 font-medium">{brand.category}</span>
              <span className="text-[9px] text-slate-400 mt-0.5">{brand.count}</span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Brands;
