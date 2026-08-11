import React from 'react';
import { Link } from 'react-router-dom';
import { recipes } from '../../data/dummyData';
import { ROUTES } from '../../utils/constants';
import { FiArrowRight, FiClock } from 'react-icons/fi';

const Recipes = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-0.5 bg-[#379c6b]"></div>
              <span className="text-[#379c6b] text-[10px] font-bold uppercase tracking-[0.2em]">Inspiration</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1c1f23] tracking-tight">Popular Recipes</h2>
            <p className="text-slate-500 mt-1">Cook like a pro with our authentic Indian recipes</p>
          </div>
          
          <Link to={ROUTES.RECIPES} className="text-[#379c6b] font-bold text-sm border-b-[2px] border-[#379c6b] pb-0.5 inline-flex items-center gap-1 hover:text-[#1a5d2b] transition-colors">
            All Recipes <FiArrowRight size={14} />
          </Link>
        </div>
        
        {/* Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <Link 
              key={recipe.id} 
              to={ROUTES.RECIPES}
              className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] border border-slate-100 group flex flex-col hover:-translate-y-1 transition-transform"
            >
              {/* Image Area */}
              <div className="relative h-[220px] overflow-hidden bg-slate-100">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Time Badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1.5 rounded-md flex items-center gap-1.5">
                  <FiClock size={12} className="text-orange-400" />
                  {recipe.time}
                </div>
              </div>
              
              {/* Content Area */}
              <div className="p-5 flex flex-col flex-grow">
                <span className="text-[#379c6b] text-[10px] font-bold uppercase tracking-widest mb-2 block">
                  {recipe.category}
                </span>
                <h3 className="font-black text-[#1c1f23] text-[17px] leading-tight mb-2 group-hover:text-[#379c6b] transition-colors">
                  {recipe.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mt-auto">
                  {recipe.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Recipes;
