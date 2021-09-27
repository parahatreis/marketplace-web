import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import SelectSizeModal from '../products/SelectSizeModal';

const Modal = () => {
  const dispatch = useDispatch();
  const [sizeModalIsOpen, setSizeModalIsOpen] = useState(true);
  const modalOpened = useSelector(state => state.products.modalOpened);

  useEffect(() => {
    setSizeModalIsOpen(modalOpened);
  }, [modalOpened])

  const sizeCloseModal = () => {
    dispatch({ type: 'SET_MODAL_OPENED', payload: false });
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: null });
    setSizeModalIsOpen(false)
  };

  return (
    <>
      {modalOpened && <SelectSizeModal sizeModalIsOpen={sizeModalIsOpen} sizeCloseModal={sizeCloseModal}  />}
    </>
  )
}

export default Modal
