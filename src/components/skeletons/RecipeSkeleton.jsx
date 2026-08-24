import React from 'react';
import Skeleton from '../common/Skeleton';

const RecipeSkeleton = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Recipe Hero Skeleton */}
      <div className="relative w-full min-h-[480px] bg-[#0c2415] flex items-center justify-center p-6 md:p-12">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-3/5 flex flex-col gap-4">
            <Skeleton className="h-6 w-36 rounded-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5 mb-6" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-36 rounded-full" />
              <Skeleton className="h-12 w-36 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Recipes Cards Grid Skeleton */}
      <div className="container max-w-7xl mx-auto py-16 px-4">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex flex-col">
              <Skeleton className="w-full aspect-[4/3] rounded-2xl mb-4" />
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeSkeleton;
