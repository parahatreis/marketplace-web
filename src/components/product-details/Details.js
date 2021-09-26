import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from "react-toastify";
// 
import { addProduct, removeProduct, incrementProductQuantity,decrementProductQuantity } from '../../actions/cartAction';


const Details = ({ product,addProduct, removeProduct, incrementProductQuantity,decrementProductQuantity,cart : {cart} }) => {

   const [selected, setSelected] = useState(false);
   const [quantity, setQuantity] = useState(1);
   const [stockNumber, setStockNumber] = useState(10);
   const [sizes, setSizes] = useState(null);
   const [hasSize, setHasSize] = useState(false);
   const [currentSize, setCurrentSize] = useState('');

   const {
      product_id,
      product_name_tm,
      product_name_en,
      product_name_ru,
      price,
      old_price,
      description_tm,
      brand,
      stocks
   } = product;

   useEffect(() => {
      if(stocks){
         if (stocks[0].sizeTypeId) {
            setSizes(stocks);
            setHasSize(true);
         }
         else{
            const qnt = stocks[0].stock_quantity;
            setStockNumber(qnt);
         }
      }
   }, [stocks])


   // Cart System
   useEffect(() => {
      if(cart){
         const findProduct = cart.find((product) => product.product_id === product_id);
         if(findProduct){
            setSelected(true);
            setQuantity(Number(findProduct.quantity));

            if (findProduct.sizeNameId) {
               setHasSize(true)
               setCurrentSize('')
            }
         }
         else setSelected(false);
      }
   }, [cart, product_id,stockNumber])

   const increment = () => {
      if(quantity >= stockNumber){
         toast.warn('Artykmac Haryt mukdary yok!')
      }
      else{
         incrementProductQuantity(product)
      }
   }
   const decrement = () => {
      if(quantity === 1){
         removeProduct(product);
         setCurrentSize('');
         setHasSize(false)
      }
      else{
         decrementProductQuantity(product)
      }
   }

   const addCart = () => {
      if(stockNumber > 0){
         if (currentSize) {
            let newProduct = product;
            newProduct.sizeNameId = currentSize;
            return addProduct(product) 
         }
         return addProduct(product);
      }
      else{
         toast.warn('Yeterlikli stock yok!')
      }
   }

   const onSizeChange = (e) => {
      const sizeId = e.target.value;
      const findStock = stocks.find((stock) => stock.sizeName.size_name_id === sizeId);
      setStockNumber(findStock.stock_quantity)
      setCurrentSize(sizeId)
   }


   return (
      <section className="details-wrapper">
         <div className="details">
            <div className="brand-name">
               {brand && brand.brand_name}
            </div>
            <div className="product-name">
               {product_name_tm}
            </div>
            {
               stockNumber < 3 && 
               <div className="stock stock-danger">
                  {stockNumber} sany galdy
               </div>
            }
            <div className="price-list">
               <div className="primary-price">
                  {price} manat
               </div>
               {
                  old_price &&
                  <div className="prev-price">
                     {old_price} manat
                  </div>
               }
            </div>
            {
               sizes &&
               <div className="size">
                  <label htmlFor="size">Beden</label> <br />
                  <select
                     name="size"
                     onChange={(e) => onSizeChange(e)}
                     value={currentSize}
                  >
                     <option value='' disabled>Beden</option>
                     {
                        stocks &&
                        stocks.map((size,index) => (
                           <option value={size.sizeName.size_name_id} key={index} >{size.sizeName.size_name}</option>
                        ))
                     }
                  </select>
               </div>
            }
            {
               currentSize || !hasSize ?
               <div className="add-cart">
               {
                  selected && !currentSize ?
                     <>
                        {/* Increment */}
                        <div className="quantity">
                           <button onClick={() => decrement() } >-</button>
                           <span> {quantity} </span>
                           <button onClick={() => increment() } >+</button>
                        </div>
                     </> : 
                     <>
                     {/* Add Basket */}
                     <div className="add-cart-btn">
                        <button onClick={() => addCart()} >Sebede gos</button>
                     </div>
                     </>
               }
            </div> : ''
            }
            {description_tm && (
               <aside>
                  <h3>Haryt maglumaty</h3>
                  <p>{ description_tm }</p>
               </aside>
            )}
         </div>
      </section>
   )
}

Details.propTypes = {
   product : PropTypes.object.isRequired,
   addProduct: PropTypes.func.isRequired,
   removeProduct : PropTypes.func.isRequired,
   incrementProductQuantity : PropTypes.func.isRequired,
   decrementProductQuantity : PropTypes.func.isRequired,
   cart: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
   cart: state.cart,
})

export default connect(mapStateToProps, {
   addProduct,
   removeProduct,
   incrementProductQuantity,
   decrementProductQuantity
})(Details);

