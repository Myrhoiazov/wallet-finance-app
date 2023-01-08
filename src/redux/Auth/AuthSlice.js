import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './InitialStateAuth';
import authOperations from './OperationsAuth';

const setPending = state => {
    state.isLoading = true;
    state.error = null;
};

const setError = (state, { payload }) => {
    state.isLoading = false;
    state.error = payload;
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetToken(state) {
            state.token = initialState.token;
        },
        setToken(state, { payload }) {
            state.token = payload;
        },
    },

    extraReducers: {
        [authOperations.register.pending]: setPending,
        [authOperations.register.fulfilled]: (state, { payload }) => {
            state.token = payload.data.token;
            state.isLoading = false;
        },
        [authOperations.register.rejected]: setError,

        [authOperations.login.pending]: setPending,
        [authOperations.login.fulfilled]: (state, { payload }) => {
            state.token = payload.data.token;
            state.isLoading = false;
        },
        [authOperations.login.rejected]: setError,

        [authOperations.logout.pending]: setPending,
        [authOperations.logout.fulfilled]: state => {
            state.token = null;
            state.isLoading = false;
        },
        [authOperations.logout.rejected]: setError,
    },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
