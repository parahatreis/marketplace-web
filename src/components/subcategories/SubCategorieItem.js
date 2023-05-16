import React, { Fragment, useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// 
import PlaceholderImage from '../../img/placeholderMultiBrand.png';
import apiPath from '../../utils/apiPath';



const SubCategorieItem = ({
      subcategorie: {
         subcategorie_id,
         subcategorie_name_tm,
         subcategorie_name_ru,
         subcategorie_name_en,
         subcategorie_image
      }
   }) => {

   const [image, setImage] = useState(null);


   useEffect(() => {
      if (subcategorie_image) {
         setImage(`${apiPath()}/${subcategorie_image}`)
      }
   }, [subcategorie_image])

   return (
      <Fragment>
         {/* ITEM */}
         <Link to={`products/${subcategorie_id}`} className="categories-item" id={subcategorie_id} >
            <div className="image-wrapper">
               {
                  subcategorie_image ? 
                     (
                        <LazyLoadImage effect="blur" src={image} alt={subcategorie_name_tm} />
                     ):
                     (
                        <LazyLoadImage effect="blur" src={PlaceholderImage} alt={subcategorie_name_tm} />
                     )
               }
            </div>
            <div className="categorie-name">
               {subcategorie_name_tm}
            </div>
         </Link>
      </Fragment>
   )
}

export default SubCategorieItem
