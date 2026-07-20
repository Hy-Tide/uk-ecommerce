import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { getData } from '../services/webservices';

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBrands = async () => {
      const response = await getData('website/brands');
      if (response && response.success !== false && response.data && response.data.brands) {
        setBrands(response.data.brands);
      }
      setIsLoading(false);
    };
    fetchBrands();
  }, []);

  return (
    <div className="bg-[#fcfbf9] min-h-screen py-16">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-dark mb-4">Our Trusted Brands</h1>
          <p className="text-slate-500 text-lg">
            Discover our curated collection of authentic, premium brands sourced directly for the highest quality.
          </p>
        </div>

        {/* Brands Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20 font-bold text-slate-500 text-lg">Loading Brands...</div>
        ) : brands.length === 0 ? (
          <div className="flex justify-center py-20 font-bold text-slate-500 text-lg">No brands found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <Link 
                key={brand._id}
                to={ROUTES.BRAND_DETAILS ? ROUTES.BRAND_DETAILS.replace(':slug', brand.slug) : `${ROUTES.BRANDS}/${brand.slug}`}
                className="bg-white rounded-3xl p-6 flex flex-col items-center text-center shadow-sm border border-slate-100 hover:shadow-xl hover:border-[#379c6b]/30 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black mb-5 bg-slate-50 border border-slate-100 overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  {brand.image_url ? (
                    <img src={brand.image_url} alt={brand.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-slate-400">{brand.name.charAt(0)}</span>
                  )}
                </div>
                <h3 className="font-black text-lg text-dark mb-2 group-hover:text-[#379c6b] transition-colors line-clamp-1">
                  {brand.name}
                </h3>
                {brand.description && (
                  <p className="text-sm text-slate-500 line-clamp-3">
                    {brand.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Brands;
