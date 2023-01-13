import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../services/AuthApi';
import { token } from '../../services/http';

const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const data = await authAPI.registerUser(credentials);
      await dispatch(authOperations.login({email:credentials.email,password:credentials.password}))
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.message,
        status: error.response.status,
      });
    }
  }
);

const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authAPI.loginUser(credentials);
      token.set(data.data.token);
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.message,
        status: error.response.status,
      });
    }
  }
);

const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logoutUser();
      token.unset();
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.message,
        status: error.response.status,
      });
    }
  }
);

const authOperations = { register, login, logout };

export default authOperations;
