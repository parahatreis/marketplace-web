import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// 
import BrandList from '../components/brands/BrandList';
import { getBrands } from '../actions/brandsAction';
import Spinner from '../components/layouts/Spinner'


const Brands = ({brands : {brands, loading} ,getBrands}) => {

   useEffect(() => {
      getBrands();
      window.scrollTo(0, 0);
   }, [getBrands])

   return (
      <>
         {
            loading ? <Spinner /> : 
            <Fragment>
               <BrandList brands={brands} />
            </Fragment>
         }
      </>
   )
}

Brands.propTypes = {
   brands: PropTypes.object.isRequired,
   getBrands: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
   brands: state.brands
})

export default connect(mapStateToProps, {
   getBrands
})(Brands);
