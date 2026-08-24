import React from 'react';
import Skeleton from '../common/Skeleton';

const BlogSkeleton = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-8">
      {/* Blog Hero Skeleton */}
      <div className="container max-w-7xl mx-auto mb-12">
        <div className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <Skeleton className="h-4 w-28 rounded-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <Skeleton className="w-full aspect-[16/10] rounded-[24px]" />
          </div>
        </div>
      </div>

      {/* Category Pills Skeleton */}
      <div className="container max-w-7xl mx-auto mb-10 flex gap-3 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-28 rounded-full flex-shrink-0" />
        ))}
      </div>

      {/* Blog Cards Grid Skeleton */}
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col">
              <Skeleton className="w-full h-48 rounded-2xl mb-4" />
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
