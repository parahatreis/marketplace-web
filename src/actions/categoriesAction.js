import axios from 'axios';
import {
   GET_CATEGORIES,
   GET_SUBCATEGORIES,
   SET_LOADING,
   GET_NAVBAR_CATEGORIES
} from './types';

// const setLoading = () => dispatch => dispatch({ type: SET_LOADING });


// GET ALL Categories
export const getCategories = () => async dispatch => {

   dispatch({ type: SET_LOADING });

   try {
      const res = await axios.get('/v1/categories');

      dispatch({
         type: GET_CATEGORIES,
         payload : res.data
      })
   }
   catch (error) {
      console.log(error)
   }
}

// GET ALL Categories
export const getNavbarCategories = () => async dispatch => {

   dispatch({
      type: SET_LOADING
   });

   try {
      const res = await axios.get('/v1/categories');

      dispatch({
         type: GET_NAVBAR_CATEGORIES,
         payload: res.data
      })
   } catch (error) {
      console.log(error)
   }
}

// GET SubCategories By Categorie_id
export const getCategorieById = (id) => async dispatch => {

   dispatch({
      type: SET_LOADING
   })

   try {

      const res = await axios.get(`v1/categories/${id}`);

      dispatch({
         type: GET_SUBCATEGORIES,
         payload: res.data
      })

   } catch (error) {
      console.log(error)
   }
}
