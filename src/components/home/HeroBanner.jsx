import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { FiArrowRight, FiTruck, FiShield, FiStar, FiZap } from 'react-icons/fi';
import floatingSpicesHero from '../../assets/floating-spices-hero.png';
import grandmasBasketBg from '../../assets/grandmas_basket_bg.png';
import { API_URL } from '../../services/url';
import { HeroBannerSkeleton } from '../skeletons/BannerSkeleton';
import ImageWithSkeleton from '../common/ImageWithSkeleton';

const resolveImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  const baseUrl = API_URL.replace(/\/api\/v1\/?$/, '');
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
};

const HeroBanner = ({ data: cmsData, isLoading = false }) => {
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    if (cmsData) {
      const timer = setTimeout(() => setContentLoaded(true), 50);
      return () => clearTimeout(timer);
    }
  }, [cmsData]);

  if (isLoading || (!cmsData && !contentLoaded)) {
    return <HeroBannerSkeleton />;
  }

  const title = cmsData?.title || 'Authentic Quality Groceries & Spices';
  const description = cmsData?.description || 'Fresh, organic Indian groceries, rare regional spices & daily essentials delivered fast to your doorstep.';
  const highlightTitle = cmsData?.highlightTitle || "SPECIAL GROCERY DEALS";
  const primaryButtonText = cmsData?.primaryButtonText || 'Shop Now';
  const primaryButtonUrl = cmsData?.primaryButtonUrl || ROUTES.SHOP;
  const secondaryButtonText = cmsData?.secondaryButtonText || 'View Offers';
  const secondaryButtonUrl = cmsData?.secondaryButtonUrl || ROUTES.OFFERS;

  const bgImage = resolveImageUrl(cmsData?.backgroundImage, grandmasBasketBg);

  return (
    <section className="relative w-full min-h-[520px] md:min-h-[600px] flex flex-col justify-center overflow-hidden bg-[#1D3B2A] transition-opacity duration-500 ease-out">
      {/* Background Image & Editorial Overlay with Progressive Loading */}
      <div className="absolute inset-0 w-full h-full">
        <ImageWithSkeleton
          src={bgImage}
          alt="Grandma's Basket Hero Background"
          containerClassName="w-full h-full"
          className="w-full h-full object-cover"
          dark={true}
        />
        {/* Editorial Dark Forest Green Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D3B2A]/95 via-[#1D3B2A]/80 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D3B2A]/95 via-transparent to-[#1D3B2A]/40 pointer-events-none"></div>
      </div>

      <div className="container relative z-10 px-4 pt-16 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Content Column */}
          <div className="lg:col-span-7" data-aos="fade-right">

            {/* Small Pill Badge */}
            {highlightTitle && (
              <div className="inline-flex items-center gap-2 bg-[#FF8A00]/20 backdrop-blur-md border border-[#FF8A00]/30 text-[#FF8A00] px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse"></span>
                {highlightTitle}
              </div>
            )}

            {/* Large Heading */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6"
              dangerouslySetInnerHTML={{
                __html: title ? title.replace('Groceries & Spices', '<span class="text-[#FF8A00]">Groceries & Spices</span>') : ''
              }}
            />

            {/* Description */}
            <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-10 max-w-xl font-medium">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                to={primaryButtonUrl}
                className="bg-[#2E8B57] hover:bg-[#236b43] text-white font-bold text-base px-8 py-4 rounded-[16px] shadow-[0_8px_20px_rgba(46,139,87,0.4)] hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
              >
                {primaryButtonText} <FiArrowRight size={18} />
              </Link>
              <Link
                to={secondaryButtonUrl}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-base px-8 py-4 rounded-[16px] hover:-translate-y-1 transition-all duration-300"
              >
                {secondaryButtonText}
              </Link>
            </div>

            {/* Trust Badges Bar */}
            {cmsData?.items && cmsData.items.length > 0 ? (
              <div className="flex flex-wrap items-center gap-6 md:gap-10 border-t border-white/10 pt-6">
                {cmsData.items.map((item, index) => {
                  const icons = [<FiShield className="text-[#FF8A00] text-lg" />, <FiZap className="text-[#FF8A00] text-lg" />, <FiStar className="text-[#FF8A00] text-lg" />];
                  return (
                    <div key={index} className="flex items-center gap-2.5 text-white/90 font-bold text-sm">
                      {icons[index % icons.length]}
                      <span>{item.title}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-6 md:gap-10 border-t border-white/10 pt-6 text-white/90 font-bold text-sm">
                <div className="flex items-center gap-2.5">
                  <FiShield className="text-[#FF8A00] text-lg" />
                  <span>100% Authentic Indian Brands</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FiZap className="text-[#FF8A00] text-lg" />
                  <span>Same-Day Fast Dispatch</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FiStar className="text-[#FF8A00] text-lg" />
                  <span>4.9★ Customer Choice</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
