import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// 
import { getProducts } from '../actions/productsAction';
import { getCurrentSubcategorie } from '../actions/subcategoriesAction';
// 
import Filter from '../components/products/Filter';
import HeaderProducts from '../components/products/HeaderProducts';
import ProductsList from '../components/products/ProductsList';
import FilterIcon from '../img/icons/filter.svg'


const Products = ({match ,products,getProducts, getCurrentSubcategorie, current_subcategorie}) => {

   // Get products by sub_id
   useEffect(() => {
      getProducts(match.params.subcategorie_id);
      window.scrollTo(0, 0);
   }, [getProducts, match]);

   useEffect(() => {
      getCurrentSubcategorie(match.params.subcategorie_id);
   }, [getCurrentSubcategorie, match])


  

   return (
      <>
         <HeaderProducts current_subcategorie={current_subcategorie} count_products={products.count_products} />
         <div className="all-wrapper">
            <div className="filter-btn-block">
               <div className="filter-btn">
                  <span>Filter</span>
                  <img src={FilterIcon} alt="filter" />
               </div>
            </div>
            <div className="grid-block">
               <Filter current_subcategorie={current_subcategorie} />
               <ProductsList current_subcategorie={current_subcategorie} products={products}/>
            </div>
               
            <div className="bg-dark"></div>
         </div>
      </>
   )
}

Products.propTypes = {
   products: PropTypes.object.isRequired,
   current_subcategorie: PropTypes.object,
   getProducts: PropTypes.func.isRequired,
   getCurrentSubcategorie: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
   products: state.products,
   current_subcategorie: state.categories.current_subcategorie
})

export default connect(mapStateToProps, {
   getProducts,
   getCurrentSubcategorie
})(Products);
