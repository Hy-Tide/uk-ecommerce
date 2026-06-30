import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/dummyData';
import { ROUTES } from '../../utils/constants';
import { FiArrowRight } from 'react-icons/fi';

const CategorySection = () => {
  return (
    <section className="bg-[#fcfbf9] py-16">
      <div className="container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-0.5 bg-primary"></div>
              <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Browse by Category</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight">Shop Your Favourites</h2>
            <p className="text-slate-500 mt-1">Everything from aromatic spices to freshly milled flours</p>
          </div>
          <Link to={ROUTES.SHOP} className="text-primary font-bold text-sm border-b-[2px] border-primary pb-0.5 inline-flex items-center gap-1 hover:text-primary-dark transition-colors">
            View All Categories <FiArrowRight size={14} />
          </Link>
        </div>
        
        {/* Carousel / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={ROUTES.SHOP_CATEGORY.replace(':category', category.slug)}
              className={`flex flex-col items-center justify-center p-6 rounded-[20px] transition-all duration-300 shadow-sm border border-slate-100 ${category.active ? 'bg-[#379c6b] text-white shadow-green-900/20 shadow-xl' : 'bg-white hover:border-primary/30 group'}`}
            >
              <div className={`w-[70px] h-[70px] rounded-full flex items-center justify-center text-3xl mb-4 ${category.active ? 'bg-white/20' : 'bg-slate-50 group-hover:bg-[#fcfbf9]'}`}>
                {category.active ? (
                   <div className="w-12 h-12 rounded-full bg-[#fde8e8] flex items-center justify-center">
                     {category.icon}
                   </div>
                ) : (
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <h3 className={`text-sm font-bold text-center mb-1 ${category.active ? 'text-white' : 'text-dark'}`}>
                {category.name}
              </h3>
              <span className={`text-[10px] ${category.active ? 'text-white/80' : 'text-slate-400'}`}>
                {category.count}
              </span>
            </Link>
          ))}
        </div>
        
        {/* Divider */}
        <div className="h-px w-full bg-slate-200 mt-12 hidden md:block"></div>
      </div>
    </section>
  );
};

export default CategorySection;
