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

  export const createProductReview = (id, review) => async (dispatch, getState) => {
	try {
		dispatch(createReviewStart());
		const {
            userInfo: { user },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${user.access}`
            }
        }
		console.log(user.token)
		const { data } = await axios.post(
			`/api/products/${id}/review/`,
			review,
			config
			)
		dispatch(createReviewSuccess(data));
	} catch (error) {
		dispatch(createReviewFailure(error));
	}
  };
