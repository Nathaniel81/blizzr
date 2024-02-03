import { createSlice } from '@reduxjs/toolkit';

const orderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState: {
    loading: true,
    orderItems: null,
    shippingAddress: {},
  },
  reducers: {
    orderDetailsRequest: (state) => {
      state.loading = true;
    },
    orderDetailsSuccess: (state, action) => {
      state.loading = false;
      state.orderItems = action.payload;
    },
    orderDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFailure,
} = orderDetailSlice.actions;

export default orderDetailSlice.reducer;
