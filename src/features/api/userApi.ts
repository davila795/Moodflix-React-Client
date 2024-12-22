import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from "../../app/store.ts";
import {Genre, GenreNotPreferred, Platform} from "../../types/preferences.ts";

export const userApi = createApi({
  reducerPath: 'userApi',
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
    updateUserGenres: builder.mutation<void, GenreNotPreferred[]>({
      query: (body) => ({
        url: 'configUserGenres',
        method: 'POST',
        body,
      })
    }),
    updateUserPlatforms: builder.mutation<void, number[]>({
      query: (body) => ({
        url: 'configUserPlatforms',
        method: 'POST',
        body,
      })
    }),
    getUserPreferences: builder.query<{ genres: Genre[], platforms: Platform[] }, void>({
      query: () => '/userPreferences'
    }),
  }),
});

export const {useUpdateUserGenresMutation, useGetUserPreferencesQuery, useUpdateUserPlatformsMutation} = userApi;