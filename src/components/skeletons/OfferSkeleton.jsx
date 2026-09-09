import React from 'react';
import Skeleton from '../common/Skeleton';

const OfferSkeleton = () => {
  return (
    <div className="bg-[#fcfbf9] min-h-screen pb-20">
      {/* Hero Banner Skeleton */}
      <div className="relative w-full min-h-[400px] md:min-h-[500px] flex flex-col justify-center overflow-hidden bg-slate-800">
        <div className="container px-4 lg:px-8 mx-auto relative z-10 pt-20 pb-16">
          <div className="max-w-2xl flex flex-col gap-4">
            <Skeleton className="h-8 w-32 rounded-full mb-2" />
            <Skeleton className="h-12 md:h-16 lg:h-20 w-full mb-2" />
            <Skeleton className="h-6 md:h-8 w-3/4" />
          </div>
        </div>
      </div>

      {/* Offers Grid Skeleton */}
      <div className="container px-4 lg:px-8 max-w-6xl mx-auto mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm flex flex-col h-full">
              <Skeleton className="h-56 w-full rounded-none" />
              <div className="p-8 flex flex-col gap-3 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-3/4 mb-1" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5 mb-6" />
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
