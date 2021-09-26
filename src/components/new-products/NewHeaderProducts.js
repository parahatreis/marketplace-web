import React from 'react';
import NewProductsSortBy from './NewProductsSortBy';
import NewProductNumber from './NewProductNumber';

const NewHeaderProducts = ({
      count_products,
   }) => {

   return (
      <section className="header-products">
        <h1>Taze harytlar</h1>
         <div className="wrapper">
            <div className="pr-number">
               <NewProductNumber count_products={count_products} />
            </div>
            <div className="sort">
               <NewProductsSortBy />
            </div>
         </div>
      </section>
   )
}

export default NewHeaderProducts
