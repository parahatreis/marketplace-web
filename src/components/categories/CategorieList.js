import React, { Fragment } from 'react';
import CategorieItem from './CategorieItem';
import { useTranslation } from 'react-i18next';


const CategorieList = ({categories}) => {

   const { t } = useTranslation();

   return (
      <Fragment>
         <section className="categories-wrapper">
            <div className="page-title">
               <h2>{ t('categories') }</h2>
            </div>
            <div className="categories-list">
               {categories.map((categorie,index) => (
                  <CategorieItem key={index} categorie={categorie} />
               ))}
            </div>
         </section>
      </Fragment>
   )
}

export default CategorieList
