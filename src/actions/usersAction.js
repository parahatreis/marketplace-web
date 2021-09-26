import axios from 'axios';
import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   USER_LOADED,
   AUTH_ERROR,
   LOGIN_FAIL,
   LOGIN_SUCCESS,
   SET_LOADING_AUTH,
   LOGOUT,
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { toast } from "react-toastify";

// Load User
export const loadUser = () => async dispatch => {
   
   if (localStorage.smToken) {
      setAuthToken(localStorage.smToken);
   }
   try {
      const res = await axios.get('/v1/users/auth');
      dispatch({
         type: USER_LOADED,
         payload: res.data
      });
   }
   catch (err) {
      dispatch({ type: AUTH_ERROR });
   }
}

// Register User
export const register = (obj) => async dispatch => {

      dispatch({ type: SET_LOADING_AUTH });


   const config = {
      headers: {
         'Content-Type': 'application/json'  
      }
   };

   const body = JSON.stringify(obj);

   try {
      const res = await axios.post('/v1/users', body, config);

      dispatch({
         type: REGISTER_SUCCESS,
         payload : res.data
      });

      toast.success(res.data.msg)
      return 200;
   }
   catch (err) {
      if (err) {
         const error = err.response.data;
         toast.error(error.msg)
      }
      dispatch({ type: REGISTER_FAIL });
      return 500;
   }
}

// Login User
export const login = (obj) => async dispatch => {

   dispatch({ type: SET_LOADING_AUTH });

   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   };
   const body = JSON.stringify(obj);
   
   try {
      const res = await axios.post('/v1/users/login', body, config);
      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data
      });
      dispatch(loadUser());
      toast.success(res.data.msg)

   }
   catch (err) {
      const error = err.response.data;
      if (error) {
         toast.error(error.msg)
      }
      dispatch({ type: LOGIN_FAIL });
   }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
   dispatch({ type: LOGOUT });
   toast.success('You are logged out!')
}

// Register User
export const updateUser = (obj) => async dispatch => {

   dispatch({ type: SET_LOADING_AUTH });

   const config = {
      headers: {
         'Content-Type': 'application/json'  
      }
   };
   const body = JSON.stringify(obj);

   try {
      await axios.patch('/v1/users', body, config);
      dispatch(loadUser());
   }
   catch (err) {
      const error = err.response.data;
      if (error) {
         toast.error(error.msg)
      }
   }
}

export const changeUserPassword = (obj) => async dispatch => {

   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   };
   const body = JSON.stringify(obj);
   try {
      const res = await axios.patch('/v1/users/change-password', body, config);
      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data
      });
      dispatch(loadUser());
      return 200
   } catch (err) {
      toast.error('Ulgamda ýalňyşlyk ýüze çykdy!');
      return 400
}
}



