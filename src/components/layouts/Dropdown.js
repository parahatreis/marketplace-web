import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// 
import {getNavbarCategories,} from '../../actions/categoriesAction';
import DropdownItem from './DropdownItem';
import { useTranslation } from 'react-i18next';
import CategoriesIcon from '../../img/icons/Categoreie.svg'


const Dropdown = ({categories : {navbar_categories }, getNavbarCategories}) => {

   const { t } = useTranslation();

   useEffect(() => {

      const categLink = document.querySelector('.categ');

      function changeLinkName() {
         if (window.innerWidth < 680) {
            categLink.innerHTML = `<img src=${CategoriesIcon} alt="categ" />`
         } else {
            categLink.innerHTML = t('categories')
         }
      }
      changeLinkName();
      window.addEventListener('resize', changeLinkName)
      
   }, [t]);

   useEffect(() => {
      getNavbarCategories();
   }, [getNavbarCategories]);

   return (
      <Fragment>
         <div className="nav-dropdown clearfix">
            <ul className="level-1">
               <li className="has-level-2">
                  <div className="categ" >{ t('categories') }</div>
                  <ul className="level-2">
                     {
                        navbar_categories.map((categorie, index) => (
                          <DropdownItem key={index} categorie={categorie} />
                        ))
                     }
                  </ul>
               </li>
            </ul>
         </div>
      </Fragment>
   )
}

Dropdown.propTypes = {
   categories : PropTypes.object.isRequired,
   getNavbarCategories: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
   categories: state.categories
})

export default connect(mapStateToProps, {
   getNavbarCategories
})(Dropdown);