import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { FiArrowRight } from 'react-icons/fi';
import { getData } from '../../services/webservices';

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
    <section className="py-20 bg-[#fafafa]">
      <div className="container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-0.5 bg-[#379c6b]"></div>
              <span className="text-[#379c6b] text-[10px] font-bold uppercase tracking-[0.2em]">Top Brands</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1c1f23] tracking-tight">Trusted Brands</h2>
            <p className="text-slate-500 mt-1">Only the most authentic brands, every product guaranteed</p>
          </div>
          <Link to={ROUTES.BRANDS} className="text-[#379c6b] font-bold text-sm border-b-[2px] border-[#379c6b] pb-0.5 inline-flex items-center gap-1 hover:text-[#1a5d2b] transition-colors">
            Browse All Brands <FiArrowRight size={14} />
          </Link>
        </div>
        
        {/* Brands Grid */}
        {isLoading ? (
          <div className="flex justify-center py-10 font-bold text-slate-500">Loading Brands...</div>
        ) : brands.length === 0 ? (
          <div className="flex justify-center py-10 font-bold text-slate-500">No brands found.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
            {brands.slice(0, 7).map((brand) => (
              <Link 
                key={brand._id} 
                to={ROUTES.BRAND_DETAILS ? ROUTES.BRAND_DETAILS.replace(':slug', brand.slug) : `${ROUTES.BRANDS}/${brand.slug}`}
                className="bg-white rounded-[20px] p-6 flex flex-col items-center justify-center text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-slate-100 hover:-translate-y-1 transition-transform group"
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black mb-4 transition-transform group-hover:scale-110 overflow-hidden bg-slate-50 border border-slate-100"
                >
                  {brand.image_url ? (
                    <img src={brand.image_url} alt={brand.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-slate-400">{brand.name.charAt(0)}</span>
                  )}
                </div>
                <h3 className="font-black text-[15px] mb-1.5 text-slate-800 group-hover:text-[#379c6b] transition-colors line-clamp-1">
                  {brand.name}
                </h3>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Brands;
