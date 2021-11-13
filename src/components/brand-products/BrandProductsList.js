import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
//
import ProductsItem from "../products/ProductsItem";
import { setPageNumber, brandProducts } from "../../actions/productsAction";

const BrandProductsList = ({
  products: { products, page_number, count_products, sortBy },
  setPageNumber,
  current_brand,
  brandProducts,
}) => {
  const [statePageCount, setStateCounter] = useState(0);
   // Calculate Page Number
  useEffect(() => {
    setStateCounter(Math.ceil(count_products / 5));
  }, [count_products]);

  // Pagination Click
	const handlePageClick = (data) => {
    let selected = data.selected;
    setPageNumber(selected * 5);
    if (current_brand) brandProducts(current_brand.brand_id, selected * 5, sortBy);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <section className="search-products">
        <div className="product-wrapper">
          {products?.map((product, index) => (
            <ProductsItem key={index} product={product} />
          ))}
        </div>
        {count_products === 0 ? (
          <div className="not-info">
            <p> Haryt yok</p>
          </div>
        ) : (
          <ReactPaginate
            onPageChange={handlePageClick}
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={statePageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            initialPage={0}
            forcePage={page_number / 5}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
						activeClassName={"active"}
						disableInitialCallback={true}
          />
        )}
      </section>
    </>
  );
};

BrandProductsList.propTypes = {
  products: PropTypes.object.isRequired,
  brandProducts: PropTypes.func.isRequired,
  setPageNumber: PropTypes.func.isRequired,
};

export default connect(null, {
  brandProducts,
  setPageNumber,
})(BrandProductsList);
