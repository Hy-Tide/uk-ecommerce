import React from 'react';
import { motion } from 'framer-motion';
import { FiPlayCircle, FiStar, FiUsers, FiBookOpen } from 'react-icons/fi';
import heroBg from '../../assets/indian-kitchen-hero.png';

const RecipeHero = () => {
  return (
    <section className="relative w-full h-[650px] md:h-[750px] font-['Poppins',sans-serif] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Authentic Indian Kitchen" 
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1280px] mx-auto h-full px-4 md:px-[80px] flex flex-col justify-center">
        
        {/* Main Content */}
        <div className="max-w-[650px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#FF8A00] text-white px-4 py-2 rounded-full text-sm font-[600] tracking-wide mb-6 shadow-lg shadow-[#FF8A00]/20"
          >
            <FiBookOpen className="text-lg" />
            Over 1,000 Authentic Indian Recipes
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white text-[48px] md:text-[68px] font-[800] leading-[1.1] mb-6"
          >
            Cook Authentic<br />Indian Meals<br />at Home
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/90 text-[18px] md:text-[22px] font-[400] leading-[1.6] mb-10 max-w-[550px]"
          >
            Discover delicious recipes using fresh ingredients available in our store. Shop every ingredient in just one click.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-5"
          >
            <button className="bg-[#2E8B57] hover:bg-[#236b43] text-white px-8 py-4 rounded-xl font-[600] text-[18px] transition-colors shadow-lg shadow-[#2E8B57]/30">
              Explore Recipes
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-[600] text-[18px] transition-all">
              Shop Ingredients
            </button>
          </motion.div>
        </div>

        {/* Floating Stat Cards (Desktop Only) */}
        <div className="hidden lg:block absolute right-[80px] top-1/2 -translate-y-1/2 w-[320px]">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col gap-6"
          >
            {/* Card 1 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] p-5 flex items-center gap-4 transform translate-x-12 hover:-translate-x-2 transition-transform cursor-default shadow-xl">
              <div className="w-[50px] h-[50px] rounded-full bg-[#2E8B57] flex items-center justify-center flex-shrink-0 text-white text-[22px]">
                <FiBookOpen />
              </div>
              <div>
                <div className="text-white text-[24px] font-[700] leading-tight">1,200+</div>
                <div className="text-white/70 text-[14px]">Authentic Recipes</div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] p-5 flex items-center gap-4 transform hover:-translate-x-4 transition-transform cursor-default shadow-xl">
              <div className="w-[50px] h-[50px] rounded-full bg-[#FF8A00] flex items-center justify-center flex-shrink-0 text-white text-[22px]">
                <FiPlayCircle />
              </div>
              <div>
                <div className="text-white text-[24px] font-[700] leading-tight">250+</div>
                <div className="text-white/70 text-[14px]">Video Recipes</div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] p-5 flex items-center gap-4 transform translate-x-8 hover:-translate-x-2 transition-transform cursor-default shadow-xl">
              <div className="flex -space-x-3">
                <img src="https://i.pravatar.cc/100?img=1" alt="User" className="w-[50px] h-[50px] rounded-full border-2 border-white object-cover" />
                <img src="https://i.pravatar.cc/100?img=2" alt="User" className="w-[50px] h-[50px] rounded-full border-2 border-white object-cover" />
                <div className="w-[50px] h-[50px] rounded-full border-2 border-white bg-[#2E8B57] flex items-center justify-center text-white text-[14px] font-bold">
                  +50k
                </div>
              </div>

            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default RecipeHero;
