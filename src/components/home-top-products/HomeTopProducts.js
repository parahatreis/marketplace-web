import React, { useEffect,Fragment, useState } from 'react';
import axios from 'axios';
// 
import HomeDiscountProductsList from './HomeDiscountProductsList';
import HomeNewProductsList from './HomeNewProductsList';
import { useTranslation } from 'react-i18next';



const HomeTopProducts = () => {

   const [loading, setLoading] = useState(true);
   const [discountProducts, setDiscountProducts] = useState(null);
   const [newProducts, setNewProducts] = useState(null);
   const { t } = useTranslation();

   useEffect(() => {
      axios.get(`/v1/products/home/top-products`)
         .then((res) => {
            setDiscountProducts(res.data.discountProducts);
            setNewProducts(res.data.newProducts)
            setLoading(false)
      })
      .catch((err) => {
         console.error(err)
      })
   }, [])

   return (
      <Fragment>
         {
            <HomeDiscountProductsList discountProducts={discountProducts} loading={loading} t={t} />
         }
         {
            <HomeNewProductsList newProducts={newProducts} loading={loading} t={t} />
         }
      </Fragment>
   )
}

export default HomeTopProducts;
