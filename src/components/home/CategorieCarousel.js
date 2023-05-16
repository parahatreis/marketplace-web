import React, { useEffect, useState  } from 'react';
import { SplideSlide } from '@splidejs/react-splide';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// 
import PlaceholderImage from '../../img/placeholderMultiBrand.png';
import apiPath from '../../utils/apiPath';
import changeLangApi from '../../utils/changeLangApi';


const CategorieCarousel = ({ lang,categorie: { 
  categorie_id, 
  categorie_name_tm,
  categorie_name_ru,
  categorie_name_en,
  categorie_image 
}}) => {
    
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    if(categorie_image){
        setImage(`${apiPath()}/${categorie_image}`)
    }
  }, [categorie_image]);

  // Change api lang
  useEffect(() => {
    const data = changeLangApi(lang,categorie_name_tm,categorie_name_ru,categorie_name_en);
    setName(data)
  }, [lang,categorie_name_tm,categorie_name_ru,categorie_name_en])


  return (
    <SplideSlide >
        <Link to={`/subcategories/${categorie_id}`} className="categorie-item-link" data-row={categorie_id} >
          <div className="collection-image">
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
          <div className="collection-name">
            {name}
          </div>
        </Link>
    </SplideSlide>
  )
}
CategorieCarousel.propTypes = {
  lang: PropTypes.string,
}

const mapStateToProps = state => ({
  lang: state.lang.lang
})

export default connect(mapStateToProps)(CategorieCarousel);
