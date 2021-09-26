import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
// 
import PlaceholderImage from '../../img/placeholderISLEG.png';
import apiPath from '../../utils/apiPath';


const BrandItem = ({ brand: {
   brand_id,
   brand_name,
   brand_image
} }) => {

   const [image, setImage] = useState(null);

   useEffect(() => {
      if(brand_image){
         setImage(`${apiPath()}/${brand_image}`)
      }
   }, [brand_image])

   return (
      <>
         {/* Brand */}
         <Link to={`/brands/products/${brand_id}`} className="brand-item">
            <div className="image-wrapper">
               {
                  brand_image ?
                     (
                        <LazyLoadImage effect='blur' src={image} alt={brand_name} />
                     ):
                     (
                        <LazyLoadImage effect='blur' src={PlaceholderImage} alt={brand_name} />
                     )
               }
            </div>
            <p className="brand-name">
               {brand_name}
            </p>
         </Link>
      </>
   )
}

export default BrandItem
