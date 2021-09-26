import {
   GET_BRANDS,
   GET_CURRENT_BRAND,
   SET_LOADING_BRANDS
} from '../actions/types';


const initialState = {
   brands: [],
   current_brand: null,
   loading : false
}

export default function brandsReducer(state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case SET_LOADING_BRANDS:
         return {
            ...state,
            loading: true
         }
      case GET_CURRENT_BRAND:
         return {
            ...state,
            current_brand: payload
         }
      case GET_BRANDS:
         return {
            ...state,
            brands: payload,
            loading: false
         }
      default:
         return state;
   }
}