import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//
import {
  newProducts,
  setPageNumber,
  setSortBy,
} from "../../actions/productsAction";

const NewProductsSortBy = ({ newProducts, setSortBy, setPageNumber }) => {
  const handleChange = (e) => {
    setSortBy(e.target.value);
    setPageNumber(0);
    newProducts(0, e.target.value);
  };

  return (
    <select
      name="sortBy"
      onChange={(e) => handleChange(e)}
      defaultValue={"default-value"}
    >
      <option value="default-value" disabled>
        Tertiplemek
      </option>
      <option value="createdAt:desc">Taze harytlar</option>
      <option value="createdAt:asc">Onki harytlar</option>
      <option value="price:asc">Arzan baha</option>
      <option value="price:desc">Gymmat baha</option>
    </select>
  );
};

NewProductsSortBy.propTypes = {
  newProducts: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
  setPageNumber: PropTypes.func.isRequired,
};

export default connect(null, {
  newProducts,
  setPageNumber,
  setSortBy,
})(NewProductsSortBy);
