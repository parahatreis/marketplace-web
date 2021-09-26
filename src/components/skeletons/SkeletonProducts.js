  
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonBanner = () => {
  return (
    <div className="product-item-block">
      <div className="product-item">
        {/* Image */}
        <Skeleton height={270} width={270} />
        <div className="upper-block">
            <Skeleton height={20} width={150} />
            <Skeleton height={20} width={200}/>
            <Skeleton height={20} width={200}/>
        </div>
      </div>
  </div>
  );
};

export default SkeletonBanner;