import React from 'react';
import Skeleton from '../common/Skeleton';

const BlogSkeleton = () => {
  return (
    <div className="bg-white min-h-screen">

      {/* Hero Skeleton — dark green bg matching BlogHero #1D3B2A */}
      <div className="relative w-full min-h-[520px] md:min-h-[620px] bg-[#1D3B2A] flex items-center p-6 md:p-12">
        <div className="container max-w-6xl mx-auto flex flex-col gap-5 w-full">
          {/* Badge pill */}
          <div className="h-7 w-52 rounded-full bg-white/20 animate-pulse" />
          {/* Title lines */}
          <div className="h-14 w-full max-w-2xl rounded-xl bg-white/20 animate-pulse" />
          <div className="h-14 w-3/4 max-w-xl rounded-xl bg-white/20 animate-pulse" />
          {/* Description lines */}
          <div className="h-4 w-full max-w-xl rounded-xl bg-white/15 animate-pulse" />
          <div className="h-4 w-4/5 max-w-lg rounded-xl bg-white/15 animate-pulse" />
          {/* Category chip pills */}
          <div className="flex gap-3 mt-2">
            <div className="h-9 w-36 rounded-full bg-white/15 animate-pulse" />
            <div className="h-9 w-32 rounded-full bg-white/15 animate-pulse" />
            <div className="h-9 w-40 rounded-full bg-white/15 animate-pulse" />
          </div>
          {/* CTA buttons */}
          <div className="flex gap-4 mt-2">
            <div className="h-12 w-40 rounded-full bg-white/20 animate-pulse" />
            <div className="h-12 w-40 rounded-full bg-white/15 animate-pulse" />
          </div>
          {/* Trust badges */}
          <div className="flex gap-4 mt-4 pt-6 border-t border-white/10">
            <div className="h-12 w-28 rounded-xl bg-white/15 animate-pulse" />
            <div className="h-12 w-32 rounded-xl bg-white/15 animate-pulse" />
            <div className="h-12 w-28 rounded-xl bg-white/15 animate-pulse" />
          </div>
        </div>
      </div>


      {/* Blog Cards Grid Skeleton */}
      <div className="container max-w-7xl mx-auto py-16 px-4">
        {/* Section header */}
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24" />
        </div>
        {/* Category filter pills */}
        <div className="flex gap-3 mb-10 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-full flex-shrink-0" />
          ))}
        </div>
        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-slate-50 rounded-3xl p-5 border border-slate-100 flex flex-col">
              <Skeleton className="w-full aspect-[16/10] rounded-2xl mb-4" />
              <div className="flex items-center gap-2 mb-3">
                <Skeleton className="h-4 w-20 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-3/4 mb-3" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-4/5 mb-6" />
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BlogSkeleton;
