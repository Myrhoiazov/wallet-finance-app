// import { privateAPI, publicAPI } from './http';

// const registerUser = async profile => {
//     const { data } = await publicAPI.post('/auth/register', profile);
//     return data;
// };

// const loginUser = async loginData => {
//     const { data } = await publicAPI.post('/auth/login', loginData);
//     return data;
// };

// const logoutUser = async () => {
//     await privateAPI.post(`/auth/logout`);
// };

// export const authAPI = {
//     registerUser,
//     loginUser,
//     logoutUser,
// };