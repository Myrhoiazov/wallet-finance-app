import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from '../../services/UserApi';
import { token } from '../../services/http';

const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { token: storedToken } = getState().auth;

            if (!storedToken) {
                return rejectWithValue();
            }
            token.set(storedToken);
            const data = await userAPI.getUserInfo();
            console.log(data)
            return data;
        } catch (error) {
            token.unset();
            return rejectWithValue({
                message: error.response.data.message,
                status: error.response.status,
            });
        }
    }
);

const userOperations = { getUserInfo };

export default userOperations;
