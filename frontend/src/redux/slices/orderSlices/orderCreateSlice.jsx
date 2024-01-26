import { createSlice } from '@reduxjs/toolkit';

const orderCreateSlice = createSlice({
  name: 'orderCreate',
  initialState: {
    loading: false,
    success: false,
     order: {},
    error: null,
  },
  reducers: {
    orderCreateStart: (state) => {
      state.loading = true;
    },
    orderCreateSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    orderCreateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    orderCreateReset: (state) => {
      state.order = {};
      state.success = false;
    },
    // cartSaveShippingAddress: (state, action) => {
    //   state.shippingAddress = action.payload;
    // },
    // cartSavePaymentMethod: (state, action) => {
    //   state.paymentMethod = action.payload;
    // },
    // cartClearItems: (state) => {
    //   state.cartItems = [];
    // },
  },
});

export const {
  orderCreateStart,
  orderCreateSuccess,
  orderCreateFailure,
  orderCreateReset
//   cartRemoveItem,
//   cartSaveShippingAddress,
//   cartSavePaymentMethod,
//   cartClearItems,
} = orderCreateSlice.actions;
export default orderCreateSlice.reducer;
