import { createSlice } from '@reduxjs/toolkit';

const productDeleteSlice = createSlice({
  name: 'productDelete',
  initialState: {
    loading: false,
    success: false,
    error: null
  },
  reducers: {
    productDeleteStart: (state) => {
      state.loading = true;
    },
    productDeleteSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    productDeleteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    productDeleteReset: (state) => {
		state.success = false;
		state.error = null;
	}
  },
});

export const {
  productDeleteStart,
  productDeleteSuccess,
  productDeleteFailure,
  productDeleteReset,
} = productDeleteSlice.actions;
export default productDeleteSlice.reducer;
