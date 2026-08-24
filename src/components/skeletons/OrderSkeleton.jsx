import React from 'react';
import Skeleton from '../common/Skeleton';

const OrderSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-6 mb-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-2xl" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>
        <Skeleton className="h-8 w-28 rounded-full" />
      </div>

      {/* Items Preview */}
      <div className="flex items-center gap-4 overflow-hidden">
        <Skeleton className="w-16 h-16 rounded-2xl flex-shrink-0" />
        <Skeleton className="w-16 h-16 rounded-2xl flex-shrink-0" />
        <Skeleton className="w-16 h-16 rounded-2xl flex-shrink-0" />
        <div className="flex flex-col gap-2 flex-grow pl-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Skeleton className="h-11 w-full sm:w-32 rounded-xl" />
          <Skeleton className="h-11 w-full sm:w-32 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default OrderSkeleton;
