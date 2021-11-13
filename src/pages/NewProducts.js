import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//
import { newProducts } from "../actions/productsAction";
//
import NewHeaderProducts from "../components/new-products/NewHeaderProducts";
import NewProductsList from "../components/new-products/NewProductsList";
import Spinner from "../components/layouts/Spinner";

const NewProducts = ({ products, newProducts }) => {
  useEffect(() => {
    newProducts();
    window.scrollTo(0, 0);
  }, [newProducts]);

  return (
    <>
      {products.count_products && products.products && !products.loading ? (
        <>
          <NewHeaderProducts count_products={products.count_products} />
          <div className="all-wrapper">
            <div className="grid-block">
              <NewProductsList products={products} />
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

NewProducts.propTypes = {
  products: PropTypes.object.isRequired,
  newProducts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, {
  newProducts,
})(NewProducts);
