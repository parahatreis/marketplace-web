import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
// 
import CartList from '../components/cart/CartList';
import Spinner from '../components/layouts/Spinner';
import axios from 'axios'
import {cartLoad} from '../actions/cartAction'


const Cart = ({cart : {loading, cart},cartLoad}) => {

   const [localLoading, setLocalLoading] = useState(false);


   useEffect(() => {
      if(cart){
         checkStocks(cart);
         window.scrollTo(0, 0);
      }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])


   const checkStocks = async (cart) => {

      setLocalLoading(true)

      const productOrderObj = cart.map((product) => {
         let stockId = null;
         if (product.sizeNameId) {
            product.stocks.forEach((stock) => {
               if (stock.sizeName.size_name_id === product.sizeNameId) {
                  stockId = stock.stock_id
               }
            })
            return {
                product_id : product.product_id,
                quantity: product.quantity,
                stock_id: stockId,
            }
         }
         return {
            product_id : product.product_id,
            quantity: product.quantity,
            stock_id: product.stocks[0].stock_id,
         }
      })

      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };
      const body = JSON.stringify({
         products : productOrderObj
      });

      try {
         const res = await axios.post('/v1/orders/check-stocks', body, config);

         setLocalLoading(false)

         if(res.data.isChanged){
            toast.warn('Harytlara uytgeshme girizildi!')
         }
         return add(res.data.products)
      }
      catch (err) {
         console.log(err);
         setLocalLoading(false)
      }
   }


   const add = (arr) => {
        cartLoad(arr)
   }

   return (
      <Fragment>
         {
            loading || localLoading ? <Spinner /> : 
            <CartList cart={cart} /> 
         }
      </Fragment>  
   )
}

Cart.propTypes = {
   cart: PropTypes.object.isRequired,
   cartLoad : PropTypes.func
}
const mapStateToProps = state => ({
   cart: state.cart
})

export default connect(mapStateToProps, {cartLoad})(Cart);
