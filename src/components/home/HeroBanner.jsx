import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { FiArrowRight, FiTruck, FiShield, FiStar, FiZap } from 'react-icons/fi';
import floatingSpicesHero from '../../assets/floating-spices-hero.png';
import grandmasBasketBg from '../../assets/grandmas_basket_bg.png';

const HeroBanner = () => {
  return (
    <section className="relative w-full min-h-[520px] md:min-h-[600px] flex flex-col justify-center overflow-hidden bg-[#1D3B2A]">
      {/* Background Image & Editorial Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={grandmasBasketBg}
          alt="Grandma's Basket - Authentic Indian Groceries"
          className="w-full h-full object-cover"
        />
        {/* Editorial Dark Forest Green Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D3B2A]/95 via-[#1D3B2A]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D3B2A]/95 via-transparent to-[#1D3B2A]/40"></div>
      </div>

      <div className="container relative z-10 px-4 pt-16 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Content Column */}
          <div className="lg:col-span-7" data-aos="fade-right">

            {/* Small Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FF8A00]/20 backdrop-blur-md border border-[#FF8A00]/30 text-[#FF8A00] px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse"></span>
              Free UK Next-Day Delivery On Orders £30+
            </div>

            {/* Large Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6">
              We Deliver Authentic <span className="text-[#FF8A00]">Groceries & Spices</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-10 max-w-xl font-medium">
              Get 100% pure Indian spices, pulses, atta, and fresh groceries delivered straight to your doorstep across the UK.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                to={ROUTES.SHOP}
                className="bg-[#2E8B57] hover:bg-[#236b43] text-white font-bold text-base px-8 py-4 rounded-[16px] shadow-[0_8px_20px_rgba(46,139,87,0.4)] hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
              >
                Shop Now <FiArrowRight size={18} />
              </Link>
              <Link
                to="/recipes"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-base px-8 py-4 rounded-[16px] hover:-translate-y-1 transition-all duration-300"
              >
                Explore Recipes
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="flex flex-wrap items-center gap-6 md:gap-10 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2.5 text-white/90 font-bold text-sm">
                <FiShield className="text-[#FF8A00] text-lg" />
                <span>100% Pure Organic</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/90 font-bold text-sm">
                <FiZap className="text-[#FF8A00] text-lg" />
                <span>Next-Day UK Express</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/90 font-bold text-sm">
                <FiStar className="text-[#FF8A00] text-lg" />
                <span>50,000+ UK Families</span>
              </div>
            </div>

          </div>

          {/* Right Hero Column - Single Floating Premium Spices PNG Graphic */}
          {/* <div className="lg:col-span-5 relative flex items-center justify-center" data-aos="fade-left" data-aos-delay="150">
            <div className="relative z-10 w-full max-w-lg h-full flex items-center justify-center animate-[bounce_6s_easeInOut_infinite]">
              <img
                src={floatingSpicesHero}
                alt="Authentic Indian Floating Spices & Herbs"
                className="w-full max-h-[440px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div> */}

        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
