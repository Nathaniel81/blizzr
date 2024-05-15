import { createSlice } from '@reduxjs/toolkit';


const categoriesSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    categories: [],
    error: null,
  },
  reducers: {
    fetchCategoriesStart: (state) => {
      state.loading = true;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = null;
    },
    fetchCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
