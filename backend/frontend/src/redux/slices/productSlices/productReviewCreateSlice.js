import { createSlice } from '@reduxjs/toolkit';


const productReviewCreateSlice = createSlice({
  name: 'productReviewCreate',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    createReviewStart: (state) => {
      state.loading = true;
    },
    createReviewSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    createReviewFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  resetProductReview: (state) => {
      state.success = false;
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
