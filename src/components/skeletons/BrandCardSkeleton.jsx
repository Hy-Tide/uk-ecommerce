import React from 'react';
import Skeleton from '../common/Skeleton';

const BrandCardSkeleton = () => {
  return (
    <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm flex flex-col items-center justify-center">
      <Skeleton className="w-24 h-24 rounded-full mb-4" />
      <Skeleton className="h-5 w-2/3 mb-2" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
};

export default BrandCardSkeleton;
