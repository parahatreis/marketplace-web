  
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonBanner = () => {
  return (
    <div className="carousel-img">
        <Skeleton width={1200} height={400} />
    </div>
  );
};

export default SkeletonBanner;