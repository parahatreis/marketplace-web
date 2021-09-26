/* eslint-disable default-case */
import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   USER_LOADED,
   AUTH_ERROR,
   LOGIN_FAIL,
   LOGIN_SUCCESS,
   LOGOUT,
   SET_LOADING_AUTH
} from '../actions/types';

const initialState = {
   token: localStorage.getItem('smToken'),
   isAuthenticated: null,
   loading: false,
   user : null
};

export default function usersReducer(state = initialState, action) {

   const {
      type,
      payload
   } = action;

   switch (type) {

      case USER_LOADED:
         return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user : payload
         }
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
         localStorage.setItem('smToken', payload.token);
         return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading : false
         }
      case REGISTER_FAIL:
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
         localStorage.removeItem('smToken');
         return {
            ...state,
            token: null,
            user : null,
            isAuthenticated: false,
            loading: false
         }
      case SET_LOADING_AUTH:
         return {
            ...state,
            loading : true
         }
      default:
         return state;

   }
}
