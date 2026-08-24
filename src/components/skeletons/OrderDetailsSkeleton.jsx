import React from 'react';
import Skeleton from '../common/Skeleton';

const OrderDetailsSkeleton = () => {
  return (
    <div className="bg-[#FAFBF9] min-h-screen py-8">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Header Breadcrumb & Title Skeleton */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-60" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-11 w-28 rounded-xl" />
            <Skeleton className="h-11 w-28 rounded-xl" />
          </div>
        </div>

        {/* Tracker Progress Skeleton */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm mb-8">
          <Skeleton className="h-6 w-40 mb-6" />
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 text-center">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Order Items & Summary Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Order Items List */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
            <Skeleton className="h-6 w-36 mb-2" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-none">
                <Skeleton className="w-16 h-16 rounded-2xl flex-shrink-0" />
                <div className="flex flex-col gap-2 flex-grow">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>

          {/* Shipping & Summary Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-3">
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-3">
              <Skeleton className="h-6 w-36 mb-2" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-100">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;
