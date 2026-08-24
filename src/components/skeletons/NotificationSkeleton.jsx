import React from 'react';
import Skeleton from '../common/Skeleton';

const NotificationSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4">
      <Skeleton className="h-6 w-36 mb-4" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/60">
          <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
          <div className="flex flex-col gap-2 flex-grow">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeleton;
