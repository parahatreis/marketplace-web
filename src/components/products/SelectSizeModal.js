import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {useDispatch} from 'react-redux'
import { toast } from "react-toastify";
import CrossSVG from '../../img/icons/cross.svg';
import { addProduct, removeProduct, incrementProductQuantity,decrementProductQuantity } from '../../actions/cartAction';
// 

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "0px",
    transform: "translate(-50%, -50%)",
    zIndex: "16",
  },
  paragraph: {
    textAlign: "left",
  },
  btn: {
    background: "none",
    color: "red",
  },
};

const SelectSizeModal = ({ sizeModalIsOpen, sizeCloseModal, addProduct }) => {
  const [stockNumber, setStockNumber] = useState(10);
  const product = useSelector(state => state.products.selectedProduct);
  const [currentSize, setCurrentSize] = useState('');
  const [hasSize, setHasSize] = useState(false);
   const dispatch = useDispatch();

  useEffect(() => {
    if (product.stocks) {
      if (product.stocks[0].sizeTypeId) {
        setHasSize(true);
        const sizeId = product.stocks[0].sizeName.size_name_id;
        setCurrentSize(sizeId);
        const findStock = product.stocks.find((stock) => stock.sizeName.size_name_id === sizeId);
        setStockNumber(findStock.stock_quantity)
      }
    }
  }, [product.stocks]);

  const addCart = () => {
    if (stockNumber) {
      let newProduct = product;
      newProduct.sizeNameId = currentSize;
      toast.success('Haryt sebede goshuldy!');
      dispatch({
        type: 'SET_MODAL_OPENED',
        payload: false
      });
      dispatch({
        type: 'SET_SELECTED_PRODUCT',
        payload: null
      });
      return addProduct(newProduct);
    }
  }

  const onSizeChange = (sizeId) => {
    setCurrentSize(sizeId)
    const findStock = product.stocks.find((stock) => stock.sizeName.size_name_id === sizeId);
    setStockNumber(findStock.stock_quantity)
  }

  return (
    <Modal
      isOpen={sizeModalIsOpen}
      onRequestClose={sizeCloseModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Example Modal"
    >
      <div className="size-modal-wrapper">
        <div className="close-btn">
          <button onClick={sizeCloseModal}>
            <img src={CrossSVG} alt='cross' />
          </button>
        </div>
        <h1>Haryt olcegi saylan</h1>
        <div className="content">
          <h2>{product.product_name_en}</h2>
          <div className="price">
            <p className="price__new">{product.price} TMT</p>
            {
              product.old_price &&
              <p className="price__old">{product.old_price} TMT</p>
            }
          </div>
          {
            hasSize &&
            <div className="size">
              <div className="size__title">Sizes:</div>
              <ul className="size__list">
                {product.stocks.map((size,index) => <li className={`${size.sizeName.size_name_id === currentSize ? "active" : ""}`} onClick={() => onSizeChange(size.sizeName.size_name_id)} key={index}>{ size.sizeName.size_name}</li>)}
              </ul>
            </div>
          }
          <div className="btn-block">
            <button onClick={() => addCart()} >Add to cart</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

SelectSizeModal.propTypes = {
  addProduct: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
  incrementProductQuantity: PropTypes.func.isRequired,
  decrementProductQuantity: PropTypes.func.isRequired,
  // cart: PropTypes.object.isRequired,
}
// const mapStateToProps = state => ({
//   cart: state.cart,
// })

export default connect(null, {
  addProduct,
  removeProduct,
  incrementProductQuantity,
  decrementProductQuantity
})(SelectSizeModal);
