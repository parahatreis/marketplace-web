import React from 'react';
import SortBy from './SearchSortBy';
import SearchProductNumber from './SearchProductNumber';

const SearchHeaderProducts = ({count_products, query}) => {
   return (
      <section className="header-products">
         <div className="page-title">
            <h2>Gozlenen haryt : { query }</h2>
         </div>
         <div className="wrapper">
            <div className="pr-number">
               <SearchProductNumber count_products={count_products} />
            </div>
            <div className="sort">
               <SortBy query={query} />
            </div>
         </div>
      </section>
   )
}

export default SearchHeaderProducts
