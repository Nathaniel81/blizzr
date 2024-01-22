// /*eslint-disable*/
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from "../slices/productSlices/productSlice";
import { fetchProductDetailStart, fetchProductDetailFailure, fetchProductDetailSuccess } from "../slices/productSlices/productDetailSlice";
import { createReviewSuccess, createReviewStart, createReviewFailure } from "../slices/productSlices/productReviewCreateSlice";
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

  export const createProductReview = (id, review) => async (dispatch) => {
	try {
		dispatch(createReviewStart());
		// const {
        //     userLogin: { userInfo },
        // } = getState()

        // const config = {
        //     headers: {
        //         'Content-type': 'application/json',
        //         Authorization: `Bearer ${userInfo.token}`
        //     }
        // }
		const { data } = await axios.post(
			`/api/products/${id}/review/`,
			review
			)
		dispatch(createReviewSuccess(data));
	} catch (error) {
		dispatch(createReviewFailure(error));
	}
  };
