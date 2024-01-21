import { createSlice } from '@reduxjs/toolkit';

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: {
    loading: false,
    product: [],
    smallImages: [],
    error: null,
  },
  reducers: {
    fetchProductDetailStart: (state) => {
      state.loading = true;
    },
    fetchProductDetailSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.smallImages = action.payload.additional_images,
      state.error = null;
    },
    fetchProductDetailFailure: (state, action) => {
      state.loading = false;
      state.product = null;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductDetailStart,
  fetchProductDetailSuccess,
  fetchProductDetailFailure,
} = productDetailSlice.actions;
export default productDetailSlice.reducer;
