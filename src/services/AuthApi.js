import { privateAPI, publicAPI } from './http';

const registerUser = async profile => {
    const { data } = await publicAPI.post('/users/register', profile);
    return data;
};

const loginUser = async loginData => {
    const { data } = await publicAPI.post('/users/login', loginData);
    return data;
};

const logoutUser = async () => {
    await privateAPI.post(`/users/logout`);
};

export const authAPI = {
    registerUser,
    loginUser,
    logoutUser,
};