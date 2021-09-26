import {
   GET_PRODUCTS,
   GET_HOME_PRODUCTS,
   COUNT_PRODUCTS,
   SET_LOADING_PRODUCTS,
   SET_SORTBY,
   PAGE_NUMBER,
   GET_PRODUCT_BRANDS,
   SET_FILTER,
   CURRENT_PRODUCT,
   CLEAR_PRODUCTS_DATA,
} from '../actions/types';


const initialState = {
   home_products: [],
   products: null,
   count_products: null,
   sortBy: null,
   page_number: 0,
   product_brands: [],
   filter : {},
   loading: false,
   current_product : {}
}

export default function productsReducer(state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case SET_LOADING_PRODUCTS:
         return {
            ...state,
            loading: true
         }
      case GET_HOME_PRODUCTS:
         return {
            ...state,
            home_products: [
               ...state.home_products,
               payload
            ],
            loading: false
         }
      case GET_PRODUCTS:
         return {
            ...state,
            products : payload,
            loading: false
         }
      case CLEAR_PRODUCTS_DATA:
         return {
            ...state,
            products: null,
            count_products: null,
            sortBy: null,
         }
      case COUNT_PRODUCTS:
         return {
            ...state,
            count_products: payload,
         }
      case CURRENT_PRODUCT:
         return {
            ...state,
            current_product: payload,
            loading : false
         }
      case SET_SORTBY:
         return {
            ...state,
            sortBy: payload,
         }
      case PAGE_NUMBER:
         return {
            ...state,
            page_number: payload,
         }
      case GET_PRODUCT_BRANDS:
         return {
            ...state,
            product_brands: payload,
         }
      case SET_FILTER:
         return {
            ...state,
            filter: payload,
         }
      default:
         return state;
   }
}