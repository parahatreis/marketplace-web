import { combineReducers } from 'redux';
import categories from './categories';
import products from './products';
import brands from './brands';
import users from './users';
import cart from './cart';
import lang from './lang';

export default combineReducers({
   categories,
   products,
   brands,
   users,
   cart,
   lang
})