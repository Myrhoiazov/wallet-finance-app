import { transactionsAPI } from '../../services/TransactionsApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { token } from '../../services/http';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async (_, { rejectWithValue, getState }) => {
    try {
      // const { token: storedToken } = getState().auth;

      // if (!storedToken) {
      //   return rejectWithValue();
      // }
      // token.set(storedToken);
      const { data } = await transactionsAPI.getTransactions();
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
      console.log(data, 'in transactions data:');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
