import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import { ROUTES } from '../../utils/constants';
import { FiArrowRight } from 'react-icons/fi';
import { getData } from '../../services/webservices';

import ProductCardSkeleton from '../skeletons/ProductCardSkeleton';

const FeaturedProducts = ({ bestDealsData, limitedProductsData, isLoading }) => {
  const topDeals = bestDealsData?.data || [];
  const limitedProducts = limitedProductsData?.data || [];

  if (isLoading || (!bestDealsData && !limitedProductsData)) {
    return (
      <div className="bg-[#F8F9FA] py-12">
        <section className="container mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-black text-[#0C3823] tracking-tight">Today best deals for you!</h2>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory scroll-pl-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 sm:pb-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[80%] sm:w-auto snap-start sm:snap-align-none">
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (topDeals.length === 0 && limitedProducts.length === 0) return null;

  return (
    <div className="bg-[#F8F9FA] py-12">
      {/* Today best deals for you! Section */}
      {topDeals.length > 0 && (
        <section className="container mb-16">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-black text-[#0C3823] tracking-tight">{bestDealsData?.title || "Today best deals for you!"}</h2>
            <Link
              to={ROUTES.SHOP}
              className="text-[#FF6B00] hover:text-[#E05E00] font-bold text-xs md:text-sm inline-flex items-center gap-1.5 transition-colors"
            >
              View All <FiArrowRight size={16} />
            </Link>
          </div>

          {/* 4-Column Product Grid */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scroll-pl-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 sm:pb-0">
            {topDeals.map((product, index) => (
              <div key={product._id || product.productId || index} data-aos="fade-up" data-aos-delay={(index % 4) * 100} className="flex-shrink-0 w-[80%] sm:w-auto snap-start sm:snap-align-none">
                <ProductCard product={product} removeImagePadding={true} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Limited products Section */}
      {limitedProducts.length > 0 && (
        <section className="container">

          {/* Section Header */}
          <div className="flex items-center justify-between mb-6" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-black text-[#0C3823] tracking-tight">Limited products</h2>
            <Link
              to={ROUTES.SHOP}
              className="text-[#FF6B00] hover:text-[#E05E00] font-bold text-xs md:text-sm inline-flex items-center gap-1.5 transition-colors"
            >
              View All <FiArrowRight size={16} />
            </Link>
          </div>

          {/* 4-Column Product Grid with Stock Bars */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scroll-pl-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 sm:pb-0">
            {limitedProducts.map((product, index) => (
              <div key={product._id || product.id || product.productId || index} data-aos="fade-up" data-aos-delay={index * 100} className="flex-shrink-0 w-[80%] sm:w-auto snap-start sm:snap-align-none">
                <ProductCard product={product} showStockProgress={true} removeImagePadding={true} />
              </div>
            ))}
          </div>

        </section>
      )}
    </div>
  );
};

export default FeaturedProducts;
