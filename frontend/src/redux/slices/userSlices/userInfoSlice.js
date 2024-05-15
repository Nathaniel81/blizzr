import { createSlice } from '@reduxjs/toolkit';


const userInfoSlice = createSlice({
  name: 'userLoginInfo',
  initialState: {
    loading: false,
    user: localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null,
    error: null,
  },
  reducers: {
    userLoginRequest: (state) => {
      state.loading = true;
    },
    userLoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    userLoginFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    userLogout: (state) => {
      state.user = null;
    }
  },
});

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure,
  userLogout
} = userInfoSlice.actions;
export default userInfoSlice.reducer;
