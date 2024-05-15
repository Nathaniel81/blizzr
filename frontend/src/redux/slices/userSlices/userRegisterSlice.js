import { createSlice } from '@reduxjs/toolkit';


const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState: {
    loading: false,
  userInfo: false,
    error: null,
  },
  reducers: {
    userRegisterRequest: (state) => {
      state.loading = true;
    },
    userRegisterSuccess: (state) => {
      state.loading = false;
      state.userInfo = true;
      state.error = null;
    },
    userRegisterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  userRegisterReset: (state) => {
    state.userInfo = false;
  }
  },
});

export const {
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFailure,
  userRegisterReset
} = userRegisterSlice.actions;
export default userRegisterSlice.reducer;
