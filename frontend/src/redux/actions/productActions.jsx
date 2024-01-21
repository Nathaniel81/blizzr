// /*eslint-disable*/
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from "../slices/productSlices/productSlice";
import { fetchProductDetailStart, fetchProductDetailFailure, fetchProductDetailSuccess } from "../slices/productSlices/productDetailSlice";
import axios from 'axios'

  export const fetchProducts = (keyword='') => async (dispatch) => {
	try {
		dispatch(fetchProductsStart());
		const { data } = await axios.get(`/api/products${keyword}`)
		dispatch(fetchProductsSuccess(data));
	} catch (error) {
		dispatch(fetchProductsFailure(error));
	}
  };

  export const fetchProductDetail = (id) => async (dispatch) => {
	try {
		dispatch(fetchProductDetailStart());
		const { data } = await axios.get(`/api/products/detail/${id}`)
		dispatch(fetchProductDetailSuccess(data));
	} catch (error) {
		dispatch(fetchProductDetailFailure(error));
	}
  };
