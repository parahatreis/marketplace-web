import {
    CART_LOAD,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    INCREMENT_QUANTITY,
    DECREMENT_QUANTITY,
    CLEAR_CART
} from '../actions/types';

export const cartLoad = (products) => async dispatch => {

    try {
        dispatch({
            type: CART_LOAD,
            payload: products
        })

    } catch (error) {
        console.log(error)
    }
}

export const addProduct = (product) => async dispatch => {
    const newProductObj = {
        ...product,
        quantity : 1
    }
    try {
        dispatch({
            type: ADD_PRODUCT,
            payload: newProductObj
        })

    } catch (error) {
        console.log(error)
    }
}
export const removeProduct = (product) => async dispatch => {
    try {
        dispatch({
            type: DELETE_PRODUCT,
            payload: product
        })

    } catch (error) {
        console.log(error)
    }
}

export const incrementProductQuantity = (product) => async dispatch => {
    try {
        dispatch({
            type: INCREMENT_QUANTITY,
            payload: product
        })

    } catch (error) {
        console.log(error)
    }
}
export const decrementProductQuantity = (product) => async dispatch => {
    try {
        dispatch({
            type: DECREMENT_QUANTITY,
            payload: product
        })

    } catch (error) {
        console.log(error)
    }
}

export const clearCart = () => async dispatch => {
   dispatch({
      type: CLEAR_CART
   })
}