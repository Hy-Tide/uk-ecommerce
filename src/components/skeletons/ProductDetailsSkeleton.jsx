import React from 'react';
import Skeleton from '../common/Skeleton';

const ProductDetailsSkeleton = () => {
  return (
    <div className="bg-[#fcfbf9] min-h-screen relative pb-16 md:pb-0">
      <div className="container py-8">
        
        {/* Breadcrumb Skeleton */}
        <div className="mb-4 flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-4" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-4" />
          <Skeleton className="h-5 w-32" />
        </div>

        {/* Main Product Section */}
        <div className="bg-white rounded-[32px] p-6 md:p-10 border border-slate-100 shadow-sm mb-12 flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Image Gallery Skeleton */}
          <div className="w-full lg:w-[45%] flex flex-col gap-4">
            <Skeleton className="w-full aspect-[4/5] md:aspect-square rounded-[32px]" />
            <div className="flex gap-4 overflow-hidden">
              <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex-shrink-0" />
              <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex-shrink-0" />
              <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex-shrink-0" />
              <Skeleton className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex-shrink-0" />
            </div>
          </div>
          
          {/* Product Info Skeleton */}
          <div className="w-full lg:w-[55%] pt-4">
            <Skeleton className="h-8 w-24 mb-4 rounded-full" />
            <Skeleton className="h-10 w-full mb-3" />
            <Skeleton className="h-10 w-3/4 mb-6" />
            
            <div className="flex items-center gap-4 mb-8">
               <Skeleton className="h-6 w-32" />
               <Skeleton className="h-6 w-24" />
            </div>
            
            <div className="flex items-end gap-4 mb-8">
               <Skeleton className="h-12 w-32" />
               <Skeleton className="h-8 w-24" />
            </div>
            
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-8" />
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-14 w-full sm:w-1/3 rounded-2xl" />
              <Skeleton className="h-14 w-full sm:w-2/3 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
