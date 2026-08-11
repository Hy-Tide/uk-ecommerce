import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { getData } from '../../services/webservices';

const fallbackBrandList = [
  { name: 'AASHIRVAAD', text: 'AASHIRVAAD', color: 'text-red-600', bg: 'bg-red-50' },
  { name: 'DAAWAT', text: 'DAAWAT', color: 'text-blue-800', bg: 'bg-blue-50' },
  { name: 'Suhana', text: 'Suhana', color: 'text-rose-700', bg: 'bg-rose-50' },
  { name: 'Haldiram\'s', text: 'Haldiram\'s', color: 'text-red-700', bg: 'bg-red-50' },
  { name: 'Coco Bliss', text: 'Coco Bliss', color: 'text-amber-900', bg: 'bg-amber-50' },
  { name: 'Janvi', text: 'Janvi', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  { name: 'TRS', text: 'TRS', color: 'text-[#0C3823]', bg: 'bg-[#F3F4F6]' },
  { name: 'UPHAAR', text: 'UPHAAR', color: 'text-blue-700', bg: 'bg-blue-50' },
  { name: 'Zaitoon', text: 'Zaitoon', color: 'text-lime-700', bg: 'bg-lime-50' },
  { name: 'Ingredion', text: 'Ingredion', color: 'text-emerald-800', bg: 'bg-emerald-50' },
  { name: 'IFDA', text: 'IFDA', color: 'text-[#700B0B]', bg: 'bg-[#FFF3EB]' },
  { name: 'Griffith Foods', text: 'Griffith', color: 'text-green-700', bg: 'bg-green-50' },
];

const Brands = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const response = await getData('website/brands');
      if (response && response.success !== false && response.data && response.data.brands) {
        setBrands(response.data.brands);
      }
    };
    fetchBrands();
  }, []);

  const displayBrands = brands.length > 0
    ? brands.slice(0, 12).map((b, i) => ({
      id: b._id || i,
      name: b.name,
      slug: b.slug,
      image: b.image_url,
      style: fallbackBrandList[i % fallbackBrandList.length]
    }))
    : fallbackBrandList.map((item, i) => ({
      id: i,
      name: item.name,
      slug: item.name.toLowerCase().replace(/\s+/g, '-'),
      image: null,
      style: item
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
