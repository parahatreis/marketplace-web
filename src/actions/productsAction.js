import axios from 'axios';
import {
   GET_PRODUCTS,
   COUNT_PRODUCTS,
   SET_LOADING_PRODUCTS,
   SET_SORTBY,
   PAGE_NUMBER,
   SET_FILTER,
   CURRENT_PRODUCT,
   CLEAR_PRODUCTS_DATA
} from './types';


// Get Products
export const getProducts = (id, page = 0, order = null ,filter = {}) => async dispatch => {

   let sortBy = null;
   let priceRange = null;

   if (order) sortBy = order

   if(filter.minPrice || filter.maxPrice){
      if(filter.minPrice !== '' || filter.maxPrice !== ''){
         if(filter.minPrice === ''){
            priceRange = `${0} : ${filter.maxPrice}`
         }
         if(filter.maxPrice === ''){
            priceRange = `${filter.minPrice} : ${0}`
         }
         else{
            priceRange = `${filter.minPrice} : ${filter.maxPrice}`
         }
      }
   }
   
   dispatch({ type: SET_LOADING_PRODUCTS });

   try {
      const res = await axios.get(`/v1/products/subcategorie/${id}`, {
         params: {
            page,
            limit: 5,
            sortBy,
            brand: filter.brand,
            size : filter.size,
            priceRange : priceRange ? priceRange : null
         }
      });

      dispatch({
         type: COUNT_PRODUCTS,
         payload: res.data.count
      })
      dispatch({
         type: GET_PRODUCTS,
         payload: res.data.products
      });

   } catch (error) {
      console.log(error)
   }
}

// Set SortBy state
export const setSortBy = (val) => async dispatch => {
   dispatch({
      type: SET_SORTBY,
      payload : val
   });
}

// Set SortBy state
export const setPageNumber = (num) => async dispatch => {
   dispatch({
      type: PAGE_NUMBER,
      payload: Number(num)
   });
}


// Filter Products
export const filterProducts = (obj) => async dispatch => {
   dispatch({
      type: SET_FILTER,
      payload: obj
   });
}

// Get Products By subcategorie_id for HomeProducts
export const searchProducts = (data, page = 0, order = null) => async dispatch => {
   
   let sortBy = null;

   if (order) sortBy = order

   dispatch({
      type: SET_LOADING_PRODUCTS
   });

   try {
      const res = await axios.get(`/v1/products/search`, {
         params: {
            search: data,
            page,
            sortBy,
         }
      });

      dispatch({
         type: COUNT_PRODUCTS,
         payload: res.data.count
      })
      dispatch({
         type: GET_PRODUCTS,
         payload: res.data.products
      });

   } catch (error) {
      console.log(error)
   }
}


// Get Products By Brand
export const brandProducts = (brand_id, page = 0, order = null) => async dispatch => {

   let sortBy = null;

   if (order) sortBy = order

   dispatch({
      type: SET_LOADING_PRODUCTS
   });

   try {
      const res = await axios.get(`/v1/products/brand/${brand_id}`, {
         params: {
            page,
            sortBy,
         }
      });

      dispatch({
         type: COUNT_PRODUCTS,
         payload: res.data.count
      })
      dispatch({
         type: GET_PRODUCTS,
         payload: res.data.products
      });

   } catch (error) {
      console.log(error)
   }
}


// Get Product By Id
export const getProductById = (id) => async dispatch => {

   dispatch({ type: SET_LOADING_PRODUCTS });


   try {
      const res = await axios.get(`/v1/products/${id}`);

      dispatch({
         type: CURRENT_PRODUCT,
         payload: res.data
      })

   } catch (error) {
      console.error('Details',error)
   }
}


// Clear Product Data
export const clearData = () => async dispatch => {
   dispatch({
      type: CLEAR_PRODUCTS_DATA
   });
}

export const newProducts = ( page = 0, order = null) => async dispatch => {

   let sortBy = null;
   if (order) sortBy = order
   dispatch({
      type: SET_LOADING_PRODUCTS
   });

   try {
      const res = await axios.get(`/v1/products/home/top-products/new-products`, {
         params: {
            page, 
            sortBy,
         }
      });
      dispatch({
         type: COUNT_PRODUCTS,
         payload: res.data.count
      })
      dispatch({
         type: GET_PRODUCTS,
         payload: res.data.products
      });

   } catch (error) {
      console.log(error)
   }
}

export const discountProducts = (page = 0, order = null) => async dispatch => {

   let sortBy = null;
   if (order) sortBy = order
   dispatch({
      type: SET_LOADING_PRODUCTS
   });

   try {
      const res = await axios.get(`/v1/products/home/top-products/discount-products`, {
         params: {
            page,
            sortBy,
         }
      });
      dispatch({
         type: COUNT_PRODUCTS,
         payload: res.data.count
      })
      dispatch({
         type: GET_PRODUCTS,
         payload: res.data.products
      });

   } catch (error) {
      console.log(error)
   }
}