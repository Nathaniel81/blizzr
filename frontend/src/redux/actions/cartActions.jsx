import { cartAddItemStart, cartAddItemSuccess, cartAddItemFailure, cartRemoveItem } from "../slices/cartSlices/addToCartSlice";
import axios from "axios";


  export const addToCart = (id, qty) => async (dispatch, getState) => {
	try {
		dispatch(cartAddItemStart());
		const { data } = await axios.get(`/api/products/detail/${id}`)
		dispatch(cartAddItemSuccess({
			product: data.id,
            name: data.name,
            image: data.main_image,
            price: data.price,
            countInStock: data.countInStock,
            qty
		}));
		localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
	} catch (error) {
		dispatch(cartAddItemFailure(error));
	}
  };

  export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch(cartRemoveItem(id));
  
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  }