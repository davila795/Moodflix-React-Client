import {User} from "./user.ts";

type RegisterUserResponse = {
  id: number
}

type LoginResponse = {
  token: string
}

type LoginForm = Pick<User, 'email'> & { password: string }


export type UserRegisterForm = Pick<User, 'userName' | 'email' | 'birthDate'> &
  {
    password: string,
    countryId: number | '',
  }
export type {RegisterUserResponse, LoginResponse, LoginForm};