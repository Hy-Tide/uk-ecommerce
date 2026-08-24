import React from 'react';
import Skeleton from '../common/Skeleton';

const OfferSkeleton = () => {
  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20">
      {/* Hero Banner Skeleton */}
      <div className="relative w-full min-h-[350px] bg-slate-800 flex flex-col justify-center p-8 md:p-16">
        <div className="container max-w-5xl mx-auto flex flex-col gap-4">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-10 w-full md:w-2/3" />
          <Skeleton className="h-4 w-full md:w-1/2" />
        </div>
      </div>

      {/* Offers Grid Skeleton */}
      <div className="container max-w-6xl mx-auto mt-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm flex flex-col">
              <Skeleton className="h-56 w-full rounded-none" />
              <div className="p-8 flex flex-col gap-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-7 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5 mb-4" />
                <Skeleton className="h-12 w-full rounded-full mt-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferSkeleton;
