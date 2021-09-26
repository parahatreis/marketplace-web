import React, { Fragment } from 'react';
// 
import SubCategorieItem from './SubCategorieItem';


const SubCategoriesList = ({ categorie: {
   subcategories,
   categorie_name_tm,
   categorie_name_ru,
   categorie_name_en,
}}) => {

   return (
      <Fragment>
         <section className="categories-wrapper">
            <div className="page-title">
               <h2>{categorie_name_tm && categorie_name_tm}</h2>
            </div>
            <div className="categories-list">
               {
                  subcategories &&
                  subcategories.map((val) => (
                     <SubCategorieItem key={val.subcategorie_id} subcategorie={val} />
                  ))
               }
            </div>
         </section>
      </Fragment>
   )
}

export default SubCategoriesList;
