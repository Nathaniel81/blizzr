import { createSlice } from '@reduxjs/toolkit';

const orderCreateSlice = createSlice({
  name: 'orderCreate',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    orderCreateStart: (state) => {
      state.loading = true;
    },
    orderCreateSuccess: (state) => {
      state.loading = false;
      state.order = true;
    },
    orderCreateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    orderCreateReset: (state) => {
      state.order = {}
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
