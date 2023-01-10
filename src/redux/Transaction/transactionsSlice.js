import { createSlice } from '@reduxjs/toolkit';
import { updateTransaction, fetchTransactions } from './transactionsOperations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,

  extraReducers: {
    [fetchTransactions.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchTransactions.fulfilled]: (state, { payload }) => {
      state.items = payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchTransactions.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },

    [updateTransaction.pending]: state => {
      state.isLoading = true;
    },
    [updateTransaction.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      console.log('state whole', state);
      console.log('state before', state.items);
      state.items = [...state.items, payload];
      console.log('state', state.items);
      state.isLoading = false;
      state.error = null;
    },
    [updateTransaction.rejected]: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export default transactionsSlice.reducer;
