import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import { ROUTES } from '../../utils/constants';
import { FiArrowRight, FiThumbsUp } from 'react-icons/fi';
import { getData } from '../../services/webservices';

const RecommendedProducts = ({ data }) => {
  const recommended = data?.data || [];

  if (recommended.length === 0) return null;

  return (
    <section className="bg-[#F8F9FA] py-10">
      <div className="container">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6" data-aos="fade-up">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center">
              <FiThumbsUp size={16} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0C3823] tracking-tight">
              Recommended Products
            </h2>
          </div>

          <Link
            to={ROUTES.SHOP}
            className="text-[#FF6B00] hover:text-[#E05E00] font-bold text-xs md:text-sm inline-flex items-center gap-1.5 transition-colors"
          >
            View All <FiArrowRight size={16} />
          </Link>
        </div>

        {/* 4-Column Product Grid (Same List View) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommended.slice(0, 4).map((product, index) => (
            <div key={product._id || product.id} data-aos="fade-up" data-aos-delay={index * 80}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RecommendedProducts;
