import {Middleware} from '@reduxjs/toolkit';
import {setToken} from "../features/auth/authSlice.ts";
import {authApi} from "../features/api/authApi.ts";
import {setUser, clearUser} from "../features/user/userSlice.ts";
import {setGenres, setPlatforms} from "../features/user/userPreferencesSlice.ts";
import {userApi} from "../features/api/userApi.ts";

export const authMiddleware: Middleware = (store) => (next) => async (action) => {
  // Pass the action along
  next(action);

  if (setToken.match(action)) {
    // When the token is set, fetch the user data
    try {
      const user = await store
        .dispatch(authApi.endpoints.getLoggedUser.initiate(undefined))
        .unwrap();

      store.dispatch(setUser(user)); // Update the user in the store

      // Fetch user preferences
      const userPreferences = await store
        .dispatch(userApi.endpoints.getUserPreferences.initiate(undefined))
        .unwrap();

      // Update the user preferences in the store
      store.dispatch(setGenres(userPreferences.genres));
      store.dispatch(setPlatforms(userPreferences.platforms));
    } catch (error) {
      console.error('Failed to fetch logged user:', error);
    }
  }

  if (authApi.endpoints.loginUser.matchRejected(action)) {
    // Optionally, handle login failures by clearing user data
    store.dispatch(clearUser());
  }
};
