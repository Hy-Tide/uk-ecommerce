import React from 'react';
import Skeleton from '../common/Skeleton';

const CartSkeleton = () => {
  return (
    <div className="bg-[#F8F9FA] min-h-screen py-8">
      <div className="container max-w-6xl mx-auto px-4">
        <Skeleton className="h-8 w-40 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items List Skeleton */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-b border-slate-100 last:border-none">
                <Skeleton className="w-20 h-20 rounded-2xl flex-shrink-0" />
                <div className="flex flex-col gap-2 flex-grow">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-xl" />
                  <Skeleton className="h-5 w-6" />
                  <Skeleton className="w-8 h-8 rounded-xl" />
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary Skeleton */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
            <Skeleton className="h-6 w-36 mb-2" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex justify-between pt-4 border-t border-slate-100">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-12 w-full rounded-2xl mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
