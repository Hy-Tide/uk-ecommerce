import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { FiArrowRight } from 'react-icons/fi';
import { getData } from '../../services/webservices';

const fallbackCategoryStyles = [
  { name: 'Vegetable', subtitle: 'Local Market', bg: 'bg-[#657D1B]', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80' },
  { name: 'Bakery', subtitle: 'In store delivery', bg: 'bg-[#6B1C88]', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80' },
  { name: 'Fruits', subtitle: 'Comical fee', bg: 'bg-[#00796B]', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&q=80' },
  { name: 'Meat', subtitle: 'Frozen meal', bg: 'bg-[#7B3F00]', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&q=80' },
  { name: 'Fresh Fish', subtitle: 'Local Market', bg: 'bg-[#8A0B0B]', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=80' },
  { name: 'Beverages', subtitle: 'Comical fee', bg: 'bg-[#0B4F9C]', image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&q=80' },
];

const CategorySection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getData('website/categories');
      if (response && response.success !== false && response.data && response.data.categories) {
        setCategories(response.data.categories);
      }
    };
    fetchCategories();
  }, []);

  const displayCategories = categories.length > 0
    ? categories.slice(0, 6).map((cat, idx) => ({
      id: cat._id || idx,
      name: cat.name,
      slug: cat.slug,
      subtitle: fallbackCategoryStyles[idx % fallbackCategoryStyles.length].subtitle,
      bg: fallbackCategoryStyles[idx % fallbackCategoryStyles.length].bg,
      image: cat.image || fallbackCategoryStyles[idx % fallbackCategoryStyles.length].image
    }))
    : fallbackCategoryStyles.map((item, idx) => ({
      id: idx,
      name: item.name,
      slug: item.name.toLowerCase().replace(/\s+/g, '-'),
      subtitle: item.subtitle,
      bg: item.bg,
      image: item.image
    }));

  return (
    <section className="bg-[#F8F9FA] py-12">
      <div className="container">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-[#0C3823] tracking-tight">Shop by categories</h2>
          <Link
            to={ROUTES.SHOP}
            className="text-[#FF6B00] hover:text-[#E05E00] font-bold text-xs md:text-sm inline-flex items-center gap-1.5 transition-colors"
          >
            All Categories <FiArrowRight size={16} />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {displayCategories.map((cat, index) => (
            <Link
              key={cat.id}
              to={ROUTES.SHOP_CATEGORY ? ROUTES.SHOP_CATEGORY.replace(':category', cat.slug) : ROUTES.SHOP}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              className={`relative ${cat.bg} rounded-3xl p-5 flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-[190px] text-white`}
            >
              {/* Overlay fluid curve */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none"></div>

              {/* Text Header */}
              <div className="relative z-10">
                <h3 className="font-extrabold text-base md:text-lg leading-tight drop-shadow-sm">{cat.name}</h3>
                <span className="text-[11px] text-white/80 font-medium block mt-0.5">{cat.subtitle}</span>
              </div>

              {/* Image at Bottom */}
              <div className="relative z-10 w-full h-24 mt-auto flex items-end justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-108 transition-transform duration-500 shadow-md"
                />
              </div>
            </Link>
          ))}

          {/* Right Navigation Card */}
          <Link
            to={ROUTES.SHOP}
            className="bg-[#F1F3F5] rounded-3xl p-5 flex flex-col items-center justify-center text-center group hover:bg-[#E2E8F0] transition-colors h-[190px]"
          >
            <div className="w-12 h-12 rounded-full bg-[#0C3823] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <FiArrowRight size={20} />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CategorySection;
