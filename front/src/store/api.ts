// api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HOST } from "../settings";

export const api = createApi({
  reducerPath: "newsApireducer",
  tagTypes: ["Newses"],
  baseQuery: fetchBaseQuery({
    baseUrl: HOST + "api/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      // query: (limit = "") => `news?${limit && `_limit=${limit}`}`, //лимит на запрос
      query: () => "news",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: any) => ({ type: "Newses" as const, id })),
              { type: "Newses", id: "LIST" },
            ]
          : [{ type: "Newses", id: "LIST" }],
    }),

    getPostId: builder.query({
      query: (id) => `news/${id}`,
      providesTags: (result) => [{ type: "Newses", id: "LIST" }],
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
      invalidatesTags: [{ type: "Newses", id: "LIST" }],
    }),

    getPostEdit: builder.mutation({
      query: (data) => ({
        url: "newsEdit",
        method: "POST",
        body: data,
      }),
    }),

    getPostEditContent: builder.mutation({
      query: (data) => ({
        url: `updatenews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Newses", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostIdQuery,
  useCreatePostMutation,
  useGetPostEditMutation,
  useGetPostEditContentMutation,
} = api;
