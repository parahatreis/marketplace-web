import React from "react";
import BrandSortBy from "./BrandSortBy";
import BrandProductNumber from "./BrandProductNumber";

const BrandSearchHeaderProducts = ({ count_products, current_brand }) => {
  return (
    <section className="header-products">
      <h1>{current_brand.brand_name && current_brand.brand_name}</h1>
      <div className="wrapper">
        <div className="pr-number">
          <BrandProductNumber count_products={count_products} />
        </div>
        <div className="sort">
          <BrandSortBy brand_id={current_brand.brand_id} />
        </div>
      </div>
    </section>
  );
};

export default BrandSearchHeaderProducts;
