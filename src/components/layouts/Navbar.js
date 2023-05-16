import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
import Logo from '../../img/MultiBrand-LOGO.svg';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'; 
//
import Dropdown from './Dropdown';
import CartSVG from '../../img/icons/Cart-G.svg';
import Header from './Header';
import SearchForm from '../search/SearchForm';

const Navbar = ({cart : {cart}}) => {

   const [number, setNumber] = useState(null);
   const { t } = useTranslation();
   const myRef = useRef(null)

   useEffect(() => {
      if (cart) {
         const numberOfProduct = cart.length;
         setNumber(numberOfProduct)
      }
   }, [cart]);

   useLayoutEffect(() => {
      const handleScroll = () => {
         const scrollValue = window.scrollY || document?.body.scrollTop || 0;
         if (scrollValue > 20) {
            myRef.current.classList.add('active-navbar-wrapper');
         }
         else {
            myRef.current.classList.remove('active-navbar-wrapper');
         }
      };
      window.addEventListener('scroll', handleScroll);
      document.body.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
         document.body.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      <div className="header-wrapper">
         {/* Header */}
         <Header />
         <div ref={myRef} className="navbar-wrapper" >
            {/* Navbar */}
            <nav className="container">
               <Link to="/" className="logo">
                     <img src={Logo} alt="logo" />
               </Link>
               {/* Search and Categories */}
               <div className="search-wrapper">
                  <Link className="brand-button" to="/brands">{ t('brands') }</Link>
                  <div className="input-block">
                     <div className="categories">
                        {/* Dropdown */}
                        <Dropdown />
                     </div>
                     <SearchForm /> 
                  </div>
               </div>
               {/* Right side */}
               <div className="right-side">
                  <div className="links">
                     <div className="icons">
                        <Link to="/cart" className="cart-icon">
                           <img src={CartSVG} alt="cart" />
                           {
                              number > 0 &&
                              <div className="cart-quantity">
                                 {number > 99 ? '99+' : number}
                              </div>
                           }
                        </Link>
                     </div>
                  </div>
               </div>
            </nav>
         </div>
      </div>
   )
}

Navbar.propTypes = {
   cart: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
   cart: state.cart
})

export default connect(mapStateToProps)(Navbar);
