import axios from 'axios';

export const privateAPI = axios.create({
  baseURL: 'https://wallet-api-kaqj.onrender.com/api',
});

export const publicAPI = axios.create({
  baseURL: 'https://wallet-api-kaqj.onrender.com/api',
});

export const token = {
  set(token) {
    console.log('token', token)
    privateAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    privateAPI.defaults.headers.common.Authorization = null;
  },
};
