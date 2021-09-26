// import axios from 'axios';
// import {
//    GET_BRANDS,
//    SET_LOADING_BRANDS
// } from './types';

// export const getBrands = () => async dispatch => {
//    dispatch({
//       type: SET_LOADING_BRANDS
//    });
//    try {
//       const res = await axios.get('/v1/brands');

//       dispatch({
//          type: GET_BRANDS,
//          payload: res.data
//       })

//    } catch (error) {
//       console.log(error)
//    }
// }