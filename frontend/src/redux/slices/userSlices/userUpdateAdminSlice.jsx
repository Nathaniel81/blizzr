import { createSlice } from '@reduxjs/toolkit';

const userUpdateAdminSlice = createSlice({
  name: 'userUpdateAdmin',
  initialState: {
    loading: false,
	success: false,
    error: null,
  },
  reducers: {
    userUpdateAdminRequest: (state) => {
      state.loading = true;
    },
    userUpdateAdminSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    userUpdateAdminFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
	userUpdateAdminReset: (state) => {
		state.success = false;
		state.error = null;
	}
  },
});

export const {
  userUpdateAdminRequest,
  userUpdateAdminSuccess,
  userUpdateAdminFailure,
  userUpdateAdminReset
} = userUpdateAdminSlice.actions;
export default userUpdateAdminSlice.reducer;
