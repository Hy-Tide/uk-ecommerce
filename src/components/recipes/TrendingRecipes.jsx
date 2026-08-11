import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiStar, FiBookmark, FiShare2, FiShoppingCart } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';

const trendingRecipes = [
  {
    id: 1,
    title: 'Authentic Butter Chicken',
    desc: 'Rich, creamy tomato gravy with tender marinated chicken pieces.',
    chef: 'Chef Sanjeev',
    time: '45 mins',
    difficulty: 'Medium',
    calories: '450 kcal',
    rating: 4.9,
    reviews: 1240,
    isVeg: false,
    img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Paneer Tikka Masala',
    desc: 'Grilled cottage cheese cubes in a spiced onion-tomato gravy.',
    chef: 'Madhur Jaffrey',
    time: '40 mins',
    difficulty: 'Easy',
    calories: '380 kcal',
    rating: 4.8,
    reviews: 890,
    isVeg: true,
    img: 'https://images.unsplash.com/photo-1552590635-27c2c2128abf?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Hyderabadi Dum Biryani',
    desc: 'Aromatic basmati rice cooked with tender meat and secret spices.',
    chef: 'Chef Ranveer',
    time: '1h 20m',
    difficulty: 'Hard',
    calories: '550 kcal',
    rating: 4.9,
    reviews: 2100,
    isVeg: false,
    img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Palak Paneer',
    desc: 'Healthy and delicious spinach gravy with fresh paneer cubes.',
    chef: 'Chef Vikas',
    time: '30 mins',
    difficulty: 'Easy',
    calories: '320 kcal',
    rating: 4.7,
    reviews: 650,
    isVeg: true,
    img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800'
  }
];

const TrendingRecipes = () => {
  return (
    <section className="w-full py-20 px-4 md:px-[80px] bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-[#294535] text-[36px] md:text-[42px] font-[700] leading-tight mb-4">
              Trending This Week
            </h2>
            <p className="text-[#6B7280] text-[18px] max-w-[600px]">
              Our most popular and highly-rated recipes. Cooked by thousands of home chefs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300 group flex flex-col h-full border border-gray-100"
            >
              {/* Recipe Image & Badges */}
              <div className="relative h-[240px] w-full overflow-hidden">
                <img
                  src={recipe.img}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Top badges */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  {recipe.isVeg && (
                    <div className="bg-green-100/90 backdrop-blur-sm text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                      <FaLeaf /> Vegetarian
                    </div>
                  )}
                  {!recipe.isVeg && (
                    <div className="bg-red-100/90 backdrop-blur-sm text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                      Non-Veg
                    </div>
                  )}
                  <button className="w-[36px] h-[36px] rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-[#FF8A00] hover:bg-white transition-colors shadow-sm">
                    <FiBookmark className="text-[18px]" />
                  </button>
                </div>
              </div>

              {/* Recipe Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-2 text-[13px] text-gray-500 font-medium mb-3">
                  <div className="flex items-center gap-1 whitespace-nowrap"><FiClock className="text-[#2E8B57]" /> {recipe.time}</div>
                  <div className="w-[4px] h-[4px] rounded-full bg-gray-300"></div>
                  <div className="text-[#FF8A00] whitespace-nowrap">{recipe.difficulty}</div>
                  <div className="w-[4px] h-[4px] rounded-full bg-gray-300"></div>
                  <div className="whitespace-nowrap">{recipe.calories}</div>
                </div>

                {/* Title & Desc */}
                <h3 className="text-[#294535] text-[20px] font-[700] mb-2 leading-tight group-hover:text-[#2E8B57] transition-colors">
                  {recipe.title}
                </h3>
                <p className="text-gray-500 text-[14px] line-clamp-2 mb-4">
                  {recipe.desc}
                </p>

                {/* Chef */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#f4f3ec] flex items-center justify-center text-[10px] font-bold text-[#294535]">
                      {recipe.chef.charAt(0)}
                    </div>
                    <span className="text-[13px] font-bold text-[#294535]">{recipe.chef}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <button className="flex-1 bg-[#FAFAF8] hover:bg-[#2E8B57] text-[#2E8B57] hover:text-white py-3 rounded-[12px] font-[600] text-[14px] transition-colors flex items-center justify-center gap-2">
                    <FiShoppingCart className="text-[16px]" /> Shop Ingredients
                  </button>
                  <button className="w-[46px] h-[46px] rounded-[12px] bg-[#FAFAF8] hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors">
                    <FiShare2 className="text-[18px]" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingRecipes;
