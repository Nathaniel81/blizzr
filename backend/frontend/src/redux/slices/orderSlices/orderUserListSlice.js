import { createSlice } from '@reduxjs/toolkit';


const orderUserListSlice = createSlice({
  name: 'orderUserList',
  initialState: {
    loading: false,
    orders: [],
    error: null,
  },
  reducers: {
    orderUserListRequest: (state) => {
      state.loading = true;
    },
    orderUserListSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.error = null;
    },
    orderUserListFailure: (state, action) => {
      state.loading = false;
      state.orders = null;
      state.error = action.payload;
    },
  orderUserListReset: (state) => {
    state.loading = false;
    state.orders = [];
  },
  },
});

export const {
  orderUserListRequest,
  orderUserListSuccess,
  orderUserListFailure,
  orderUserListReset
} = orderUserListSlice.actions;
export default orderUserListSlice.reducer;
