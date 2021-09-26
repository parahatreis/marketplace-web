import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// 
import Details from '../components/product-details/Details';
import ProductGallery from '../components/product-details/__ProductGallery';
import RelatedProducts from '../components/product-details/RelatedProducts';
import { getProductById } from '../actions/productsAction';
import Spinner from '../components/layouts/Spinner'


const ProductDetails = ({ match,getProductById ,products : {current_product, loading} }) => {
   
   useEffect(() => {
      getProductById(match.params.product_id);
      window.scrollTo(0, 0);

   }, [getProductById,match])

   return (
      <section className="product-details" >
         {loading ? <Spinner /> : 
         (
            <>
            <div className="grid-wrapper">
               {/* Image Gallery */}
               <ProductGallery product_images={current_product.product_images} />
               {/* Product Details */}
               <Details product={current_product} />
            </div>
            </>
         )}
         <RelatedProducts product_id={match.params.product_id} />
      </section>
   )
}

ProductDetails.propTypes = {
   products: PropTypes.object.isRequired,
   getProductById: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
   products: state.products,
})

export default connect(mapStateToProps, {
   getProductById
})(ProductDetails);

