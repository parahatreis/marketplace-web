import {
    SET_LANG
 } from '../actions/types';
 
 
 const initialState = {
    lang : localStorage.getItem('i18nextLng') ? localStorage.getItem('i18nextLng') : 'tm',
 }
 
 export default function langReducer(state = initialState, action) {
    const { type, payload } = action;
 
    switch (type) {
       case SET_LANG:
          return {
             ...state,
             lang: payload
          }
       default:
          return state;
    }
 }