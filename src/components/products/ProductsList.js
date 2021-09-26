import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
// 
import ProductsItem from './ProductsItem';
import { getProducts, setPageNumber } from '../../actions/productsAction';
import Spinner from '../layouts/Spinner'

const ProductsList = ({
   products: { products, loading, sortBy, page_number, count_products, filter },
   current_subcategorie,
   getProducts,
   setPageNumber
}) => {


   const [data, setProducts] = useState(null);
   const [pageCount, setCounter] = useState(0);
   const [subcategorie, setSubcategorie] = useState(null);

   useEffect(() => {
      setProducts(null)
   }, [])

   // Set products to data state
   useEffect(() => {
      setProducts(products);
   }, [products]);

   // Calculate Page Number
   useEffect(() => {
      setCounter(Math.ceil(count_products / 5));
      setPageNumber(0);
   }, [count_products, pageCount, setPageNumber]);


   useEffect(() => {
      if (current_subcategorie) {
         setSubcategorie(current_subcategorie)
      }
   }, [current_subcategorie])


   // Pagination Click
   const handlePageClick = (data) => {
      let selected = data.selected;
      // set Page Number
      setPageNumber(selected * 5);
      // Get next page products 
      if (subcategorie) {
         getProducts(subcategorie.subcategorie_id, selected * 5, sortBy, filter);
      }
      // scroll top
      window.scrollTo(0, 0);
   }

   return (
      <>
         <section className="products-list">    
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

ProductsList.propTypes = {
   products: PropTypes.object.isRequired,
   getProducts: PropTypes.func.isRequired,
   setPageNumber: PropTypes.func.isRequired,
   sub_id: PropTypes.any,
   current_subcategorie: PropTypes.object
}

export default connect(null, {
   getProducts,
   setPageNumber
})(ProductsList);
