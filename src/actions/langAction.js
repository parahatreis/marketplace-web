import {
    SET_LANG
} from './types';

export const setLanguage = (lang) => async dispatch => {
   dispatch({
      type: SET_LANG,
      payload : lang
   });
}