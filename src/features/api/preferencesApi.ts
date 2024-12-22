import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Country, Genre, Platform} from "../../types/preferences.ts";

export const preferencesApi = createApi({
  reducerPath: 'preferencesApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://localhost:7116/api/Users'}),
  endpoints: (builder) => ({
    fetchGenres: builder.query<Genre[], void>({
      query: () => '/Genres',
    }),
    fetchPlatforms: builder.query<Platform[], string>({
      query: (code) => `/Platforms/${code}`
    }),
    fetchCountries: builder.query<Country[], void>({
      query: () => '/Countries'
    })
  }),
});

export const {
  useFetchGenresQuery,
  useFetchPlatformsQuery,
  useFetchCountriesQuery,
} = preferencesApi;