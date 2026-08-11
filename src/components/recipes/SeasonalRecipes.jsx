import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

import diwaliImg from '../../assets/diwali_collection.png';

const seasonalCollections = [
  {
    title: 'Summer Specials',
    subtitle: 'Light & Refreshing',
    img: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800',
    color: 'from-orange-500/80 to-orange-900/90'
  },
  {
    title: 'Diwali Collection',
    subtitle: 'Festive Sweets & Snacks',
    img: diwaliImg,
    color: 'from-purple-500/80 to-purple-900/90'
  },
  {
    title: 'Winter Comfort',
    subtitle: 'Warm & Hearty Meals',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    color: 'from-blue-500/80 to-blue-900/90'
  },
  {
    title: 'Healthy Meal Prep',
    subtitle: 'Nutritious & Quick',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
    color: 'from-green-500/80 to-green-900/90'
  }
];

const SeasonalRecipes = () => {
  return (
    <section className="w-full py-20 px-4 md:px-[80px] bg-[#FAFAF8]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-[#294535] text-[36px] md:text-[42px] font-[700] leading-tight mb-4">
              Seasonal Collections
            </h2>
            <p className="text-[#6B7280] text-[18px] max-w-[600px]">
              Curated recipe collections perfect for the current season and upcoming festivals.
            </p>
          </div>
          <div className="flex gap-4">
             {/* Carousel controls placeholder if we want to make it a slider later */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalCollections.map((collection, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative h-[400px] rounded-[24px] overflow-hidden cursor-pointer shadow-lg"
            >
              <img 
                src={collection.img} 
                alt={collection.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-80 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-90`}></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <p className="text-white/80 font-[600] text-[14px] uppercase tracking-wider mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {collection.subtitle}
                </p>
                <h3 className="text-white text-[28px] font-[800] leading-tight mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {collection.title}
                </h3>
                
                <button className="w-fit flex items-center gap-2 bg-white/20 hover:bg-white backdrop-blur-md text-white hover:text-gray-900 px-6 py-3 rounded-full font-[600] text-[14px] transition-all duration-300 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                  Explore Collection <FiArrowRight />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonalRecipes;
