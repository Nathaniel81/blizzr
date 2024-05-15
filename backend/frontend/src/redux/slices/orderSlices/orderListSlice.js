import { createSlice } from '@reduxjs/toolkit';

const orderListSlice = createSlice({
  name: 'orderList',
  initialState: {
    loading: false,
    orders: [],
    error: null,
  },
  reducers: {
    orderListRequest: (state) => {
      state.loading = true;
    },
    orderListSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.error = null;
    },
    orderListFailure: (state, action) => {
      state.loading = false;
      state.orders = null;
      state.error = action.payload;
    },
  orderListReset: (state) => {
    state.loading = false;
    state.orders = [];
  },
  },
});

export const {
  orderListRequest,
  orderListSuccess,
  orderListFailure,
  orderListReset
} = orderListSlice.actions;
export default orderListSlice.reducer;
