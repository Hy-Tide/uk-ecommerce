import React from 'react';
import { Link } from 'react-router-dom';
import { newArrivals } from '../../data/dummyData';
import ProductCard from '../product/ProductCard';
import { ROUTES } from '../../utils/constants';
import { FiArrowRight } from 'react-icons/fi';

const NewArrivals = () => {
  return (
    <section className="py-16 bg-[#fafafa]">
      <div className="container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-0.5 bg-[#379c6b]"></div>
              <span className="text-[#379c6b] text-[10px] font-bold uppercase tracking-[0.2em]">Just Landed</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1c1f23] tracking-tight">New Arrivals</h2>
            <p className="text-slate-500 mt-1">Fresh stock just in — be the first to try them</p>
          </div>
          
          <Link to={ROUTES.SHOP} className="text-[#379c6b] font-bold text-sm border-b-[2px] border-[#379c6b] pb-0.5 inline-flex items-center gap-1 hover:text-[#1a5d2b] transition-colors">
            See All New <FiArrowRight size={14} />
          </Link>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 mt-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewArrivals;
