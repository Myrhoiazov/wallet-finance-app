import { categoriesAPI } from '../../services/CategoriesApi';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await categoriesAPI.getCategories();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
