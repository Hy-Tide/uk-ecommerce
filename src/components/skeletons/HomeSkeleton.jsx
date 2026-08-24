import React from 'react';
import Skeleton from '../common/Skeleton';
import ProductCardSkeleton from './ProductCardSkeleton';

const HomeSkeleton = () => {
  return (
    <div className="flex flex-col gap-12 py-6 bg-[#F8F9FA]">
      {/* Hero Banner Skeleton */}
      <div className="container mx-auto">
        <Skeleton className="w-full h-[400px] md:h-[500px] rounded-[32px]" />
      </div>

      {/* Category Section Skeleton */}
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col items-center gap-3">
              <Skeleton className="w-16 h-16 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Skeleton */}
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
