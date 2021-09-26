import React, {useEffect} from 'react';
// Comp
import Slider from '../components/layouts/Slider';
import HomeCategories from '../components/home/HomeCategories';
import HomeSubcategories from '../components/home-subcategories/HomeSubcategories';
import HomeTopProducts from '../components/home-top-products/HomeTopProducts';

const Home = () => {

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [])

   return (
      <>
         <Slider />
         <HomeCategories />
         <HomeTopProducts />
         <HomeSubcategories />
      </>
   )
}

export default Home
