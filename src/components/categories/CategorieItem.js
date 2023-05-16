import React, {useState,useEffect} from 'react';
import PlaceholderImage from '../../img/placeholderMultiBrand.png'
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// 
import apiPath from '../../utils/apiPath';
import changeLangApi from '../../utils/changeLangApi';



const CategorieItem = ({
   lang,
   categorie : {
      categorie_id,
      categorie_name_tm,
      categorie_name_ru,
      categorie_name_en,
      categorie_image
   }
}) => {

   const [image, setImage] = useState(null);
   const [name, setName] = useState(null);

   useEffect(() => {
      if(categorie_image){
         setImage(`${apiPath()}/${categorie_image}`)
      }
   }, [categorie_image]);

   useEffect(() => {
      const data = changeLangApi(lang,categorie_name_tm,categorie_name_ru,categorie_name_en);
      setName(data)
   }, [lang,categorie_name_tm,categorie_name_ru,categorie_name_en])

   return (
      <>
         {/* ITEM */}
         <Link to={`/subcategories/${categorie_id}`} className="categories-item" >
            <div className="image-wrapper">
               {
                  categorie_image ?
                     (
                        <LazyLoadImage effect='blur' src={image} alt={categorie_name_tm} />
                     ):
                     (
                        <LazyLoadImage effect='blur' src={PlaceholderImage} alt={categorie_name_tm} />
                     )
               }
            </div>
            <div className="categorie-name">
               {
                  name && name 
               }
            </div>
         </Link>
      </>
   )
}

CategorieItem.propTypes = {
   lang: PropTypes.string,
}

const mapStateToProps = state => ({
   lang: state.lang.lang
})

export default connect(mapStateToProps)(CategorieItem);
