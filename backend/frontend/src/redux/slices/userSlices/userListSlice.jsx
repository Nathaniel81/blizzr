import { createSlice } from '@reduxjs/toolkit';

const userListSlice = createSlice({
  name: 'userList',
  initialState: {
    loading: false,
	users: [],
    error: null,
  },
  reducers: {
    userListRequest: (state) => {
      state.loading = true;
    },
    userListSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    },
    userListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
	userListReset: (state) => {
		state.users = false;
	}
  },
});

export const {
  userListRequest,
  userListSuccess,
  userListFailure,
  userListReset
} = userListSlice.actions;
export default userListSlice.reducer;
