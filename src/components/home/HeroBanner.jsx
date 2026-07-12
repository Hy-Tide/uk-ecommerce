import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { FiArrowRight, FiBookOpen, FiTruck, FiStar } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';

const HeroBanner = () => {
  return (
    <div className="relative bg-[#1c1f23] min-h-[600px] flex items-center overflow-hidden">

      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.png"
          alt="Spices Background"
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1f23] via-[#1c1f23]/90 to-transparent"></div>
      </div>

      <div className="container relative z-10 py-16">
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">

          {/* Left Content */}
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 bg-[#1a5d2b]/20 border border-[#1a5d2b] text-green-400 text-xs font-bold px-3 py-1.5 rounded-full mb-8 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              UK's Most Loved Indian Grocery Store
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
              The Taste of <br />
              <span className="text-orange-500">India,</span> Right at <br />
              Your Doorstep
            </h1>

            <p className="text-lg text-slate-300 mb-10 max-w-xl leading-relaxed">
              Premium spices, authentic groceries, trusted brands —
              everything your kitchen craves, delivered same-day across the UK.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-16">
              <Link to={ROUTES.SHOP} className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-full flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-green-900/30">
                Shop Now <FiArrowRight />
              </Link>
              <Link to={ROUTES.RECIPES} className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full flex items-center gap-2 border border-white/20 backdrop-blur-md transition-all">
                <FiBookOpen /> Browse Recipes
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-8 md:gap-12 border-t border-white/10 pt-8 mt-auto">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">5,000<span className="text-orange-500">+</span></span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Products</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">200<span className="text-orange-500">+</span></span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Brands</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">50k<span className="text-orange-500">+</span></span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Happy Customers</span>
              </div>

            </div>
          </div>

          {/* Right Floating Cards */}
          <div className="flex flex-col gap-4 w-full max-w-sm ml-auto">

            <div className="bg-[#2a2d32]/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4 hover:-translate-x-2 transition-transform cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center flex-shrink-0">
                <FiTruck size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold">Same-Day Delivery</h3>
                <p className="text-xs text-slate-400">Order before 2pm</p>
              </div>
            </div>

            <div className="bg-[#2a2d32]/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4 hover:-translate-x-2 transition-transform cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 text-yellow-500 flex items-center justify-center flex-shrink-0">
                <FiStar size={24} className="fill-yellow-500" />
              </div>
              <div>
                <h3 className="text-white font-bold">Rated 4.9 / 5</h3>
                <p className="text-xs text-slate-400">14,000+ verified reviews</p>
              </div>
            </div>

            <div className="bg-[#2a2d32]/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4 hover:-translate-x-2 transition-transform cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 text-green-500 flex items-center justify-center flex-shrink-0">
                <FaLeaf size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold">100% Authentic</h3>
                <p className="text-xs text-slate-400">Genuine brands</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
