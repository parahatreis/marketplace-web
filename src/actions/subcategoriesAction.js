import axios from 'axios';
import {
   GET_SUBCATEGORIES,
   GET_CURRENT_SUBCATEGORIE,
   SET_LOADING,
} from './types';


// GET ALL SubCategories
export const getSubCategories = () => async dispatch => {

   dispatch({
      type: SET_LOADING
   });

   try {
      const res = await axios.get('/v1/subcategories');

      dispatch({
         type: GET_SUBCATEGORIES,
         payload: res.data
      })
   } catch (error) {
      console.log(error)
   }
}



// GET ALL SubCategories
export const getCurrentSubcategorie = (id) => async dispatch => {

   dispatch({
      type: SET_LOADING
   });

   try {
      const res = await axios.get(`/v1/subcategories/${id}`, {
         params: {
            brands : 1
         }
      });

      dispatch({
         type: GET_CURRENT_SUBCATEGORIE,
         payload: res.data
      })
   } catch (error) {
      console.log(error)
   }
}
