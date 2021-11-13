import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { discountProducts } from "../actions/productsAction";
import DiscountHeaderProducts from "../components/discount-products/DiscountHeaderProducts";
import DiscountProductsList from "../components/discount-products/DiscountProductsList";
import Spinner from "../components/layouts/Spinner";

const DiscountProducts = ({ products, discountProducts }) => {
  useEffect(() => {
    discountProducts();
    window.scrollTo(0, 0);
  }, [discountProducts]);

  return (
    <>
      {products.count_products && products.products && !products.loading ? (
        <>
          <DiscountHeaderProducts count_products={products.count_products} />
          <div className="all-wrapper">
            <div className="grid-block">
              <DiscountProductsList products={products} />
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

DiscountProducts.propTypes = {
  products: PropTypes.object.isRequired,
  discountProducts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, {
  discountProducts,
})(DiscountProducts);
