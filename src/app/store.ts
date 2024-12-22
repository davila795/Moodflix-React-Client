import {configureStore} from '@reduxjs/toolkit';
import {questionnaireApi} from '../features/api/questionnaireApi';
import emotionsReducer from '../features/emotions/emotionsSlice.ts';
import authReducer from '../features/auth/authSlice.ts';
import userReducer from '../features/user/userSlice.ts';
import userPreferencesReducer from '../features/user/userPreferencesSlice.ts'
import recentMoviesReducer from '../features/movie/recentMoviesSlice.ts';
import {preferencesApi} from "../features/api/preferencesApi.ts";
import {authApi} from "../features/api/authApi.ts";
import {authMiddleware} from "../middleware/authMiddleware.ts";
import {moviesApi} from "../features/api/moviesApi.ts";
import {userHistory} from "../features/api/userHistoryApi.ts";
import {userApi} from "../features/api/userApi.ts";
import {userMiddleware} from "../middleware/userMiddleware.ts";

export const store = configureStore({
  reducer: {
    [questionnaireApi.reducerPath]: questionnaireApi.reducer,
    [preferencesApi.reducerPath]: preferencesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    [userHistory.reducerPath]: userHistory.reducer,
    [userApi.reducerPath]: userApi.reducer,
    emotions: emotionsReducer,
    auth: authReducer,
    user: userReducer,
    userPreferences: userPreferencesReducer,
    recentMovies: recentMoviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      questionnaireApi.middleware,
      preferencesApi.middleware,
      authApi.middleware,
      moviesApi.middleware,
      userHistory.middleware,
      userApi.middleware,
      authMiddleware,
      userMiddleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
