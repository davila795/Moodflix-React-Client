import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from "../../app/store.ts";
import {MovieAPI} from "../../types/movies.ts";

type MoviesRequest = {
  moviesSuggested: string[];
  emotionId?: number;
  emotionsId: number[];
}

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7116/api/Movie',
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    generateRandomMovie: builder.mutation<MovieAPI[], { body: MoviesRequest, movieCount: number }>({
      query: ({body, movieCount}) => ({
        url: `/GetMoviesWithPreferences/${movieCount}`,
        method: 'POST',
        body,
      })
    })
  }),
});

export const {useGenerateRandomMovieMutation} = moviesApi;