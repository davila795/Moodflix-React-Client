import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from "../../app/store.ts";
import {UserHistory} from "../../types/history.ts";
import {MovieAPI} from "../../types/movies.ts";

export const userHistory = createApi({
  reducerPath: 'userHistoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7116/api/Users',
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserHistory: builder.query<UserHistory[], void>({
      query: () => '/history',
    }),
    addToUserHistory: builder.mutation<void, MovieAPI & { emotionId: number[] }>({
      query: (body) => ({
        url: '/addToHistory',
        method: 'POST',
        body,
      })
    })
  }),
});

export const {useGetUserHistoryQuery, useAddToUserHistoryMutation} = userHistory;