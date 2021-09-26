import React, { useEffect,Fragment, useState } from 'react';
import axios from 'axios';
// 
import HomeProductsList from './HomeProductsList'


const HomeSubcategories = () => {

   const [subcategories,setSubcategories] = useState(null);
   useEffect(() => {
      axios.get(`/v1/home_subcategories`)
         .then((res) => {
         setSubcategories(res.data)
      })
      .catch((err) => {
         console.error(err)
      })
   }, [])
   
   return (
      <Fragment>
         {
            subcategories &&
            subcategories.map((subcategorie, index) => (
               <HomeProductsList key={index} subcategorie={subcategorie.subcategorie} />
            ))
         }
      </Fragment>
   )
}

export default HomeSubcategories
