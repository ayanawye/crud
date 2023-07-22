import { IPost } from "@/models/IPost";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

type PostsResponse = IPost[];

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002" }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    getAllPosts: build.query<PostsResponse, string>({
      query: (limit) => ({
        url: "/posts",
        params: {
          _limit: limit,
        },
      }),
      providesTags: (result) => ["Post"],
      // transformResponse: (response: unknown) => {
      //   // Cast the response to PostsResponse and sort the array
      //   const postsResponse = response as PostsResponse;
      //   return postsResponse.sort((a, b) => b.id - a.id);
      // },
    }),
    createPost: build.mutation({
      query: (post: any) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: build.mutation<IPost, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
