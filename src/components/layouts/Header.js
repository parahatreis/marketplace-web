import React, {useState, useEffect, Fragment} from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// 
import { logout } from '../../actions/usersAction';
import Lang from '../../img/icons/lang.svg'
import Reg from '../../img/icons/reg.svg'
import Login from '../../img/icons/log.svg'
import Logout from '../../img/icons/Logout.svg'
import Profile from '../../img/icons/prof.svg'
import {setLanguage} from '../../actions/langAction'


const Header = ({logout, users : {isAuthenticated, loading}, setLanguage}) => {

   const { t, i18n } = useTranslation();
   const [lang, setLang] = useState('tm');
   const initialLang = localStorage.getItem('i18nextLng');

   useEffect(() => {
      setLang(initialLang)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   
   const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
      setLang(lng);
      setLanguage(lng)
   };

   // TODO Put Logout Link in profile page
   const authLinks = (
      <>
         <Link to="/profile" className="header-link"><img src={Profile} alt="profile" />{' '}{ t('profile') }</Link>
         <Link onClick={logout} className="header-link" to="/"><img src={Logout} alt="logout" />{" "}{ t('logout') }</Link>
      </>
   );

   const guestLinks = (
      <>
         <Link className="header-link" to="/login"><img src={Login} alt="login" />{" "}{ t('login') }</Link>
         <Link className="header-link" to="/register"><img src={Reg} alt="register" />{" "} { t('register') }</Link>
      </>
   )

   return (
      <header className="container">
         <div className="header-block">
            <div className="left-side">
               {/* <Link to="/services">{ t('services') }</Link> */}
               <Link to="/about" className="hide-sm">{ t('about') }</Link>
               <Link to="/contacts" className="l-pad">{ t('contacts') }</Link>
               {/* <Link to="/brands" className="l-pad">{ t('brands') }</Link> */}
            </div>
            <div className="right-side">
               {
                  !loading && (<>{ isAuthenticated ? authLinks : guestLinks }</>)
               }
               <ul className="menu l-pad" >
                  <li className="menu-item">
                     <span href="!#">
                        <img src={Lang} alt="lang"/>
                        { " " + lang.toUpperCase() }</span>
                     <ul className="drop-menu">
                        <li className="drop-menu-item">
                           <div onClick={
                              () => lang === "tm" ? changeLanguage("ru") : changeLanguage("tm")}>
                              { lang === "tm" ? "RU" : "TM" }
                           </div>
                        </li>
                     </ul>
                  </li>
               </ul>
            </div>
        </div> 
      </header>
   )
}

Header.propTypes = {
   logout: PropTypes.func.isRequired,
   setLanguage: PropTypes.func.isRequired,
   users: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
   users: state.users
})

export default connect(mapStateToProps, {
   logout,
   setLanguage
})(Header);
