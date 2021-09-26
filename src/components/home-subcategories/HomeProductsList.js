import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// 
import ProductsItem from '../products/ProductsItem'

const HomeProductsList = ({ subcategorie }) => {

   const [productList, setProductList] = useState(null)

   useEffect(() => {
      if (subcategorie.products) {
         setProductList(subcategorie.products);
      }
   }, [subcategorie])

   return (
      <Fragment>
         {
            productList && productList.length > 0 &&
               <section className="product-row">
                  <h3>
                     <Link to={`/subcategories/products/${subcategorie.subcategorie_id}`}>{subcategorie.subcategorie_name_tm && subcategorie.subcategorie_name_tm}<i className="fas fa-long-arrow-alt-right"></i></Link>
                  </h3>   
                  <div className="product-list">
                     {productList.map((product,index) => <ProductsItem key={index} product={product} />)}
                  </div>
            </section>
         }
      </Fragment>
   )
}

HomeProductsList.propTypes = {
   subcategorie: PropTypes.object.isRequired,
}

export default HomeProductsList