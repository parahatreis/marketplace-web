import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getProducts,
  filterProducts,
  setPageNumber,
} from "../../actions/productsAction";
//

const Filter = ({
  products: {sortBy},
  current_subcategorie,
  getProducts,
  filterProducts,
  setPageNumber,
}) => {
  // Local States
  const [subcategorie, setSubcategorie] = useState(null);
  const [formData, setFormData] = useState({
    brand: "",
    size: "",
    color: "",
    minPrice: "",
    maxPrice: "",
  });

  // filter left sidebar animation
  useEffect(() => {
    if (subcategorie) {
      const filterBtn = document.querySelector(".filter-btn");
      const filterWrapper = document.querySelector(".filter-section");
      const bgDark = document.querySelector(".bg-dark");

      if (filterWrapper) {
        filterBtn.addEventListener("click", () => {
          filterWrapper.classList.add("filter-active");
          bgDark.classList.add("bg-active");
        });

        bgDark.addEventListener("click", () => {
          filterWrapper.classList.remove("filter-active");
          bgDark.classList.remove("bg-active");
        });
      }
    }
  }, [subcategorie]);

  // Get subcategorie
  useEffect(() => {
    if (current_subcategorie) {
      setSubcategorie(current_subcategorie);
    }
  }, [current_subcategorie]);

  // Set formData
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Submit filter
  const onSubmit = (e) => {
    e.preventDefault();
    filterProducts(formData);
    setPageNumber(0);
    getProducts(subcategorie.subcategorie_id, 0, sortBy, formData);
  };

  const resetFilter = (e) => {
    setFormData({
      brand: "",
      size: "",
      color: "",
      minPrice: "",
      maxPrice: "",
    });
    filterProducts(formData);
    setPageNumber(0);
    getProducts(subcategorie.subcategorie_id);
  };

  return (
    <section className="filter-section">
      <aside className="filter-wrapper">
        <p>Filter</p>
        <form className="filter-inputs" onSubmit={(e) => onSubmit(e)}>
          {/* brand */}
          <div className="brand">
            <label htmlFor="brand">Brend</label> <br />
            <select
              name="brand"
              value={formData.brand}
              onChange={(e) => onChange(e)}
            >
              <option value="" disabled>
                Brend
              </option>
              {subcategorie?.brands &&
                subcategorie?.brands.map((brand, index) => (
                  <option
                    key={index}
                    value={brand.brand_id}
                    data-brand-id={brand.brand_id}
                  >
                    {brand.brand_name}
                  </option>
                ))}
            </select>
          </div>

          {/* size */}
          {subcategorie?.sizeType && subcategorie?.sizeType.size_names && (
            <div className="size">
              <label htmlFor="size">Beden</label> <br />
              <select
                name="size"
                onChange={(e) => onChange(e)}
                value={formData.size}
              >
                <option value="" disabled>
                  Beden
                </option>
                <option value="">Beden saýlama</option>
                {subcategorie?.sizeType.size_names.map((size, index) => (
                  <option
                    key={index}
                    value={size.size_name_id}
                    data-brand-id={size.size_name_id}
                  >
                    {size.size_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Priec - range */}
          <div className="price-range">
            <label htmlFor="price-range">Baha aralygy</label>
            <div className="rangers">
              <input
                type="number"
                name="minPrice"
                min="0"
                value={formData.minPrice}
                onChange={(e) => onChange(e)}
              />
              <span> - </span>
              <input
                type="number"
                name="maxPrice"
                min="0"
                value={formData.maxPrice}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="submit-btn">
            <input type="submit" value="Kabul et" name="filter" />
          </div>
          <div className="submit-btn">
            <button onClick={(e) => resetFilter(e)}>Reset Filter</button>
          </div>
        </form>
      </aside>
    </section>
  );
};

Filter.propTypes = {
  getProducts: PropTypes.func.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  filterProducts: PropTypes.func,
  products: PropTypes.object.isRequired,
  sub_id: PropTypes.any,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, {
  getProducts,
  setPageNumber,
  filterProducts,
})(Filter);
