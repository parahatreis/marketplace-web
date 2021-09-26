import React, {Fragment, useEffect, Suspense, lazy} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// 
import { getCategories } from '../actions/categoriesAction';
import Spinner from '../components/layouts/Spinner';
const CategorieList = lazy(() => import('../components/categories/CategorieList'));

const Categories = ({ categories : {categories, loading}, getCategories }) => {
   
   useEffect(() => {
      getCategories();
      window.scrollTo(0, 0);
   }, [getCategories])

   return (
      <Fragment>
         <Suspense fasllback={Spinner}>
            {loading ? <Spinner /> :
               <Fragment>
                     <CategorieList categories={categories} />
               </Fragment>
            }
         </Suspense>
      </Fragment>
   )
}

Categories.propTypes = {
   categories: PropTypes.object.isRequired,
   getCategories: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
   categories: state.categories
})

export default connect(mapStateToProps, {
   getCategories
})(Categories);
