import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://wallet-api-kaqj.onrender.com';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    token: builder.mutation({
      query: token => ({
        url: `/api/user/verify/${token}`,
        method: 'POST',
        // body: userData
      }),
      invalidatesTags: [{ type: 'Auth' }],
    }),
    signUp: builder.mutation({
      query: userData => ({
        url: `/api/user/register`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: [{ type: 'Auth' }],
    }),
    login: builder.mutation({
      query: userData => ({
        url: `/api/user/login`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: [{ type: 'Auth' }],
    }),
    logOut: builder.query({
      query: () => ({
        url: `api/user/logout`,
        method: 'GET',
      }),
      invalidatesTags: ['Auth'],
    }),

    currentUser: builder.query({
      query: () => ({
        url: `api/user/current`,
        method: 'GET',
      }),
      invalidatesTags: ['Auth'],
    }),
    // verifyEmail: builder.mutation({
    //   query: verifyCode => ({
    //     url: `api/user/verify/${verifyCode}`,
    //     method: 'POST'
    //   }),
    //   invalidatesTags: ['Auth']
    // })
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useLazyLogOutQuery,
  useLazyCurrentUserQuery,
} = authApi;
