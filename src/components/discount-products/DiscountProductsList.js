import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
// 
import ProductsItem from '../products/ProductsItem'
import {  setPageNumber, discountProducts } from '../../actions/productsAction';
import Spinner from '../layouts/Spinner'

const DiscountProductsList = ({
   products: { products, page_number, count_products,sortBy },
   setPageNumber,
   discountProducts
}) => {


   const [data, setData] = useState(null);
   const [pageCount, setCounter] = useState(0);

   // Set products to data state
   useEffect(() => {
      if (products) {
         setData(products)
      }
   }, [products]);

   // Calculate Page Number
   useEffect(() => {
      setCounter(Math.ceil(count_products / 10));
   }, [count_products]);


   // Pagination Click
   const handlePageClick = (data) => {
      let selected = data.selected;

      setPageNumber(selected * 10);
      discountProducts(selected * 10, sortBy)
      window.scrollTo(0, 0);
   }

   return (
      <>
         <section className="search-products">    
            {data ?
               <>
                  <div className="product-wrapper">
                     {
                        data.map((product,index) => <ProductsItem key={index} product={product} />)
                     }
                  </div>
                  {
                     count_products === 0 ?
                     <div className="not-info">
                        <p> Haryt yok</p>   
                     </div> :
                     <ReactPaginate
                        onPageChange={handlePageClick}
                        previousLabel={'<<'}
                        nextLabel={'>>'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount && pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={10}
                        initialPage={0}
                        forcePage = {page_number / 10}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                     />
                  }
               </> : <Spinner />
            }
         </section>
      </>
   )
}

DiscountProductsList.propTypes = {
   products: PropTypes.object.isRequired,
   discountProducts: PropTypes.func.isRequired,
   setPageNumber: PropTypes.func.isRequired,
}

export default connect(null, {
   discountProducts,
   setPageNumber
})(DiscountProductsList);
