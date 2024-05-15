import { createSlice } from '@reduxjs/toolkit';


const productTopSlice = createSlice({
  name: 'productTop',
  initialState: {
    loading: false,
    products: [],
    error: null,
  },
  reducers: {
    fetchTopProductsStart: (state) => {
      state.loading = true;
    },
    fetchTopProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchTopProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTopProductsStart,
  fetchTopProductsSuccess,
  fetchTopProductsFailure,
} = productTopSlice.actions;
export default productTopSlice.reducer;
