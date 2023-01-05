import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

export const currentToken = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(_, action) {
      return action.payload.token;
    },
    unsetToken(state, action) {
      return (state = '');
    },
  },
});

export const { setToken, unsetToken } = currentToken.actions;
