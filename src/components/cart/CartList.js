import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
// 
import CartItem from './CartItem'


const CartList = ({ cart }) => {
   
   const [total, setTotal] = useState(null);
   const [subTotal, setSubTotal] = useState(null);


   useEffect(() => {
      if (cart) {
         let t = 0;
         cart.forEach(((product) => {
            const productTotal = Number(product.price) * Number(product.quantity);
            t = t + productTotal
         }));
         setTotal(t);
         setSubTotal(t);
      }
   }, [cart])

   return (
      <Fragment>
         <section className="cart-wrapper">
            {
               cart && cart.length > 0 ?
               <>
                  <div className="page-title">
                     <h2>Sebedim</h2>
                  </div>
                  <div className="flex-wrapper">
                     <div className="items-block">
                        {/* ITEMS */}
                        <div className="items-list">
                              {
                                 cart.map((product,index) => <CartItem key={index} product={product} />)
                              }
                        </div>  
                     </div>
                     <div className="price-block">
                        <div className="total">
                              <span className="label">Harytlaryn jemi</span>
                              <span className="price">{ total && total } TMT</span>
                        </div>
                        <div className="total">
                              <span className="label">Eltip berme hyzmaty</span>
                              <span className="price">10 TMT</span>
                        </div>
                        <div className="total">
                              <span className="label">Jemi</span>
                              <span className="net">{ subTotal + 10 } TMT</span>
                        </div>
                     </div>
                     <div className="btn-block">
                        <Link to='/payment'>
                              Dowam et
                        </Link>
                     </div>
                  </div>
                  </> :
                  <>
                     <div className="page-title">
                        <h2>Sebedim</h2>
                     </div>
                     <div className="not-info">
                        <p>Haryt yok</p>
                     </div>
                  </>
            }
        </section>
      </Fragment>
   )
}

CartList.propTypes = {
   cart: PropTypes.array.isRequired,
}

export default CartList
