import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//
import {
  searchProducts,
  setPageNumber,
  setSortBy,
} from "../../actions/productsAction";

const SearchSortBy = ({
  searchProducts,
  setSortBy,
  setPageNumber,
  query,
}) => {
  const handleChange = (e) => {
    setSortBy(e.target.value);
    setPageNumber(0);
    searchProducts(query, 0, e.target.value);
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

SearchSortBy.propTypes = {
  searchProducts: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, {
  searchProducts,
  setPageNumber,
  setSortBy,
})(SearchSortBy);
