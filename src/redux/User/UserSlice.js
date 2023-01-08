import { createSlice } from '@reduxjs/toolkit';
import authOperations from 'redux/Auth/OperationsAuth';
import userOperations from './OperationsUser';
import { initialState } from './InitialStateUser';


const setPending = state => {
    state.isLoading = true;
    state.error = null;
};

const setError = (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
};

const userSlice = createSlice({
    name: 'user',
    initialState,

    extraReducers: {
        [userOperations.getUserInfo.pending]: setPending,
        [userOperations.getUserInfo.fulfilled]: (state, { payload }) => {
            state.id = payload.data.id;
            state.email = payload.data.email;
            state.balance = payload.data.balance;
            state.isLoading = false;
        },
        [userOperations.getUserInfo.rejected]: setError,

        [authOperations.login.pending]: setPending,
        [authOperations.login.fulfilled]: (state, { payload }) => {
            state.id = payload.data.id;
            state.email = payload.data.email;
            state.isLoading = false;
        },
        [authOperations.login.rejected]: setError,

        [authOperations.register.pending]: setPending,
        [authOperations.register.fulfilled]: (state, { payload }) => {
            state.id = payload.data.id;
            state.email = payload.data.email;
            state.isLoading = false;
        },
        [authOperations.register.rejected]: setError,

        [authOperations.logout.pending]: setPending,
        [authOperations.logout.fulfilled]: state => {
            state.id = initialState.id;
            state.email = initialState.email;
            state.isLoading = false;
        },
        [authOperations.logout.rejected]: setError,
    },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
