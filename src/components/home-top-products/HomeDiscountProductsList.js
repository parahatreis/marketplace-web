import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// 
import ProductsItem from '../products/ProductsItem'
import SkeletonProducts from '../skeletons/SkeletonProducts';

const HomeDiscountProductsList = ({ discountProducts, loading, t }) => {

   return (
      <Fragment>
         <section className="product-row">
            {
               discountProducts &&
               <h3>
                  <Link to={`/discount-products`}>{ t('discount-products') }<i className="fas fa-long-arrow-alt-right"></i></Link>
               </h3>    
            }
            <div className="product-list">
               {
                  !loading &&
                  discountProducts &&
                  discountProducts.map((product,index) => <ProductsItem key={index} product={product} />)
               }
               {
                  loading &&
                  window.innerWidth >= 1200 &&
                     Array(4).fill().map((item,index) => (
                        <SkeletonProducts key={index} />
                     ))
               }
            </div>
         </section>
      </Fragment>
   )
}

HomeDiscountProductsList.propTypes = {
   discountProducts: PropTypes.array,
}

export default HomeDiscountProductsList