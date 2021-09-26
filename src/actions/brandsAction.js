import axios from 'axios';
import {
   GET_BRANDS,
   GET_CURRENT_BRAND,
   SET_LOADING_BRANDS
} from './types';

export const getBrands = () => async dispatch => {
   dispatch({
      type: SET_LOADING_BRANDS
   });
   try {
      const res = await axios.get('/v1/brands');

      dispatch({
         type: GET_BRANDS,
         payload: res.data
      })

   } catch (error) {
      console.log(error)
   }
}

export const getCurrentBrand = (id) => async dispatch => {
   dispatch({
      type: SET_LOADING_BRANDS
   });
   try {
      dispatch({
         type: GET_CURRENT_BRAND,
         payload: null
      })

      const res = await axios.get(`/v1/brands/${id}`);

      dispatch({
         type: GET_CURRENT_BRAND,
         payload: res.data
      })

   } catch (error) {
      console.log(error)
   }
}