import React from 'react';
import Skeleton from '../common/Skeleton';

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-[24px] p-3 border border-slate-100 shadow-sm flex flex-col">
      <div className="relative aspect-[4/5] bg-slate-50 rounded-[20px] overflow-hidden mb-4">
        <Skeleton className="w-full h-full rounded-none" />
      </div>
      <div className="px-2 flex flex-col flex-grow">
        <Skeleton className="h-3 w-1/3 mb-2" />
        <Skeleton className="h-5 w-full mb-1" />
        <Skeleton className="h-5 w-2/3 mb-3" />
        
        <div className="flex gap-1 mb-3">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-4 w-4 rounded-sm" />
        </div>
        
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
             <Skeleton className="h-6 w-16 mb-1" />
             <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-10 w-10 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
