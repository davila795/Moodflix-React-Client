import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Genre, Platform} from "../../types/preferences.ts";

const initialState: { genres: Genre[], platforms: Platform[] } = {
  genres: [],
  platforms: []
}

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload;
    },
    setPlatforms: (state, action: PayloadAction<Platform[]>) => {
      state.platforms = action.payload;
    }
  }
})

export const {setGenres, setPlatforms} = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;