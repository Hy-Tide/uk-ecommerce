import React from 'react';
import Skeleton from '../common/Skeleton';

const CategoryCardSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden">
      <div className="h-48 relative">
        <Skeleton className="w-full h-full rounded-none" />
      </div>
      <div className="p-6 flex items-center justify-between">
        <div className="flex flex-col gap-2 w-2/3">
           <Skeleton className="h-6 w-full" />
           <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
