import React, {Fragment, useEffect} from 'react';
import SubCategoriesList from '../components/subcategories/SubCategoriesList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// 
import { getCategorieById } from '../actions/categoriesAction';
import Spinner from '../components/layouts/Spinner'


const SubCategories = ({ categories : {subcategories, loading}, getCategorieById,match }) => {

   useEffect(() => {

      getCategorieById(match.params.categorie_id);
      window.scrollTo(0, 0);


   }, [getCategorieById, match.params.categorie_id])

   return (
      <div>
         {loading ? <Spinner /> :
            <Fragment>
               <SubCategoriesList categorie={subcategories} />
            </Fragment>
         }
      </div>
   )
}

SubCategories.propTypes = {
   categories: PropTypes.object.isRequired,
   getCategorieById: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
   categories: state.categories
})

export default connect(mapStateToProps, {
   getCategorieById
})(SubCategories);
