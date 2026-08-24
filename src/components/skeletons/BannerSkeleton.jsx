import React from 'react';
import Skeleton from '../common/Skeleton';

// Hero Banner Skeleton (Matches HeroBanner.jsx exact dimensions & responsive grid)
export const HeroBannerSkeleton = ({ dark = true }) => {
  return (
    <section className="relative w-full min-h-[520px] md:min-h-[600px] flex flex-col justify-center overflow-hidden bg-[#1D3B2A] transition-opacity duration-300">
      {/* Background Image Shimmer Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Skeleton className="w-full h-full rounded-none skeleton-shimmer-dark bg-white/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D3B2A]/95 via-[#1D3B2A]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D3B2A]/95 via-transparent to-[#1D3B2A]/40"></div>
      </div>

      <div className="container relative z-10 px-4 pt-16 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Pill Badge Skeleton */}
            <Skeleton className="h-8 w-48 rounded-full mb-6 skeleton-shimmer-dark bg-white/15" />

            {/* Title Skeleton (2 lines matching 4xl/5xl/6xl heading proportions) */}
            <Skeleton className="h-12 md:h-14 w-full md:w-5/6 rounded-2xl mb-3 skeleton-shimmer-dark bg-white/20" />
            <Skeleton className="h-12 md:h-14 w-3/4 md:w-2/3 rounded-2xl mb-6 skeleton-shimmer-dark bg-white/20" />

            {/* Description Skeleton */}
            <Skeleton className="h-5 w-full max-w-xl rounded-lg mb-2 skeleton-shimmer-dark bg-white/15" />
            <Skeleton className="h-5 w-4/5 max-w-xl rounded-lg mb-10 skeleton-shimmer-dark bg-white/15" />

            {/* Action Buttons Skeleton */}
            <div className="flex flex-wrap items-center gap-4 mb-12 w-full sm:w-auto">
              <Skeleton className="h-14 w-full sm:w-44 rounded-[16px] skeleton-shimmer-dark bg-white/25" />
              <Skeleton className="h-14 w-full sm:w-44 rounded-[16px] skeleton-shimmer-dark bg-white/15" />
            </div>

            {/* Trust Badges Bar Skeleton */}
            <div className="flex flex-wrap items-center gap-6 md:gap-10 border-t border-white/10 pt-6 w-full">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <Skeleton className="w-6 h-6 rounded-full skeleton-shimmer-dark bg-white/20" />
                  <Skeleton className="h-4 w-28 rounded-md skeleton-shimmer-dark bg-white/15" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Promo Banners Grid Skeleton (Matches PromoBanners.jsx 2x2 grid & exact heights)
export const PromoBannersSkeleton = () => {
  return (
    <section className="bg-[#F8F9FA] py-8">
      <div className="container flex flex-col gap-6">
        {/* Top Row: 7-col + 5-col cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Green Large Banner Skeleton */}
          <div className="lg:col-span-7 bg-[#034C28]/80 rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[280px]">
            <div className="relative z-10 max-w-sm flex flex-col">
              <Skeleton className="h-4 w-40 rounded-md mb-3 skeleton-shimmer-dark bg-white/20" />
              <Skeleton className="h-8 w-full rounded-xl mb-2 skeleton-shimmer-dark bg-white/25" />
              <Skeleton className="h-8 w-3/4 rounded-xl mb-6 skeleton-shimmer-dark bg-white/25" />
              <Skeleton className="h-10 w-32 rounded-xl skeleton-shimmer-dark bg-white/30" />
            </div>
            <div className="absolute right-0 bottom-0 top-0 w-1/2 overflow-hidden pointer-events-none">
              <Skeleton className="w-full h-full rounded-r-3xl skeleton-shimmer-dark bg-white/10" />
            </div>
          </div>

          {/* Orange Offer Box Skeleton */}
          <div className="lg:col-span-5 bg-[#FF6B00]/90 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[280px]">
            <div className="relative z-10 flex flex-col">
              <Skeleton className="h-12 w-48 rounded-xl mb-2 skeleton-shimmer-dark bg-white/30" />
              <Skeleton className="h-7 w-36 rounded-lg skeleton-shimmer-dark bg-white/20" />
            </div>
            <div className="absolute right-4 bottom-2 w-48 h-48">
              <Skeleton className="w-full h-full rounded-2xl skeleton-shimmer-dark bg-white/15" />
            </div>
          </div>
        </div>

        {/* Bottom Row: 6-col + 6-col cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Dark Red Beef Banner Skeleton */}
          <div className="lg:col-span-6 bg-[#700B0B]/85 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[240px]">
            <div className="relative z-10 max-w-xs flex flex-col">
              <Skeleton className="h-4 w-36 rounded-md mb-2 skeleton-shimmer-dark bg-white/20" />
              <Skeleton className="h-7 w-full rounded-xl mb-2 skeleton-shimmer-dark bg-white/25" />
              <Skeleton className="h-7 w-2/3 rounded-xl mb-6 skeleton-shimmer-dark bg-white/25" />
              <Skeleton className="h-10 w-32 rounded-xl skeleton-shimmer-dark bg-white/30" />
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none">
              <Skeleton className="w-full h-full rounded-r-3xl skeleton-shimmer-dark bg-white/10" />
            </div>
          </div>

          {/* Soft Yellow Apple Offer Skeleton */}
          <div className="lg:col-span-6 bg-[#F9E054]/90 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[240px]">
            <div className="relative z-10 max-w-xs flex flex-col">
              <Skeleton className="h-8 w-24 rounded-xl mb-3 skeleton-shimmer bg-amber-900/10" />
              <Skeleton className="h-7 w-full rounded-xl mb-2 skeleton-shimmer bg-amber-900/15" />
              <Skeleton className="h-7 w-3/4 rounded-xl mb-4 skeleton-shimmer bg-amber-900/15" />
              <Skeleton className="h-5 w-32 rounded-md skeleton-shimmer bg-amber-900/20" />
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none">
              <Skeleton className="w-full h-full rounded-r-3xl skeleton-shimmer bg-amber-900/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Subscription Offer Banner Skeleton (Matches OfferBanner.jsx)
export const OfferBannerSkeleton = () => {
  return (
    <section className="bg-[#F8F9FA] py-8">
      <div className="container">
        <div className="relative bg-[#FFF5ED] rounded-3xl p-8 md:p-14 overflow-hidden flex flex-col md:flex-row items-center justify-between min-h-[300px] border border-orange-100">
          <div className="relative z-10 max-w-lg mb-8 md:mb-0 w-full flex flex-col">
            <Skeleton className="h-10 md:h-12 w-full rounded-2xl mb-3 skeleton-shimmer bg-amber-900/10" />
            <Skeleton className="h-10 md:h-12 w-3/4 rounded-2xl mb-4 skeleton-shimmer bg-amber-900/10" />
            <Skeleton className="h-5 w-48 rounded-lg mb-8 skeleton-shimmer bg-amber-900/10" />
            <Skeleton className="h-12 w-44 rounded-xl skeleton-shimmer bg-orange-200" />
          </div>

          <div className="relative w-full max-w-sm h-64 flex items-center justify-center">
            <Skeleton className="w-56 h-56 rounded-full skeleton-shimmer bg-emerald-100" />
            <Skeleton className="absolute w-44 h-56 rounded-t-3xl rounded-b-xl skeleton-shimmer bg-amber-200 shadow-md" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Shop Hero Header Skeleton (Matches ShopHero.jsx)
export const ShopHeroSkeleton = () => {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-[#700B0B] text-white flex flex-col md:flex-row shadow-lg my-6 min-h-[220px]">
      <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center z-10 relative">
        <Skeleton className="h-10 md:h-12 w-3/4 rounded-xl mb-3 skeleton-shimmer-dark bg-white/25" />
        <Skeleton className="h-4 w-full rounded-md mb-2 skeleton-shimmer-dark bg-white/15" />
        <Skeleton className="h-4 w-4/5 rounded-md skeleton-shimmer-dark bg-white/15" />
      </div>
      <div className="md:w-1/2 relative min-h-[220px]">
        <Skeleton className="w-full h-full rounded-none skeleton-shimmer-dark bg-white/10" />
      </div>
    </div>
  );
};

export default {
  HeroBannerSkeleton,
  PromoBannersSkeleton,
  OfferBannerSkeleton,
  ShopHeroSkeleton
};
