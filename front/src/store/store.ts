import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";

const initialState = {
  user: {} as IUser,
  isAuth: false,
  accessToken: null,
  id: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.id = payload.user.id;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
    setAuth: (state, action) => {
      const { user, token, isAuth } = action.payload;
      // state.user = user;
      state.isAuth = isAuth;
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      try {
        // const response = AuthService.login(email, password);
        // localStorage.setItem('token', response.data.accessToken)
      } catch (e) {
        console.log("error");
      }
    },
  },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;
export default authSlice.reducer;
