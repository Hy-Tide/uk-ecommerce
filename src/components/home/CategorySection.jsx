import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { FiArrowRight } from 'react-icons/fi';
import { getData } from '../../services/webservices';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getData('website/categories');
      if (response && response.success !== false && response.data && response.data.categories) {
        setCategories(response.data.categories);
      }
      setIsLoading(false);
    };
    fetchCategories();
  }, []);

  return (
    <section className="bg-[#fcfbf9] py-16">
      <div className="container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-0.5 bg-primary"></div>
              <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Browse by Category</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-dark tracking-tight">Shop Your Favourites</h2>
            <p className="text-slate-500 mt-1">Everything from aromatic spices to freshly milled flours</p>
          </div>
          <Link to={ROUTES.SHOP} className="text-primary font-bold text-sm border-b-[2px] border-primary pb-0.5 inline-flex items-center gap-1 hover:text-primary-dark transition-colors">
            View All Categories <FiArrowRight size={14} />
          </Link>
        </div>
        
        {/* Carousel / Grid */}
        {isLoading ? (
          <div className="flex justify-center py-10 text-slate-500 font-bold">Loading...</div>
        ) : categories.length === 0 ? (
          <div className="flex justify-center py-10 text-slate-500 font-bold">No categories found.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-4">
            {categories.slice(0, 9).map((category) => (
              <Link 
                key={category._id} 
                to={ROUTES.SHOP_CATEGORY ? ROUTES.SHOP_CATEGORY.replace(':category', category.slug) : ROUTES.SHOP}
                className="flex flex-col items-center justify-center p-6 rounded-[20px] transition-all duration-300 shadow-sm border border-slate-100 bg-white hover:border-primary/30 group"
              >
                <div className="w-[70px] h-[70px] rounded-full flex items-center justify-center text-3xl mb-4 bg-slate-50 group-hover:bg-[#fcfbf9]">
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    <img src={category.image_url || 'https://dummyimage.com/600x600'} alt={category.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-center mb-1 text-dark">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
        
        {/* Divider */}
        <div className="h-px w-full bg-slate-200 mt-12 hidden md:block"></div>
      </div>
    </section>
  );
};

export default CategorySection;
