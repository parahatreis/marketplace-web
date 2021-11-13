import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//
import { searchProducts } from "../actions/productsAction";
//
import SearchHeaderProducts from "../components/search/SearchHeaderProducts";
import SearchProductsList from "../components/search/SearchProductsList";
import Spinner from "../components/layouts/Spinner";

const Search = ({ products, searchProducts, match }) => {
  useEffect(() => {
    searchProducts(match.params.query);
    window.scrollTo(0, 0);
  }, [searchProducts, match]);

  return (
    <>
      {products.count_products && products.products && !products.loading ? (
        <>
          <SearchHeaderProducts
            count_products={products.count_products}
            query={match.params.query}
          />
          <div className="all-wrapper">
            <div className="grid-block">
              <SearchProductsList
                products={products}
                query={match.params.query}
              />
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

Search.propTypes = {
  products: PropTypes.object.isRequired,
  searchProducts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, {
  searchProducts,
})(Search);
