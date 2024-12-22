import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../types/user.ts";

const initialState: User = {
  userId: null,
  userName: '',
  email: '',
  birthDate: '',
  country: {
    countryId: null,
    countryCode: '',
    countryName: ''
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<User>) => action.payload,
    clearUser: () => initialState
  }
})

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;