import {Middleware} from '@reduxjs/toolkit';
import {userApi} from "../features/api/userApi.ts";
import {setGenres} from "../features/user/userPreferencesSlice.ts";

export const userMiddleware: Middleware = (store) => (next) => async (action) => {
  next(action);

  if (userApi.endpoints.updateUserGenres.matchFulfilled(action)) {
    const updatedGenres = action.meta.arg.originalArgs;
    store.dispatch(setGenres(updatedGenres));
  }
};
