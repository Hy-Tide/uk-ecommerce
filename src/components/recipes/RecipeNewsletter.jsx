import React from 'react';
import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';

const RecipeNewsletter = () => {
  return (
    <section className="w-full py-24 px-4 md:px-[80px] bg-[#111827] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#2E8B57]/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#FF8A00]/10 to-transparent pointer-events-none"></div>
      
      <div className="max-w-[1280px] mx-auto relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-[80px] h-[80px] rounded-full bg-white/10 flex items-center justify-center text-[#4ADE80] text-[32px] mb-8 shadow-lg shadow-[#4ADE80]/20 backdrop-blur-sm"
        >
          <FiMail />
        </motion.div>
        
        <h2 className="text-white text-[36px] md:text-[54px] font-[800] leading-tight mb-6">
          Get Fresh Recipes Every Week
        </h2>
        
        <p className="text-gray-400 text-[18px] max-w-[600px] mb-10 leading-[1.6]">
          Join 50,000+ home cooks. Subscribe to our newsletter for exclusive recipes, cooking tips, and special discounts on premium ingredients.
        </p>

        <form className="w-full max-w-[500px] relative">
          <input 
            type="email" 
            placeholder="Enter your email address..."
            className="w-full bg-white/5 border border-white/10 focus:border-[#4ADE80] focus:bg-white/10 transition-all rounded-full py-5 pl-6 pr-[160px] text-[16px] text-white outline-none placeholder:text-gray-500 backdrop-blur-sm"
            required
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2E8B57] hover:bg-[#236b43] text-white px-8 py-3.5 rounded-full font-[600] text-[15px] transition-colors"
          >
            Subscribe
          </button>
        </form>

        <p className="text-gray-500 text-[13px] mt-6">
          By subscribing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </section>
  );
};

export default RecipeNewsletter;
