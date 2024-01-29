import { createSlice } from '@reduxjs/toolkit';

const productCreateSlice = createSlice({
  name: 'productCreate',
  initialState: {
    loading: false,
    success: false,
	product: {},
    error: null
  },
  reducers: {
    productCreateStart: (state) => {
      state.loading = true;
    },
    productCreateSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.success = true;
      state.error = null;
    },
    productCreateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    productCreateReset: (state) => {
		state.success = false;
		state.error = null;
		state.product = {}
	}
  },
});

export const {
  productCreateStart,
  productCreateSuccess,
  productCreateFailure,
  productCreateReset,
} = productCreateSlice.actions;
export default productCreateSlice.reducer;
