import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// 
import Spinner from '../components/layouts/Spinner'
import PaymentTotal from '../components/payment/PaymentTotal';


const CartPayment = ({cart : {loading, cart}}) => {

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [])

   return (
      <Fragment>
         {
            loading ? <Spinner /> : 
            <PaymentTotal cart={cart} /> 
         }
      </Fragment>  
   )
}

CartPayment.propTypes = {
   cart: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
   cart: state.cart
})

export default connect(mapStateToProps)(CartPayment);
