import { createSlice } from '@reduxjs/toolkit';

const userUpdateSlice = createSlice({
  name: 'userUpdate',
  initialState: {
    loading: false,
	success: false,
    error: null,
  },
  reducers: {
    userUpdateRequest: (state) => {
      state.loading = true;
    },
    userUpdateSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    userUpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
	userUpdateReset: (state) => {
		state.success = false;
	}
  },
});

export const {
  userUpdateRequest,
  userUpdateSuccess,
  userUpdateFailure,
  userUpdateReset
} = userUpdateSlice.actions;
export default userUpdateSlice.reducer;
