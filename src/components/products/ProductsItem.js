import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import {useDispatch} from 'react-redux'
// 
import PlaceholderImage from '../../img/placeholderISLEG.png'
import CartSVG from '../../img/icons/Cart-B.svg';
import Tick from '../../img/icons/tick-blue.svg';
import apiPath from '../../utils/apiPath';
import { addProduct, removeProduct } from '../../actions/cartAction';
import changeLangApi from '../../utils/changeLangApi';


const HomeProductItem = ({ product,addProduct, removeProduct, cart : {cart}, lang }) => {
   
   const [image, setImage] = useState(null);
   const [selected, setSelected] = useState(false);
   const [name, setName] = useState(null);
   const [isImageLoaded, setImageLoaded] = useState(false);
   const dispatch = useDispatch();

   const {
      product_id,
      product_name_tm,
      product_name_en,
      product_name_ru,
      preview_image,
      old_price,
      price,
      brand,
      product_discount,
      stocks
   } = product

   useEffect(() => {
      if (preview_image) {
         const url = `${apiPath()}${preview_image}`;
         setImage(url)
      }
   }, [preview_image]);

   // Cart System
   useEffect(() => {
      if(cart){
         const findProduct = cart.findIndex((product) => product.product_id === product_id);
         if(findProduct !== -1)  setSelected(true)
         else setSelected(false)
      }
   }, [cart, product_id])

   const addCart = () => {
      if (product.stocks) {
         if (product.stocks[0].sizeTypeId) {
            dispatch({
               type: 'SET_MODAL_OPENED',
               payload: true
            });
            dispatch({
               type: 'SET_SELECTED_PRODUCT',
               payload: product
            });
            return;
         } else {
            if (!selected) {
               setSelected(true);
               toast.success('Haryt sebede goshuldy!')
               return addProduct(product);
            }
            if(selected){
               setSelected(false);
               toast.error('Haryt sebedetden ayryldy!')
               return removeProduct(product);
            }
         }
      }

      
   }

   // Change api lang
   useEffect(() => {
      // setName(null)
      if (lang) {
         const data = changeLangApi(lang, product_name_tm, product_name_ru, product_name_en);
         setName(data)
      }
   }, [lang, product_name_tm, product_name_ru, product_name_en]);

   const handleAfterLoad = () => {
      setImageLoaded(true);
   }

   return (
      <>
         {/* Product */}   
         <div className="product-item-block">
         <div className="product-item">
               <Link to={`/products/${product_id}`}  className="image-wrapper">
                  {
                     old_price && product_discount > 0 && 
                     <div className="percentage">
                     -{product_discount}%   
                     </div>
                  }
               {!isImageLoaded && 
                  <LazyLoadImage effect="blur" className="product-image" src={PlaceholderImage} alt={product_name_en} /> 
               }
               <LazyLoadImage afterLoad={handleAfterLoad} effect="blur" className={`product-image ${isImageLoaded ? 'd-block' : 'd-none' }`} src={image} alt={product_name_en} /> 
               </Link>
               <div className="upper-block">
                  <div className="brand-name">
                     <span>{ brand ? brand.brand_name : '' }</span>
                  </div>
                  <Link to={`/products/${product_id}`} className="product-name">
                     <span>
                     { name && name }
                     </span>
                  </Link>
                  <div className="floor-block">
                     <div className="price">
                     <span className="new-price">{ price } TMT</span>
                     {
                           old_price && 
                           <div className="old-price">{old_price} TMT</div>
                     }
                     </div>
                     {
                     stocks &&
                     stocks[0].stock_quantity > 0 &&
                     <div className="cart-btn-block">
                           <button data-product-id="222" onClick={(e) => addCart()} >
                              <div className="btn-block">
                                 {selected ? 
                                 <img src={Tick} alt="cart" />
                                 : 
                                 <img src={CartSVG} alt="cart" />
                                 }
                              </div>
                           </button>
                     </div>
                     }
                  </div>
               </div>
         </div>
         </div>
      </>
   )
}

HomeProductItem.propTypes = {
   product : PropTypes.object.isRequired,
   addProduct: PropTypes.func.isRequired,
   removeProduct : PropTypes.func.isRequired,
   cart: PropTypes.object.isRequired,
   lang: PropTypes.string,
}
const mapStateToProps = state => ({
   cart: state.cart,
   lang: state.lang.lang
})

export default connect(mapStateToProps, {
   addProduct,
   removeProduct
})(HomeProductItem);
