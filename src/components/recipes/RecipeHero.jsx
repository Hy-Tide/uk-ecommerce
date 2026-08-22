import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiArrowRight, FiShield, FiStar, FiZap } from 'react-icons/fi';
import floatingSpicesHero from '../../assets/floating-spices-hero.png';
import { getData } from '../../services/webservices';

const RecipeHero = () => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await getData('website/banners/recipes');
        if (response?.success && response?.data?.banners?.length > 0) {
          setBanner(response.data.banners[0]);
        }
      } catch (error) {
        console.error('Error fetching recipes banner:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanner();
  }, []);

  if (loading) {
    return (
      <section className="relative w-full min-h-[520px] md:min-h-[640px] bg-[#0c2415] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
      </section>
    );
  }

  const displayTitle = banner?.title || "Explore Authentic Indian Recipes";
  const displayImage = banner?.image_url || floatingSpicesHero;
  const displayDesc = banner?.description || "Discover our collection of traditional and modern Indian recipes crafted by expert chefs.";

  const titleWords = displayTitle.split(' ');
  const lastWord = titleWords.length > 1 ? titleWords.pop() : '';
  const restOfTitle = titleWords.join(' ');

  return (
    <section className="relative w-full min-h-[520px] md:min-h-[640px] flex flex-col justify-center overflow-hidden bg-[#0c2415]">
      {/* Background Image & Editorial Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={displayImage}
          alt={displayTitle}
          className="w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
        />
        {/* Premium Dark Gradients for Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f12] via-[#0c2415]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f12] via-transparent to-[#0a1f12]/40"></div>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
      </div>

      <div className="container relative z-10 px-4 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Content Column */}
          <div className="lg:col-span-7" data-aos="fade-right" data-aos-duration="1000">

            {/* Small Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF8A00]/20 to-[#FFB703]/20 backdrop-blur-md border border-[#FF8A00]/40 text-[#FFB703] px-5 py-2.5 rounded-full text-xs uppercase font-black tracking-widest mb-6 shadow-[0_0_20px_rgba(255,138,0,0.15)] animate-[pulse_4s_ease-in-out_infinite]">
              <FiBookOpen className="text-sm" />
              <span>Chef's Special Recipes</span>
            </div>

            {/* Large Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 drop-shadow-lg tracking-tight">
              {restOfTitle} {lastWord && <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A00] to-[#FFB703]">{lastWord}</span>}
              {!lastWord && displayTitle}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-emerald-50/80 leading-relaxed mb-10 max-w-xl font-medium drop-shadow-md">
              {displayDesc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <button className="group bg-gradient-to-r from-[#FF8A00] to-[#e67a00] text-white font-black text-sm px-7 py-3 rounded-full shadow-[0_8px_25px_rgba(255,138,0,0.4)] hover:shadow-[0_12px_30px_rgba(255,138,0,0.5)] hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2">
                Start Cooking <FiArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
              <Link
                to="/shop"
                className="group bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-sm px-7 py-3 rounded-full hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              >
                Shop Ingredients
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="flex flex-wrap items-center gap-6 md:gap-10 border-t border-white/10 pt-8">
              <div className="flex items-center gap-3 text-white/90 font-bold text-sm group">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform border border-emerald-500/30">
                  <FiShield className="text-emerald-400 text-lg" />
                </div>
                <span>100% Pure<br /><span className="text-emerald-400/80 font-medium text-xs">Ingredients</span></span>
              </div>
              <div className="flex items-center gap-3 text-white/90 font-bold text-sm group">
                <div className="w-10 h-10 rounded-full bg-[#FF8A00]/20 flex items-center justify-center group-hover:scale-110 transition-transform border border-[#FF8A00]/30">
                  <FiZap className="text-[#FFB703] text-lg" />
                </div>
                <span>One-Click<br /><span className="text-[#FFB703]/80 font-medium text-xs">Smart Cart</span></span>
              </div>
              <div className="flex items-center gap-3 text-white/90 font-bold text-sm group">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform border border-blue-500/30">
                  <FiStar className="text-blue-400 text-lg" />
                </div>
                <span>Chef Approved<br /><span className="text-blue-400/80 font-medium text-xs">Curated Quality</span></span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default RecipeHero;
