import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// 
import { brandProducts, setPageNumber, setSortBy } from '../../actions/productsAction';

const BrandSortBy = ({ brandProducts, setSortBy,setPageNumber, brand_id }) => {

   const handleChange = (e) => {
      setSortBy(e.target.value);
      setPageNumber(0);
      brandProducts(brand_id, 0, e.target.value);
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


BrandSortBy.propTypes = {
   brandProducts: PropTypes.func.isRequired,
   setSortBy: PropTypes.func.isRequired,
   setPageNumber: PropTypes.func.isRequired,
}

export default connect(null, {
   brandProducts,
   setPageNumber,
   setSortBy
})(BrandSortBy);
