import { privateAPI } from './http';

const getUserInfo = async () => {
    const { data } = await privateAPI.get('/users/current');
    return data;
};

export const userAPI = {
    getUserInfo,
};