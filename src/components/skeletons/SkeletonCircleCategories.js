  
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonCircleCategories = ({index}) => {
  return (
    <div key={index}>
        <div className="collection-image">
          <Skeleton circle={true} width={100} height={100} />
        </div>
        <div className="collection-name">
          <Skeleton width={100} />
        </div>
    </div>
  );
};

export default SkeletonCircleCategories;