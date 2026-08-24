import React from 'react';
import Skeleton from '../common/Skeleton';

const PageLayoutSkeleton = () => {
  return (
    <div className="bg-[#F8F9FA] min-h-screen py-8">
      <div className="container max-w-7xl mx-auto px-4 flex flex-col gap-8">
        {/* Top Header Placeholder */}
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-10 w-32 rounded-xl" />
        </div>

        {/* Hero Section Placeholder */}
        <Skeleton className="w-full h-64 md:h-80 rounded-[32px]" />

        {/* Content Cards Grid Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
              <Skeleton className="w-full h-40 rounded-2xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageLayoutSkeleton;
