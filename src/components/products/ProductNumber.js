import React from 'react';
import PropTypes from 'prop-types';


const ProductNumber = ({ count_products }) => {
   return (
      <p>Haryt Sany : <span>{count_products}</span></p>
   )
};

ProductNumber.propTypes = {
   count_products : PropTypes.any,
}

export default ProductNumber
