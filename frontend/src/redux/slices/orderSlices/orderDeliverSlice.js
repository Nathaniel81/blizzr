import { createSlice } from '@reduxjs/toolkit';


const orderDeliverSlice = createSlice({
  name: 'orderDeliver',
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    orderDeliverRequest: (state) => {
      state.loading = true;
    },
    orderDeliverSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    orderDeliverFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  orderDeliverReset: (state) => {
    state.success = null;
    state.error = null;
  },
  },
});

export const {
  orderDeliverRequest,
  orderDeliverSuccess,
  orderDeliverFailure,
  orderDeliverReset
} = orderDeliverSlice.actions;
export default orderDeliverSlice.reducer;
