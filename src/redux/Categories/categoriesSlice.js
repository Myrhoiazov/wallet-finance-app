import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from './categoriesOperations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'transactionCategories',
  initialState,

  extraReducers: {
    [fetchCategories.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchCategories.fulfilled]: (state, { payload }) => {
      state.items = payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchCategories.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export const { categoriesAction } = categoriesSlice.actions;

export default categoriesSlice.reducer;
