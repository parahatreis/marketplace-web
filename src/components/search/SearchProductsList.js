import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
// 
import ProductsItem from '../products/ProductsItem'
import {  setPageNumber, searchProducts } from '../../actions/productsAction';
import Spinner from '../layouts/Spinner';

const SearchProductsList = ({
   products: { loading, products, page_number, count_products,sortBy },
   setPageNumber,
   query,
   searchProducts
}) => {


   const [data, setProducts] = useState([]);
   const [pageCount, setCounter] = useState(1);

   // Set products to data state
   useEffect(() => {
      setProducts(products);
   }, [products, data]);

   // Calculate Page Number
   useEffect(() => {
      setCounter(Math.ceil(count_products / 5));
   }, [count_products]);


   // Pagination Click
   const handlePageClick = (data) => {
      let selected = data.selected;
      setPageNumber(selected * 5);
      searchProducts(query, selected * 5 ,sortBy)
      window.scrollTo(0, 0);
   }

   return (
      <>
         <section className="search-products">    
            {loading ? <Spinner /> : 
               (
                  <>
                     <div className="product-wrapper">
                        {
                           data &&
                           data.map((product,index) => <ProductsItem key={index} product={product} />)
                        }
                     </div>
                     {
                        count_products === 0 &&
                        <div className="not-info">
                           <p> Haryt yok</p>   
                        </div>
                     }
                  </>
               )
            }
            {
               count_products > 0 &&
               <ReactPaginate
                  onPageChange={handlePageClick}
                  previousLabel={'<<'}
                  nextLabel={'>>'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={pageCount && pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  initialPage={0}
                  forcePage = {page_number / 5}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
               />
            }
         </section>
      </>
   )
}

SearchProductsList.propTypes = {
   products: PropTypes.object.isRequired,
   searchProducts: PropTypes.func.isRequired,
   setPageNumber: PropTypes.func.isRequired,
}

export default connect(null, {
   searchProducts,
   setPageNumber
})(SearchProductsList);
