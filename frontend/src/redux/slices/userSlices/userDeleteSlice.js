import { createSlice } from '@reduxjs/toolkit';


const userDeleteSlice = createSlice({
  name: 'userDelete',
  initialState: {
    loading: false,
  success: false,
    error: null,
  },
  reducers: {
    userDeleteRequest: (state) => {
      state.loading = true;
    },
    userDeleteSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    userDeleteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  userDeleteReset: (state) => {
    state.success = false;
    state.error = null;
  }
  },
});

export const {
  userDeleteRequest,
  userDeleteSuccess,
  userDeleteFailure,
  userDeleteReset
} = userDeleteSlice.actions;
export default userDeleteSlice.reducer;
