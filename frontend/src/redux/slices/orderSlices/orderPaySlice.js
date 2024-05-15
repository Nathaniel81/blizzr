import { createSlice } from '@reduxjs/toolkit';


const orderPaySlice = createSlice({
  name: 'orderPay',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    orderPayStart: (state) => {
      state.loading = true;
    },
    orderPaySuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    orderPayFailure: (state, action) => {
      state.loading = false;
      state.product = null;
      state.error = action.payload;
      // state.success = false
    },
    orderPayReset: (state) => {
      state.loading = false;
      state.success = false;
    }
  },
});

export const {
  orderPayStart,
  orderPaySuccess,
  orderPayFailure,
  orderPayReset
} = orderPaySlice.actions;
export default orderPaySlice.reducer;
