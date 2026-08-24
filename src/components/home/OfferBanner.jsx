import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { FiArrowRight } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { OfferBannerSkeleton } from '../skeletons/BannerSkeleton';

const OfferBanner = ({ data, isLoading = false }) => {
  if (isLoading || (!data && !data?.data)) {
    return <OfferBannerSkeleton />;
  }

  return (
    <section className="bg-[#F8F9FA] py-8">
    <div className="container">
      <div className="relative bg-[#FFF5ED] rounded-3xl p-8 md:p-14 overflow-hidden flex flex-col md:flex-row items-center justify-between min-h-[300px] shadow-xs border border-orange-100" data-aos="zoom-in">

        {/* Left Text Content */}
        <div className="relative z-10 max-w-lg mb-8 md:mb-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0C3823] leading-tight mb-4 tracking-tight">
            Get 20% Cash Back All the Time with a Subscription!
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base mb-8">
            On all grocery shopping.
          </p>
          <Link
            to={ROUTES.SHOP}
            className="inline-flex items-center gap-2.5 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-extrabold text-sm px-7 py-3.5 rounded-xl transition-all shadow-md shadow-[#FF6B00]/20 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Subscription <FiArrowRight size={16} />
          </Link>
        </div>

        {/* Right Shopping Bag & Coins Graphic */}
        <div className="relative w-full max-w-sm h-64 flex items-center justify-center">
          {/* Green Ring Graphic */}
          <div className="absolute w-56 h-56 rounded-full border-[14px] border-[#008851] pointer-events-none"></div>

          {/* Shopping Bag Card */}
          <div className="relative z-10 w-44 h-56 bg-[#FFE57F] rounded-t-3xl rounded-b-xl shadow-xl flex flex-col items-center justify-center p-4">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-inner mb-2">
              <FaHeart size={32} className="text-[#FF6B00]" />
            </div>
          </div>

          {/* Floating Gold Coins */}
          <div className="absolute top-4 left-6 w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF8F00] to-[#FFE082] shadow-lg flex items-center justify-center text-white font-black text-xs border-2 border-amber-200 animate-bounce">
            20%
          </div>
          <div className="absolute bottom-6 right-8 w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF8F00] to-[#FFE082] shadow-lg flex items-center justify-center text-white font-black text-[10px] border-2 border-amber-200">
            $
          </div>
        </div>

      </div>
    </div>
  </section>
  );
};

export default OfferBanner;
