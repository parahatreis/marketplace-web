import {
   GET_CATEGORIES,
   GET_SUBCATEGORIES,
   GET_HOME_CATEGORIES,
   SET_LOADING,
   GET_NAVBAR_CATEGORIES,
   GET_CURRENT_SUBCATEGORIE,
} from '../actions/types';


const initialState = {
   home_categories : [],
   categories: [],
   navbar_categories: [],
   home_subcategories : [],
   subcategories: [],
   current_subcategorie : null,
   loading : false
}

export default function categoriesReducer(state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case SET_LOADING:
         return {
            ...state,
            loading: true
         }
      case GET_HOME_CATEGORIES:
         return {
            ...state,
            home_categories: payload,
            loading: false
         }
      case GET_CURRENT_SUBCATEGORIE:
         return {
            ...state,
            current_subcategorie: payload,
            loading: false
         }
      case GET_NAVBAR_CATEGORIES:
         return {
            ...state,
            navbar_categories: payload,
            loading: false
         }
      case GET_CATEGORIES:
         return {
            ...state,
            categories: payload,
            loading : false
         }
      case GET_SUBCATEGORIES:
         return {
            ...state,
            subcategories: payload,
            loading: false
         }
      default:
         return state;
   }
}