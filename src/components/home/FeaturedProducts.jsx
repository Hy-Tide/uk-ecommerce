import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/dummyData';
import ProductCard from '../product/ProductCard';
import { ROUTES } from '../../utils/constants';
import { FiArrowRight } from 'react-icons/fi';

const FeaturedProducts = () => {
  // Use products from dummy data that match the screenshot
  const featured = products;

  const filters = ['All', 'Spices', 'Rice & Grains', 'Sweets', 'Snacks'];

  return (
    <section className="py-16 bg-[#fcfbf9]">
      <div className="container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-0.5 bg-primary"></div>
              <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Bestsellers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight">Featured Products</h2>
            <p className="text-slate-500 mt-1">Our most loved picks, trusted by thousands of families</p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter, idx) => (
              <button 
                key={idx}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-colors ${idx === 0 ? 'bg-[#379c6b] border-[#379c6b] text-white' : 'bg-white border-slate-200 text-dark hover:border-[#379c6b] hover:text-[#379c6b]'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mt-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 flex justify-center">
          <Link 
            to={ROUTES.SHOP} 
            className="inline-flex items-center gap-2 border-[1.5px] border-dark text-dark font-bold px-8 py-3.5 rounded-full hover:bg-dark hover:text-white transition-colors text-sm"
          >
            View All 5,000+ Products <FiArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
