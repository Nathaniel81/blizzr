import { createSlice } from '@reduxjs/toolkit';


const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState: {
    loading: false,
    userDetail: null,
    error: null,
  },
  reducers: {
    userDetailRequest: (state) => {
      state.loading = true;
    },
    userDetailSuccess: (state, action) => {
      state.loading = false;
      state.userDetail = action.payload;
      state.error = null;
    },
    userDetailFailure: (state, action) => {
      state.error = action.payload;
    },
  userDetailReset: (state) => {
    state.userDetail = null
  }
  },
});

export const {
  userDetailRequest,
  userDetailSuccess,
  userDetailFailure,
  userDetailReset,
} = userDetailSlice.actions;
export default userDetailSlice.reducer;
