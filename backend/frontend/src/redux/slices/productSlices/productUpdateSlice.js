import { createSlice } from '@reduxjs/toolkit';

const productUpdateSlice = createSlice({
  name: 'productUpdate',
  initialState: {
    loading: false,
    success: false,
	error: false
  },
  reducers: {
    productUpdateStart: (state) => {
      state.loading = true;
    },
    productUpdateSuccess: (state) => {
      state.loading = false;
      state.success =  true;
    },
    productUpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
	productUpdateReset: (state) => {
		state.error = false;
		state.success = false;
	},
  },
});

export const {
  productUpdateStart,
  productUpdateSuccess,
  productUpdateFailure,
  productUpdateReset
} = productUpdateSlice.actions;
export default productUpdateSlice.reducer;
