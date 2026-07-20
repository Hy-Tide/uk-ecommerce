import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { useState, useEffect } from 'react';
import { ROUTES } from '../utils/constants';
import { getData } from '../services/webservices';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <div className="bg-[#fcfbf9] min-h-screen py-8">
      <div className="container">
        <Breadcrumbs paths={[{ name: 'All Categories' }]} />
        
        <div className="text-center mt-12 mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-dark mb-4 tracking-tight">Shop by Category</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Explore our wide range of premium quality groceries, handpicked just for you.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20 text-slate-500 font-bold">Loading Categories...</div>
        ) : categories.length === 0 ? (
          <div className="flex justify-center py-20 text-slate-500 font-bold">No categories found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {categories.map((category) => (
              <div key={category._id} className="bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={category.image_url || 'https://dummyimage.com/600x600'} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {category.count && (
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="bg-white/90 backdrop-blur text-dark text-xs font-bold px-3 py-1.5 rounded-lg">
                        {category.count} Items
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <Link to={ROUTES.SHOP_CATEGORY ? ROUTES.SHOP_CATEGORY.replace(':category', category.slug) : ROUTES.SHOP} className="inline-block group-hover:text-primary transition-colors">
                    <h3 className="text-xl font-bold text-dark mb-4">{category.name}</h3>
                  </Link>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{category.description}</p>
                  
                  {category.subCategories && category.subCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {category.subCategories.map((sub, idx) => (
                        <Link 
                          key={idx} 
                          to={ROUTES.SHOP} 
                          className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg hover:bg-primary-100 hover:text-primary hover:border-primary/30 transition-colors"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
