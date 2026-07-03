import React from 'react';
import attaBanner from '../../assets/images/Atta-Banner.jpg';

const ShopHero = () => {
  return (
    <div className="relative rounded-[24px] overflow-hidden bg-[#162123] text-white flex flex-col md:flex-row shadow-lg mt-6 mb-8">
      
      {/* Left Content */}
      <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center z-10 relative">
        <div className="flex items-center gap-2 bg-[#233134] w-fit px-3 py-1.5 rounded-full text-xs font-bold tracking-wide text-slate-300 mb-6 border border-white/5">
          <span className="text-[#379c6b]">✓</span> Premium quality guaranteed
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Atta & Flour</h1>
        
        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 max-w-md font-medium">
          Discover pure goodness in every bite with our organic, premium atta & flour. 
          The perfect choice for your daily health.
        </p>

        {/* Action Pills */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-white text-dark font-bold text-xs px-5 py-2.5 rounded-full hover:bg-slate-100 transition-colors">
            All Products
          </button>
          <button className="bg-[#233134] text-white font-bold text-xs px-5 py-2.5 rounded-full hover:bg-white/10 border border-white/10 transition-colors">
            Atta Only
          </button>
          <button className="bg-[#233134] text-white font-bold text-xs px-5 py-2.5 rounded-full hover:bg-white/10 border border-white/10 transition-colors">
            Gluten Free Foods
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 relative min-h-[300px]">
        {/* Gradient overlay for smooth transition from text to image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#162123] via-[#162123]/80 to-transparent z-10 hidden md:block"></div>
        <img 
          src={attaBanner} 
          alt="Atta & Flour Banner" 
          className="absolute inset-0 w-full h-full object-cover object-right"
        />
      </div>
    </div>
  );
};

export default ShopHero;
