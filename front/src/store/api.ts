// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "newsApireducer",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5070/api/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      // query: (limit = "") => `news?${limit && `_limit=${limit}`}`, //лимит на запрос
      query: () => "news",
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: "createnews",
        method: "POST",
        body: post,
        headers: {
          Authorization: `Bearer ${post.token}`,
        },
      }),
    }),

    getPostEdit: builder.mutation({
      query: (data) => ({
        url: "newsEdit",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation, useGetPostEditMutation } =
  api;
