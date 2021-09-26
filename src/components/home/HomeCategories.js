import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Splide } from '@splidejs/react-splide';
// 
import CategorieCarousel from './CategorieCarousel';
import SkeletonCircleCategories from  '../skeletons/SkeletonCircleCategories';
import { useTranslation } from 'react-i18next';


const carouselOptions = {
   type : 'loop',
   autoplay: true,
   interval : 3000,
   autoHeight : true,
   pauseOnHover : true,
   drag : true,
   perPage : 8,
   gap : '1rem',
   pagination : false,
   trimSpace: true,
   rewind: true,
   breakpoints: {
     950: {
       perPage: 7,
     },
     870: {
       perPage: 6,
     },
     680: {
       perPage: 4,
        arrows: false,
        perMove: 2,
      rewind: false,
     },
   },
   flickMaxPages : 3,
   classes: {
		// Add classes for arrows.
		arrows: 'splide__arrows your-class-arrows',
		arrow : 'splide__arrow your-class-arrow',
		prev  : 'splide__arrow--prev your-class-prev splide-prev-btn',
		next  : 'splide__arrow--next your-class-next splide-next-btn',
		
		// Add classes for pagination.
		pagination: 'splide__pagination your-class-pagination', // container
		page      : 'splide__pagination__page your-class-page', // each button
	},
}


const HomeCategories = () => {

   const [loading, setLoading] = useState(true);
   const [homeCategories, setHomeCategories] = useState(null);
   const { t } = useTranslation();

   useEffect(() => { 
      axios.get(`/v1/categories`)
         .then((res) => {
            setHomeCategories(res.data)
            setLoading(false)
         })
         .catch((err) => {
            console.error(err)
         })

   }, []);

   return (
      <Fragment>
         <Fragment>
            <section className="categories">
               {
                  homeCategories &&
                  <h3>
                     <Link to="/categories">{t('categories')} <i className="fas fa-long-arrow-alt-right"></i></Link>
                  </h3>
               }
               <div className="categorie-items">
                     {
                        homeCategories &&
                        <Splide options={carouselOptions}>
                           {
                              homeCategories.map((categorie, index) => <CategorieCarousel categorie={categorie} key={index} />)
                           }
                        </Splide>
                     }
                     {
                        loading &&
                        window.innerWidth >= 1200 && 
                        <div className="collection-list">
                           {
                              Array(8).fill().map((item,index) => (
                                 <SkeletonCircleCategories key={index} />
                              ))
                           }
                        </div>
                     }
               </div>
            </section>
         </Fragment>
      </Fragment>
   )
}

export default HomeCategories;