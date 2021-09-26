import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// 
import changeLangApi from '../../utils/changeLangApi';
import DropdownSubcatItem from './DropdownSubcatItem'


const DropdownItem = ({ categorie, lang }) => {
   
   const {
      categorie_id,
      categorie_name_tm,
      categorie_name_ru,
      categorie_name_en,
   } = categorie

   const [subcategories, setSubcategories] = useState(null);
   const [name, setName] = useState(null);
   
   useEffect(() => {
      setSubcategories(categorie.subcategories)
   }, [categorie]);

   // Change api lang
   useEffect(() => {
      const data = changeLangApi(lang,categorie_name_tm,categorie_name_ru,categorie_name_en);
      setName(data)
   }, [lang,categorie_name_tm,categorie_name_ru,categorie_name_en])

   return (
      <li data-row={categorie_id} className="has-level-3">
         <div >{name}</div>
         <ul className="level-3">
            {
               subcategories && subcategories.map((sub, index) => <DropdownSubcatItem key={index} lang={lang} sub={sub} /> )
            }
         </ul>
      </li>
   )
}

DropdownItem.propTypes = {
   lang: PropTypes.string,
}

const mapStateToProps = state => ({
   lang: state.lang.lang
})

export default connect(mapStateToProps)(DropdownItem);
