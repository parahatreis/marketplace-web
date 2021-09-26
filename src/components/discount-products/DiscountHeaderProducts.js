import React from 'react';
import DiscountProductsSortBy from './DiscountProductsSortBy';
import DiscountProductNumber from './DiscountProductNumber';

const DiscountHeaderProducts = ({
      count_products,
   }) => {

   return (
      <section className="header-products">
        <h1>Arzanladysyk</h1>
         <div className="wrapper">
            <div className="pr-number">
               <DiscountProductNumber count_products={count_products} />
            </div>
            <div className="sort">
               <DiscountProductsSortBy />
            </div>
         </div>
      </section>
   )
}

export default DiscountHeaderProducts
