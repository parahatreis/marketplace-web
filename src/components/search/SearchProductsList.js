import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
//
import ProductsItem from "../products/ProductsItem";
import { setPageNumber, searchProducts } from "../../actions/productsAction";

const SearchProductsList = ({
  products: { products, page_number, count_products, sortBy },
  setPageNumber,
  query,
  searchProducts,
}) => {
  const [pageCount, setCounter] = useState(1);

  // Calculate Page Number
  useEffect(() => {
    setCounter(Math.ceil(count_products / 5));
  }, [count_products]);

  // Pagination Click
  const handlePageClick = (data) => {
    let selected = data.selected;
    setPageNumber(selected * 5);
    searchProducts(query, selected * 5, sortBy);
    window.scrollTo(0, 0);
  };

  return (
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
          pageCount={pageCount && pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={10}
          initialPage={0}
          forcePage={page_number / 10}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          disableInitialCallback={true}
        />
      )}
    </section>
  );
};

SearchProductsList.propTypes = {
  products: PropTypes.object.isRequired,
  searchProducts: PropTypes.func.isRequired,
  setPageNumber: PropTypes.func.isRequired,
};

export default connect(null, {
  searchProducts,
  setPageNumber,
})(SearchProductsList);
