import React, { Fragment, useEffect, useState } from 'react'
import Carousel from './Carousel'
import axios from 'axios';
// 
import Spinner from '../layouts/Spinner';
import SkeletonBanner from '../skeletons/SkeletonBanner'


const Slider = () => {

   const [loading, setLoading] = useState(true);
   const [banners, setBanner] = useState(null);


   useEffect(() => {
      axios.get(`/v1/banners`)
         .then((res) => {
            setBanner(res.data)
            setLoading(false)
         })
         .catch((err) => {
            console.error(err)
         })
   }, [])


   return (
      <Fragment>
         {
            loading ? 
               window.innerWidth >= 1200 ? <SkeletonBanner /> : <Spinner />
               :
               <Carousel banners={banners} />
         }
      </Fragment>
   )
}

export default Slider
