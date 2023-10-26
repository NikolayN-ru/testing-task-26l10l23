import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { api } from "./api";
import { userApi } from "./userApi";
import authReducer from "./store";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    // ['userApireducer']: api.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(userApi.middleware),
});

setupListeners(store.dispatch);

export default store;
