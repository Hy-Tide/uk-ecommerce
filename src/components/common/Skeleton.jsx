import React from 'react';

const Skeleton = ({ className = '', variant = 'shimmer', ...props }) => {
  const baseClass = variant === 'shimmer' 
    ? 'skeleton-shimmer rounded-xl' 
    : 'animate-pulse bg-slate-200/80 rounded-xl';

  return (
    <div
      className={`${baseClass} ${className}`}
      {...props}
    ></div>
  );
};

export default Skeleton;

