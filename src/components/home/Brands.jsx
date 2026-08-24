import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { getData } from '../../services/webservices';

const Brands = ({ data }) => {
  const brands = data?.data || [];

  if (brands.length === 0) return null;

  const displayBrands = brands.slice(0, 12).map((b, i) => ({
    id: b._id || i,
    name: b.name,
    slug: b.slug,
    image: b.image_url,
    style: { color: 'text-[#0C3823]' } // Default color if no image
  }));

  return (
    <section className="bg-[#F8F9FA] py-10">
      <div className="container">

        {/* Section Header */}
        <h2 className="text-2xl md:text-3xl font-black text-[#0C3823] tracking-tight mb-6">
          Shop by brands
        </h2>

        {/* Brands Card Grid (2 Rows of 6) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayBrands.map((brand, index) => (
            <Link
              key={brand.id}
              to={ROUTES.BRAND_DETAILS ? ROUTES.BRAND_DETAILS.replace(':slug', brand.slug) : ROUTES.BRANDS}
              data-aos="fade-up"
              data-aos-delay={(index % 6) * 50}
              className="bg-[#F3F4F6] hover:bg-white rounded-2xl p-5 flex items-center justify-center h-20 transition-all duration-300 shadow-2xs hover:shadow-md border border-slate-200/50 group"
            >
              {brand.image ? (
                <img src={brand.image} alt={brand.name} className="max-h-12 max-w-full object-contain group-hover:scale-105 transition-transform" />
              ) : (
                <span className={`font-black text-sm md:text-base tracking-tight ${brand.style.color} group-hover:scale-105 transition-transform`}>
                  {brand.name}
                </span>
              )}
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Brands;
