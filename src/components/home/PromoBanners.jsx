import React, { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { getData } from '../../services/webservices';

const PromoBanners = ({ data }) => {
  const offersData = data?.items || [];

  // Use fallback empty objects if data is not loaded yet
  const banner1 = offersData[0] || {};
  const banner2 = offersData[1] || {};
  const banner3 = offersData[2] || {};
  const banner4 = offersData[3] || {};

  return (
    <section className="bg-[#F8F9FA] py-8">
      <div className="container flex flex-col gap-6">

        {/* Top Row: Green Large Banner (7 cols) + Orange Big Offer Banner (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Banner 1: Green Organic Fresh Groceries (Top Left) */}
          <div className="lg:col-span-7 bg-gradient-to-r from-[#034C28] via-[#046B39] to-[#023E20] rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[280px] shadow-sm" data-aos="fade-up">
            <div className="relative z-10 max-w-sm">
              <span className="text-[#F9E054] text-xs font-black uppercase tracking-wider block mb-3">
                {banner1.announcementText || "ORGANIC FOOD! GET 15% OFF"}
              </span>
              <h3 className="text-white text-2xl md:text-3xl font-black leading-snug mb-6">
                {banner1.title || "Fresh local groceries provided every day for your family"}
              </h3>
              <Link
                to={banner1.buttonUrl || ROUTES.SHOP}
                className="inline-flex items-center gap-2 bg-white text-[#034C28] hover:bg-slate-100 font-extrabold text-xs md:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm"
              >
                {banner1.buttonText || "Shop Now"} <FiArrowRight size={14} />
              </Link>
            </div>
            {/* Bell Peppers Graphic */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 flex items-center justify-end overflow-hidden pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&q=80"
                alt="Fresh Bell Peppers"
                className="w-full h-full object-cover rounded-r-3xl opacity-95 scale-105"
              />
            </div>
          </div>

          {/* Banner 2: Orange Big Offer Box (Top Right) */}
          <div className="lg:col-span-5 bg-[#FF6B00] rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[280px] shadow-sm text-white" data-aos="fade-up" data-aos-delay="100">
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-black tracking-tight drop-shadow-md text-[#FFE600] leading-none mb-2">
                {banner2.title || "Big Offer"}
              </h3>
              <p className="text-xl md:text-2xl font-bold text-white tracking-wide">
                {banner2.description || "Open Your Box"}
              </p>
            </div>
            {/* Gift Box Graphic */}
            <div className="absolute right-4 bottom-2 w-48 h-48 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&q=80"
                alt="Big Offer Gift Box"
                className="w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform"
              />
            </div>
          </div>

        </div>

        {/* Bottom Row: Red Beef Banner (6 cols) + Yellow Apple Banner (6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Banner 3: Dark Red Delicious Beef Meat (Bottom Left) */}
          <div className="lg:col-span-6 bg-[#700B0B] rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[240px] shadow-sm text-white" data-aos="fade-up" data-aos-delay="150">
            <div className="relative z-10 max-w-xs">
              <span className="text-[#FF9E9E] text-xs font-black uppercase tracking-wider block mb-2">
                {banner3.announcementText || "HURRY UP! GET 20% OFF"}
              </span>
              <h3 className="text-white text-xl md:text-2xl font-black leading-snug mb-6">
                {banner3.title || "Enjoy your lunch with Delicious Beef Meat"}
              </h3>
              <Link
                to={banner3.buttonUrl || ROUTES.SHOP}
                className="inline-flex items-center gap-2 bg-white text-[#700B0B] hover:bg-slate-100 font-extrabold text-xs md:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm"
              >
                {banner3.buttonText || "Shop Now"} <FiArrowRight size={14} />
              </Link>
            </div>
            {/* Meat Cut Graphic */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end overflow-hidden pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&q=80"
                alt="Delicious Beef Meat"
                className="w-full h-full object-cover rounded-r-3xl opacity-95"
              />
            </div>
          </div>

          {/* Banner 4: Soft Yellow Apple Offer (Bottom Right) */}
          <div className="lg:col-span-6 bg-[#F9E054] rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[240px] shadow-sm text-[#0C3823]" data-aos="fade-up" data-aos-delay="200">
            <div className="relative z-10 max-w-xs">
              <div className="inline-block bg-white/80 text-[#FF6B00] text-xl font-black px-3 py-1 rounded-xl mb-3 shadow-xs">
                {banner4.announcementText || "40% OFF"}
              </div>
              <h3 className="text-[#0C3823] text-xl md:text-2xl font-black leading-snug mb-4">
                {banner4.title || "We are willing to make you an offer"}
              </h3>
              <Link
                to={banner4.buttonUrl || ROUTES.SHOP}
                className="inline-flex items-center gap-1.5 text-[#0C3823] font-black text-xs md:text-sm underline underline-offset-4 hover:text-[#FF6B00] transition-colors"
              >
                {banner4.buttonText || "Grab The Offer"} <FiArrowRight size={14} />
              </Link>
            </div>
            {/* Fresh Apples Graphic */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end overflow-hidden pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=80"
                alt="Fresh Apples Offer"
                className="w-full h-full object-cover rounded-r-3xl opacity-95"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PromoBanners;
