import React from 'react';
import attaBanner from '../../assets/images/Atta-Banner.jpg';

const ShopHero = ({ title, description }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#700B0B] via-[#850D0D] to-[#600909] text-white flex flex-col md:flex-row shadow-lg my-6">

      {/* Left Content */}
      <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center z-10 relative">
        <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">{title || 'Atta & Flour'}</h1>

        <p className="text-rose-100/80 text-xs md:text-sm leading-relaxed max-w-md font-normal">
          {description || 'Discover pure goodness in every bite with our organic, premium products. The perfect choice for your daily health.'}
        </p>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 relative min-h-[220px]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#700B0B] via-[#700B0B]/60 to-transparent z-10 hidden md:block"></div>
        <img
          src={attaBanner}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover object-right"
        />
      </div>
    </div>
  );
};

export default ShopHero;
