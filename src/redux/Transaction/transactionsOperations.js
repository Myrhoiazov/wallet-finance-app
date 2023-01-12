import { transactionsAPI } from '../../services/TransactionsApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const { data } = await transactionsAPI.getTransactions(page, limit);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  'transaction/updateTransaction',
  async (transaction, { rejectWithValue }) => {
    try {
      const { data } = await transactionsAPI.postTransactions(transaction);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
