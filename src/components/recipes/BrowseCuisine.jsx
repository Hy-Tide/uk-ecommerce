import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import southIndianImg from '../../assets/south_indian_cuisine.png';

const cuisines = [
  { name: 'North Indian', recipes: '350+', img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800' },
  { name: 'South Indian', recipes: '280+', img: southIndianImg },
  { name: 'Punjabi', recipes: '150+', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800' },
  { name: 'Gujarati', recipes: '120+', img: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=800' },
  { name: 'Indo-Chinese', recipes: '130+', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800' },
  { name: 'Vegan', recipes: '400+', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800' },
  { name: 'Bengali', recipes: '90+', img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=800' },
];

const BrowseCuisine = () => {
  return (
    <section className="w-full py-20 px-4 md:px-[80px] bg-[#FAFAF8]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-[#294535] text-[36px] md:text-[42px] font-[700] leading-tight mb-4">
              Explore by Cuisine
            </h2>
            <p className="text-[#6B7280] text-[18px] max-w-[600px]">
              Take a culinary journey across India with our region-specific authentic recipes.
            </p>
          </div>
          <Link to="/recipes/cuisines" className="text-[#2E8B57] font-[600] text-[16px] hover:text-[#FF8A00] transition-colors flex items-center gap-2 group">
            View All Cuisines
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cuisines.map((cuisine, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative h-[320px] rounded-[24px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={cuisine.img}
                alt={cuisine.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 w-full p-6 flex items-end justify-between">
                <div>
                  <h3 className="text-white text-[24px] font-[700] mb-1">{cuisine.name}</h3>
                  <p className="text-white/80 text-[14px] font-[500]">{cuisine.recipes} Recipes</p>
                </div>
                <div className="w-[40px] h-[40px] rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <FiArrowRight className="text-[20px]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseCuisine;
