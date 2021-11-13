import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//
import { brandProducts, clearData } from "../actions/productsAction";
import { getCurrentBrand } from "../actions/brandsAction";
//
import BrandHeaderProducts from "../components/brand-products/BrandHeaderProducts";
import BrandProductsList from "../components/brand-products/BrandProductsList";
import Spinner from "../components/layouts/Spinner";

const BrandProducts = ({
  products,
  brandProducts,
  getCurrentBrand,
  match,
  current_brand
}) => {

  useEffect(() => {
    brandProducts(match.params.brand_id);
    window.scrollTo(0, 0);
  }, [brandProducts, match]);

  useEffect(() => {
    getCurrentBrand(match.params.brand_id);
  }, [getCurrentBrand, match]);

  return (
    <>
      {current_brand && products.products && !products.loading ? (
				<>
					<BrandHeaderProducts
          count_products={products.count_products}
          current_brand={current_brand}
				/>
				<div className="all-wrapper">
					<div className="grid-block">
						<BrandProductsList
							products={products}
							current_brand={current_brand}
						/>
					</div>
				</div>
				</>
      ) : <Spinner />}
    </>
  );
};

BrandProducts.propTypes = {
  products: PropTypes.object.isRequired,
  brandProducts: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired,
  current_brand: PropTypes.object,
};
const mapStateToProps = (state) => ({
  products: state.products,
  current_brand: state.brands.current_brand,
});

export default connect(mapStateToProps, {
  brandProducts,
  getCurrentBrand,
  clearData,
})(BrandProducts);
