import React, { useState } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ShopSidebar from '../components/shop/ShopSidebar';
import ShopProductCard from '../components/shop/ShopProductCard';
import { shopProducts } from '../data/dummyData';
import Newsletter from '../components/home/Newsletter';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('Atta');

  // Filter products based on search query (mock)
  const results = shopProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="bg-[#fcfbf9] min-h-screen">
      <div className="container py-8">
        <Breadcrumbs paths={[{ name: 'Search Results' }]} />
        
        {/* Search Header */}
        <div className="bg-primary-100/50 rounded-3xl p-8 md:p-12 my-8 text-center border border-primary-100 relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-primary-200 rounded-full blur-3xl opacity-60"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-extrabold text-dark mb-6">
              Search Results for <span className="text-primary">"{searchQuery}"</span>
            </h1>
            
            <form className="relative flex items-center w-full max-w-lg mx-auto">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-14 py-4 rounded-full border border-slate-200 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark font-medium"
                placeholder="Search for products, brands..."
              />
              <button 
                type="submit" 
                className="absolute right-2 w-10 h-10 bg-primary hover:bg-primary-dark text-white rounded-full flex items-center justify-center transition-colors"
              >
                <FiSearch className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Layout Split */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          
          {/* Sidebar */}
          <div className="w-full lg:w-[280px] flex-shrink-0">
            <ShopSidebar />
          </div>

          {/* Main Content */}
          <div className="w-full lg:flex-grow">
            
            {/* Grid Header */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <h2 className="text-slate-600 font-medium text-sm">
                Found <span className="font-bold text-dark">{results.length} results</span>
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-sm font-medium hidden sm:inline">Sort by:</span>
                <button className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold text-dark hover:border-[#379c6b] transition-colors">
                  Relevance <FiChevronDown />
                </button>
              </div>
            </div>

            {/* Grid */}
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {results.map(product => (
                  <ShopProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiSearch className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-2">No products found</h3>
                <p className="text-slate-500 mb-6">We couldn't find anything matching "{searchQuery}"</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Pagination */}
            {results.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 font-bold hover:bg-slate-200 transition-colors">&lt;</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold shadow-md">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-500 font-bold hover:bg-slate-50 border border-slate-100 transition-colors">&gt;</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <Newsletter />
      </div>
    </div>
  );
};

export default Search;
