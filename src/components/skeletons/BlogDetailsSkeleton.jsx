import React from 'react';
import Skeleton from '../common/Skeleton';

const BlogDetailsSkeleton = () => {
  return (
    <div className="bg-white min-h-screen py-8">
      {/* Blog Details Header Skeleton */}
      <div className="container max-w-5xl mx-auto mb-10 px-4">
        <Skeleton className="h-4 w-32 mb-6" />
        <Skeleton className="h-6 w-24 mb-4 rounded-full" />
        <Skeleton className="h-10 w-full mb-3" />
        <Skeleton className="h-10 w-3/4 mb-6" />
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="w-full aspect-[21/9] rounded-[32px] mb-12" />
      </div>

      {/* Main Content & Sidebar Skeleton */}
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5 mb-4" />
            <Skeleton className="h-8 w-1/2 my-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mb-6" />
            <Skeleton className="w-full h-64 rounded-2xl mb-6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col gap-4">
              <Skeleton className="w-20 h-20 rounded-full mx-auto" />
              <Skeleton className="h-5 w-32 mx-auto" />
              <Skeleton className="h-3 w-44 mx-auto" />
              <Skeleton className="h-12 w-full rounded-2xl mt-2" />
            </div>
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col gap-3">
              <Skeleton className="h-5 w-28 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsSkeleton;
