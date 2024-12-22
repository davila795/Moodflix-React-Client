import {MovieAPI} from "../../types/movies.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: MovieAPI[] = [];

const recentMoviesSlice = createSlice({
  name: 'recentMovies',
  initialState,
  reducers: {
    setRecentMovies: (state, action: PayloadAction<MovieAPI[]>) => [...state, ...action.payload],
    clearRecentMovies: () => initialState,
  }
});

export const {setRecentMovies} = recentMoviesSlice.actions;
export default recentMoviesSlice.reducer;