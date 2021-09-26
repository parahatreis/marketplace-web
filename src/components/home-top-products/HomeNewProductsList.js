import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// 
import ProductsItem from '../products/ProductsItem'
import SkeletonProducts from '../skeletons/SkeletonProducts';

const HomeNewProductsList = ({ newProducts ,loading, t }) => {

   return (
      <Fragment>
         <section className="product-row">
            {
               newProducts &&
               <h3>
                  <Link to={`/new-products`}>{ t('new-products') }<i className="fas fa-long-arrow-alt-right"></i></Link>
               </h3>
            }    
            <div className="product-list">
               {
                  !loading &&
                  newProducts &&
                  newProducts.map((product,index) => <ProductsItem key={index} product={product} />)
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

HomeNewProductsList.propTypes = {
   newProducts: PropTypes.array,
}

export default HomeNewProductsList