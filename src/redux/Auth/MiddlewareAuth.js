import { isRejectedWithValue } from '@reduxjs/toolkit';
import { authActions } from './AuthSlice';

const authErrorLogger =
    ({ dispatch, getState }) =>
    next =>
    action => {
        if (isRejectedWithValue(action)) {
            if (getState().auth.token && action.payload.status === 401) {
                console.warn('Wrong token! Cleared.');
                dispatch(authActions.resetToken());
            }
        }
        return next(action);
    };

export default authErrorLogger;