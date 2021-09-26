import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// 
import { getProducts, setPageNumber, setSortBy } from '../../actions/productsAction';

const SortBy = ({ products : {filter },getProducts ,current_subcategorie, setSortBy,setPageNumber }) => {
   

   const handleChange = (e) => {
      setSortBy(e.target.value);
      setPageNumber(0);
      getProducts(current_subcategorie.subcategorie_id, 0, e.target.value, filter);
   }

   return (
      <>
         <select
            name="sortBy"
            onChange={(e) => handleChange(e)}
            defaultValue={'default-value'}
         >
            <option value='default-value' disabled>Tertiplemek</option>
            <option value="createdAt:desc">Taze harytlar</option>
            <option value="createdAt:asc">Onki harytlar</option>
            <option value="price:asc">Arzan baha</option>
            <option value="price:desc">Gymmat baha</option>
         </select>
      </>
   )
}


SortBy.propTypes = {
   getProducts: PropTypes.func.isRequired,
   setSortBy: PropTypes.func.isRequired,
   setPageNumber: PropTypes.func.isRequired,
   products: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
   products: state.products
})

export default connect(mapStateToProps, {
   getProducts,
   setPageNumber,
   setSortBy
})(SortBy);
