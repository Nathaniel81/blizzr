import { 
    cartAddItemStart, 
    cartAddItemSuccess, 
    cartAddItemFailure, 
    cartRemoveItem, 
    cartSaveShippingAddress,
    cartSavePaymentMethod
} from "../slices/cartSlices/addToCartSlice";
import axios from "axios";


export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
      dispatch(cartAddItemStart());
      const { data } = await axios.get(`/api/products/detail/${id}`)
      dispatch(cartAddItemSuccess({
          product: data.id,
          name: data.name,
          image: data.images[0],
          price: data.price,
          countInStock: data.countInStock,
          qty
      }));
      localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  } catch (error) {
      dispatch(cartAddItemFailure(
          error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
      ));
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(cartRemoveItem(id));

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(cartSaveShippingAddress(data));
  localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch(cartSavePaymentMethod(data));
  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
