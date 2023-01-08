import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: '',
    email: '',
  },
  isLoggedIn: false,
  newUser: false,
};

export const currentUser = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isRegister(state, action) {
      state.user = action.payload;
      state.newUser = true;
    },
    isAuth(state, _) {
      state.isLoggedIn = true;
      state.newUser = false;
    },
    newCurrentUser(state, action) {
      state.user = action.payload;
    },
    onLogOutAction(state, action) {
      state.user = {
        name: '',
        email: '',
      };
      state.newUser = false;
      state.isLoggedIn = false;
    },
  },
});

export const { isRegister, isAuth, newCurrentUser, onLogOutAction } =
  currentUser.actions;
