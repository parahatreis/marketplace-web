import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { toast } from "react-toastify";
// 
import Bin from '../../img/icons/bin.svg'
import apiPath from '../../utils/apiPath';
import { addProduct, removeProduct, incrementProductQuantity,decrementProductQuantity } from '../../actions/cartAction';

const CartItem = ({ product,addProduct, removeProduct, incrementProductQuantity,decrementProductQuantity,cart : {cart} }) => {
   
   const [image, setImage] = useState(null);
   const [sizeName, setSizeName] = useState(null);
   const [qnt, setQnt] = useState(null);
   const [stockNumber, setStockNumber] = useState(0);
   const [totalPrice, setTotalPrice] = useState(null);

   const {
      product_id,
      product_name_tm,
      product_name_en,
      product_name_ru,
      preview_image,
      price,
      brand,
      stocks,
      sizeNameId,
      quantity
   } = product;

   useEffect(() => {
      if (preview_image) {
         setImage(`${apiPath()}/${preview_image}`)
      }
   }, [preview_image]);

   useEffect(() => {
      if (price && qnt) {
         const total = Number(qnt) * Number(price);
         setTotalPrice(total)
      }
   }, [price, qnt])

   useEffect(() => {
      if (sizeNameId) {
         const findSizeName = stocks.find((stock) => stock.sizeName.size_name_id === sizeNameId);
         if (findSizeName) {
            setSizeName(findSizeName.sizeName.size_name)
            setStockNumber(findSizeName.stock_quantity);
         }
      }
      else {
          const qnt = stocks[0].stock_quantity;
          setStockNumber(qnt);
       }
   }, [sizeNameId, stocks]);

   useEffect(() => {
      if (quantity) {
         setQnt(quantity)
      }
   }, [quantity]);


   const increment = () => {
      if (quantity >= stockNumber) {
         toast.warn('Artykmac Haryt mukdary yok!')
      } else {
         incrementProductQuantity(product)
      }
   }
   const decrement = () => {
      if (qnt === 1) {
         removeProduct(product);
      } else {
         decrementProductQuantity(product)
      }
   }


   return (
      <div className="item">
         <div className="col-1">
            <div className="img-wrapper">
               <LazyLoadImage effect="blur" className="product-image" src={image} alt={product_name_en} />
            </div>
            <div className="text-wrapper">
               <div className='brand'>
                     {brand && brand.brand_name}
               </div>
               <Link to={`/products/${product_id}`} className='product-name'>
                     {product_name_tm}
               </Link>
               <div className='size'>
                  {sizeName && sizeName}
               </div>
            </div>
         </div>
         <div className="col-2">
            <div className="counter-wrapper">
               <button onClick={() => decrement()} >-</button>
               <span>
                  {qnt && qnt}
               </span>
               <button onClick={() => increment()} >+</button>
            </div>
            <div className="right-side">
               <div className="price-wrapper">
                  <div className='current'>
                     {totalPrice} TMT
                  </div>
               </div>
               <div className = "btn-wrapper" onClick = {() => removeProduct(product) }>
                     <img src={Bin} alt='bin' />
               </div>      
            </div>
         </div>
      </div>
   )
}

CartItem.propTypes = {
   product: PropTypes.object.isRequired,
   addProduct: PropTypes.func.isRequired,
   removeProduct: PropTypes.func.isRequired,
   incrementProductQuantity: PropTypes.func.isRequired,
   decrementProductQuantity: PropTypes.func.isRequired,
   cart: PropTypes.object,
}
const mapStateToProps = state => ({
   cart: state.cart,
})

export default connect(mapStateToProps, {
   addProduct,
   removeProduct,
   incrementProductQuantity,
   decrementProductQuantity
})(CartItem);
