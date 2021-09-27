import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// Styles
import './styles/style.scss';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import Loadable from 'react-loadable';
// Components
import About from './pages/About';
import Terms from './pages/Terms';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
// PrivateRoutes
import PrivateRoute from './components/private-routes/PrivateRoute';
// State
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/usersAction';
import setAuthToken from './utils/setAuthToken';
import apiPath from './utils/apiPath';
// 
import Spinner from './components/layouts/Spinner';
import Modal from './components/layouts/Modal';

axios.defaults.baseURL = apiPath();
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';


const Home = Loadable({
   loader: () => import('./pages/Home'),
   loading: Spinner,
});
const Categories = Loadable({
   loader: () => import('./pages/Categories'),
   loading: Spinner,
});
const SubCategories = Loadable({
   loader: () => import('./pages/SubCategories'),
   loading: Spinner,
});
const Products = Loadable({
   loader: () => import('./pages/Products'),
   loading: Spinner,
});
const Search = Loadable({
   loader: () => import('./pages/Search'),
   loading: Spinner,
});
const Brands = Loadable({
   loader: () => import('./pages/Brands'),
   loading: Spinner,
});
const BrandProducts = Loadable({
   loader: () => import('./pages/BrandProducts'),
   loading: Spinner,
});
const ProductDetails = Loadable({
   loader: () => import('./pages/ProductDetails'),
   loading: Spinner,
});
const Cart = Loadable({
   loader: () => import('./pages/Cart'),
   loading: Spinner,
});
const Account = Loadable({
   loader: () => import('./pages/Account'),
   loading: Spinner,
});
const Orders = Loadable({
   loader: () => import('./pages/Orders'),
   loading: Spinner,
});
const Contacts = Loadable({
   loader: () => import('./pages/Contacts'),
   loading: Spinner,
});
const CartPayment = Loadable({
   loader: () => import('./pages/CartPayment'),
   loading: Spinner,
});
const ForgotPassword = Loadable({
   loader: () => import('./pages/ForgotPassword'),
   loading: Spinner,
});
const ChangePassword = Loadable({
   loader: () => import('./pages/ChangePassword'),
   loading: Spinner,
});
const Register = Loadable({
   loader: () => import('./components/auth/Register'),
   loading: Spinner,
});
const Login = Loadable({
   loader: () => import('./components/auth/Login'),
   loading: Spinner,
});
const NewProducts = Loadable({
   loader: () => import('./pages/NewProducts'),
   loading: Spinner,
});
const DiscountProducts = Loadable({
   loader: () => import('./pages/DiscountProducts'),
   loading: Spinner,
});


const App = () => {

   useEffect(() => {
      if (localStorage.smToken) {
         setAuthToken(localStorage.smToken);
      }
      store.dispatch(loadUser());
      if (!localStorage.i18nextLng) {
         localStorage.setItem('i18nextLng', 'tm')
      }
      // CALL IT ONCE IN YOUR APP
      if (typeof window !== "undefined") {
         injectStyle();
      }
   }, []);

   return ( 
   <Provider store={store} >
      <Router>
      <ToastContainer 
         position="top-center"
         autoClose={3000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         limit={3}
            />
         <Navbar />
         <div className="container">
               <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/categories" component={Categories} />
                  <Route exact path="/subcategories/:categorie_id" component={SubCategories} />
                  <Route exact path="/subcategories/products/:subcategorie_id" component={Products} />
                  <Route exact path="/search/:query" component={Search} />
                  <Route exact path="/brands" component={Brands} />
                  <Route exact path="/brands/products/:brand_id" component={BrandProducts} />
                  <Route exact path="/products/:product_id" component={ProductDetails} />
                  <Route exact path="/new-products" component={NewProducts} />
                  <Route exact path="/discount-products" component={DiscountProducts} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/cart" component={Cart} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/contacts" component={Contacts} />
                  <Route exact path="/terms" component={Terms} />
                  <Route exact path="/payment" component={CartPayment} />
                  <Route exact path="/forgot-password" component={ForgotPassword} />
                  {/* Private */}
                  <PrivateRoute exact path="/profile" component={Account} />
                  <PrivateRoute exact path="/orders" component={Orders} />
                  <PrivateRoute exact path="/change-password" component={ChangePassword} />
               </Switch>
            </div>
            <Modal />
            <Footer />
         </Router>
   </Provider>
   );
}

export default App;
