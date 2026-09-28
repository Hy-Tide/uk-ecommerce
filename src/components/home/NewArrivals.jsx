import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import { ROUTES } from '../../utils/constants';
import { FiArrowRight } from 'react-icons/fi';
import { getData } from '../../services/webservices';

const NewArrivals = ({ data }) => {
  const newArrivals = data?.data || [];

  if (newArrivals.length === 0) return null;

  return (
    <section className="container py-12 md:py-16">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10" data-aos="fade-up">
        <div>
          <span className="text-[#2E8B57] font-bold tracking-wider uppercase text-sm mb-2 block">Just Landed</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0C3823] tracking-tight">New Arrivals</h2>
        </div>
        <Link
          to={ROUTES.SHOP}
          className="text-[#0C3823] hover:text-[#FF6B00] font-bold text-sm inline-flex items-center gap-1.5 transition-colors mt-4 md:mt-0"
        >
          View All New Products <FiArrowRight size={16} />
        </Link>
      </div>

      {/* Grid */}
      <div className="flex overflow-x-auto snap-x snap-mandatory scroll-pl-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 sm:pb-0">
        {newArrivals.slice(0, 4).map((product, index) => (
          <div key={product._id || product.id || product.productId || index} data-aos="fade-up" data-aos-delay={index * 100} className="flex-shrink-0 w-[80%] sm:w-auto snap-start sm:snap-align-none">
            <ProductCard product={{ ...product, badge: { type: 'new' } }} removeImagePadding={true} />
          </div>
        ))}
      </div>

    </section>
  );
};

export default NewArrivals;
