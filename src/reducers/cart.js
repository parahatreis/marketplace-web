/* eslint-disable default-case */
import {
   CART_LOAD,
   ADD_PRODUCT,
   DELETE_PRODUCT,
   INCREMENT_QUANTITY,
   DECREMENT_QUANTITY,
   SET_LOADING_CART,
   CLEAR_CART
} from '../actions/types';

const initialState = {
   cart: JSON.parse(localStorage.getItem('smCart')),
   loading: false,
};

export default function usersReducer(state = initialState, action) {

   const {
      type,
      payload
   } = action;

   switch (type) {
    case CART_LOAD:
        localStorage.setItem('smCart', JSON.stringify(payload));
        return{
           cart: payload,
           loading: false,
        }
      case ADD_PRODUCT:
         let newArr = [];
         let isExists = false;
         const product = payload;

         if (state.cart && state.cart.length > 0) {
            if (product.sizeNameId) {
               newArr = state.cart.map((val) => {
                  if(val.sizeNameId){
                     if (val.sizeNameId === product.sizeNameId && val.product_id === product.product_id) {
                        isExists = true;
                        return val = {
                           ...val,
                           quantity: Number(val.quantity) + 1
                        }
                     }
                     return val;
                  }
                  return val;
               });
               if (!isExists) {
                  newArr.push(product)
               }
            }
            else {
               newArr = [...state.cart, product]
            }
         }
         else {
            newArr.push(product)
         }
         localStorage.setItem('smCart', JSON.stringify(newArr));
         return {
            ...state,
            cart : newArr,
         }
         
      case DELETE_PRODUCT:
         const productDel = payload;
         let filteredArr = []
         if(productDel.sizeNameId){
            filteredArr = state.cart.filter((product) => {
               if (product.sizeNameId === productDel.sizeNameId && product.product_id === productDel.product_id) {
                  return null;
               }
               return product;
            });
         }
         else{
            filteredArr = state.cart.filter((product) => product.product_id !== productDel.product_id);
         }
         localStorage.setItem('smCart', JSON.stringify(filteredArr));
         return {
            ...state,
            loading: false,
            cart : filteredArr
         }

      case INCREMENT_QUANTITY:
         const productInc = payload;

         let updatedArr1 = state.cart.map((product) => {
            if(product.product_id === productInc.product_id){
               if(productInc.sizeNameId){
                  if(product.product_id === productInc.product_id && productInc.sizeNameId === product.sizeNameId){
                     return product = {
                        ...product,
                        quantity : Number(product.quantity) + 1
                     }
                  }
                  else{
                     return product
                  }
               }
               return product = {
                  ...product,
                  quantity : Number(product.quantity) + 1
               }
            }
            else{
               return product
            }
         });
         localStorage.setItem('smCart', JSON.stringify(updatedArr1));
         return {
            ...state,
            loading: false,
            cart : updatedArr1
         }
      case DECREMENT_QUANTITY:
         const productDec = payload;

         let updatedArr2 = state.cart.map((product) => {
            if(product.product_id === productDec.product_id){
               if(productDec.sizeNameId){
                  if(product.product_id === productDec.product_id && productDec.sizeNameId === product.sizeNameId){
                     return product = {
                        ...product,
                        quantity : Number(product.quantity) - 1
                     }
                  }
                  else{
                     return product
                  }
               }
               return product = {
                  ...product,
                  quantity : Number(product.quantity) - 1
               }
            }
            else{
               return product
            }
         });

         localStorage.setItem('smCart', JSON.stringify(updatedArr2));
         return {
            ...state,
            loading: false,
            cart : updatedArr2
         }
      
      case SET_LOADING_CART:
         return {
            ...state,
            loading : true
         }
      case CLEAR_CART:
         localStorage.removeItem('smCart');
         return{
            cart: [],
            loading: false,
         }
      default:
         return state;

   }
}
