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
  },
});

export const {
  orderCreateStart,
  orderCreateSuccess,
  orderCreateFailure,
  orderCreateReset
} = orderCreateSlice.actions;
export default orderCreateSlice.reducer;
