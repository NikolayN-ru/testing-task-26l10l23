import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApireducer",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://84.38.182.126:5070/api/" }),
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5070/api/" }),
  endpoints: (builder) => ({
    // getPosts: builder.query({
    //   query: () => "",
    // }),

    userlogin: builder.mutation({
      query: (post) => ({
        url: "login",
        method: "POST",
        body: {
          email: post.email,
          password: post.password,
        },
      }),
    }),


    userRegistration: builder.mutation({
      query: (post) => ({
        url: "registration",
        method: "POST",
        body: {
          email: post.email,
          password: post.password,
        },
      }),
    }),
  }),
});

export const { useUserloginMutation, useUserRegistrationMutation } = userApi;
