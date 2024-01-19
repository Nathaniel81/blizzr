// /*eslint-disable*/
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from "../reducers/productSlice";
import axios from 'axios'

export const fetchProducts = (keyword='') => async (dispatch) => {
	try {
		dispatch(fetchProductsStart());
		const { data } = await axios.get(`http://127.0.0.1:8000/api/products${keyword}`)
		dispatch(fetchProductsSuccess(data));
	} catch (error) {
		dispatch(fetchProductsFailure(error));
	}
  };
  