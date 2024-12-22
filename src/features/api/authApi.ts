import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {UserRegisterForm} from "../../types/auth.ts";
import {User} from "../../types/user.ts";
import {RootState} from "../../app/store.ts";
import type {LoginForm, LoginResponse, RegisterUserResponse} from "../../types/auth.ts";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7116/api/Users',
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }), // Adjust base URL as needed
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterUserResponse, UserRegisterForm>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      })
    }),
    loginUser: builder.mutation<LoginResponse, LoginForm>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      })
    }),
    getLoggedUser: builder.query<User, void>({
      query: () => '/',
    }),
  }),
});

export const {useRegisterUserMutation, useLoginUserMutation, useGetLoggedUserQuery} = authApi;