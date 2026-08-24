import React, { useState } from 'react';
import Skeleton from './Skeleton';

const ImageWithSkeleton = ({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  skeletonClassName = '',
  dark = false,
  fallbackSrc = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Shimmer Image Skeleton Overlay */}
      {!isLoaded && (
        <Skeleton
          className={`absolute inset-0 w-full h-full z-10 ${
            dark ? 'skeleton-shimmer-dark bg-white/10' : 'skeleton-shimmer'
          } ${skeletonClassName}`}
        />
      )}

      {/* Actual Image */}
      <img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};

export default ImageWithSkeleton;
