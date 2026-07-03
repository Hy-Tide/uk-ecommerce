import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ShopHero from '../components/shop/ShopHero';
import ShopSidebar from '../components/shop/ShopSidebar';
import ShopProductCard from '../components/shop/ShopProductCard';
import QuickViewBlock from '../components/shop/QuickViewBlock';
import ProductScroller from '../components/shop/ProductScroller';
import { shopProducts, subCategories } from '../data/dummyData';
import Newsletter from '../components/home/Newsletter';

const Shop = () => {
  return (
    <div className="bg-[#fcfbf9] min-h-screen">
      <div className="container">
        {/* Top Breadcrumb */}
        <Breadcrumbs paths={[{ name: 'Shop', url: '/shop' }, { name: 'Atta & Flour' }]} />
        
        {/* Banner */}
        <ShopHero />

        {/* Layout Split */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          
          {/* Sidebar */}
          <div className="w-full lg:w-[280px] flex-shrink-0">
            <ShopSidebar />
          </div>

          {/* Main Content */}
          <div className="w-full lg:flex-grow">
            
            {/* Sub Categories Pills */}
            <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar mb-6 pb-2">
              <button className="bg-[#e8f5ed] text-[#379c6b] font-bold text-sm px-5 py-2 rounded-xl whitespace-nowrap">All Products</button>
              {subCategories.map((sub, idx) => (
                <button key={idx} className="bg-white border border-slate-200 text-slate-500 hover:text-dark hover:border-slate-300 font-bold text-sm px-5 py-2 rounded-xl whitespace-nowrap transition-colors">
                  {sub}
                </button>
              ))}
            </div>

            {/* Grid Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-dark font-bold text-lg"><span className="text-[#379c6b]">10 Products</span> in Atta & Flour</h2>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-sm font-medium">Sort by:</span>
                <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold text-dark hover:border-[#379c6b] transition-colors">
                  Best Selling <FiChevronDown />
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {shopProducts.map(product => (
                <ShopProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 font-bold hover:bg-slate-200 transition-colors">&lt;</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#379c6b] text-white font-bold shadow-md">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-500 font-bold hover:bg-slate-50 border border-slate-100 transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-500 font-bold hover:bg-slate-50 border border-slate-100 transition-colors">3</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-500 font-bold hover:bg-slate-50 border border-slate-100 transition-colors">&gt;</button>
            </div>
          </div>
        </div>

        {/* Quick View Block */}
        <QuickViewBlock />

        {/* Carousels */}
        <ProductScroller 
          title="Recently Viewed" 
          products={shopProducts.slice(0, 4)} 
          actionText=""
        />
        <ProductScroller 
          title="Recommended Products" 
          products={shopProducts.slice(4, 8)} 
          actionText="See more recommendations"
        />
      </div>

      <div className="mt-20">
        <Newsletter />
      </div>
    </div>
  );
};

export default Shop;
