import { createSlice } from '@reduxjs/toolkit';

const productReviewCreateSlice = createSlice({
  name: 'productReviewCreate',
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    createReviewStart: (state) => {
      state.loading = true;
    },
    createReviewSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
      state.error = null;
    },
    createReviewFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.response.data.detail;
    },
	resetProductReview: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
	}
  },
});

export const {
  createReviewStart,
  createReviewSuccess,
  createReviewFailure,
  resetProductReview
} = productReviewCreateSlice.actions;
export default productReviewCreateSlice.reducer;
