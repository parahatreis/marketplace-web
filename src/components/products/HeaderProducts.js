import React from 'react';
import SortBy from './SortBy';
import ProductNumber from './ProductNumber';


const HeaderProducts = ({ count_products, current_subcategorie }) => {

   return (
      <section className="header-products">
         {
            current_subcategorie ?
               <>
                  <div className="page-title">
                     <h2>
                        {
                           current_subcategorie.subcategorie_name_tm && current_subcategorie.subcategorie_name_tm
                        }
                     </h2>
                  </div>
                  <div className="wrapper">
                     <div className="pr-number">
                        <ProductNumber count_products={count_products} />
                     </div>
                     <div className="sort">
                        <SortBy current_subcategorie={current_subcategorie} />
                     </div>
                  </div>
               </> :
               <p>Loading</p>
         }
      </section>
   )
}

export default HeaderProducts
