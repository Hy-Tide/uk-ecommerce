import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { ROUTES } from '../utils/constants';

const categoriesData = [
  {
    id: 1,
    name: 'Atta & Flour',
    count: 24,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
    subCategories: ['Wheat Atta', 'Besan', 'Rice Flour', 'Multigrain Atta']
  },
  {
    id: 2,
    name: 'Rice & Grains',
    count: 36,
    image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=400&q=80',
    subCategories: ['Basmati Rice', 'Sona Masoori', 'Poha', 'Quinoa']
  },
  {
    id: 3,
    name: 'Dals & Pulses',
    count: 42,
    image: 'https://images.unsplash.com/photo-1585228518973-195b058097d6?w=400&q=80',
    subCategories: ['Toor Dal', 'Moong Dal', 'Chana Dal', 'Rajma']
  },
  {
    id: 4,
    name: 'Spices & Masalas',
    count: 58,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80',
    subCategories: ['Whole Spices', 'Powdered Spices', 'Blended Masalas', 'Herbs']
  },
  {
    id: 5,
    name: 'Edible Oils & Ghee',
    count: 15,
    image: 'https://images.unsplash.com/photo-1620613277717-31362799db91?w=400&q=80',
    subCategories: ['Mustard Oil', 'Sunflower Oil', 'Olive Oil', 'Desi Ghee']
  },
  {
    id: 6,
    name: 'Snacks & Sweets',
    count: 89,
    image: 'https://images.unsplash.com/photo-1605333396914-2c9769399201?w=400&q=80',
    subCategories: ['Namkeen', 'Biscuits', 'Chocolates', 'Indian Sweets']
  }
];

const Categories = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {categoriesData.map((category) => (
            <div key={category.id} className="bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="bg-white/90 backdrop-blur text-dark text-xs font-bold px-3 py-1.5 rounded-lg">
                    {category.count} Items
                  </span>
                </div>
              </div>
              <div className="p-6">
                <Link to={ROUTES.SHOP} className="inline-block group-hover:text-primary transition-colors">
                  <h3 className="text-xl font-bold text-dark mb-4">{category.name}</h3>
                </Link>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
