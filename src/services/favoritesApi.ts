import { IAlbum } from '@/models/IAlbums';
import { IPost } from '@/models/IPost';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const favoritePostApi = createApi({
  reducerPath: "favoritePostApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002" }),
  tagTypes: ["Favorite"],
  endpoints: (build) => ({
    getAllFavoritesPosts: build.query<IPost[], string>({
      query: () => ({
        url: "/favorites"
      }),
      providesTags: result => ["Favorite"]
    }),
    addFavoritePost: build.mutation<IPost, IPost> ({
      query: (post) => ({
        url: "/favorites",
        method: "POST",
        body: post
      }),
      invalidatesTags: ["Favorite"]
    }),
    updateFavoritePost: build.mutation<IPost, IPost> ({
      query: (post) => ({
        url: `/favorites/${post.id}`,
        method: "PUT",
        body: post
      }),
      invalidatesTags: ["Favorite"]
    }),
    deleteFavoritePost: build.mutation<IPost, number> ({
      query: (id) => ({
        url: `/favorites/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Favorite"]
    }),
  })
});
export const favoriteAlbumApi = createApi({
  reducerPath: "favoriteAlbumApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002" }),
  tagTypes: ["Favorite"],
  endpoints: (build) => ({
    getAllFavoritesAlbum: build.query<IAlbum[], string>({
      query: () => ({
        url: "/favoritesAlbum"
      }),
      providesTags: result => ["Favorite"]
    }),
    addFavoriteAlbums: build.mutation<IAlbum, IAlbum> ({
      query: (post) => ({
        url: "/favoritesAlbum",
        method: "POST",
        body: post
      }),
      invalidatesTags: ["Favorite"]
    }),
    updateFavoriteAlbum: build.mutation<IAlbum, IAlbum> ({
      query: (post) => ({
        url: `/favoritesAlbum/${post.id}`,
        method: "PUT",
        body: post
      }),
      invalidatesTags: ["Favorite"]
    }),
    deleteFavoriteAlbum: build.mutation<IAlbum, number> ({
      query: (id) => ({
        url: `/favoritesAlbum/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Favorite"]
    }),
  })
});

export const { useAddFavoriteAlbumsMutation, useUpdateFavoriteAlbumMutation, useDeleteFavoriteAlbumMutation, useGetAllFavoritesAlbumQuery } = favoriteAlbumApi
export const { useAddFavoritePostMutation, useUpdateFavoritePostMutation, useGetAllFavoritesPostsQuery, useDeleteFavoritePostMutation } = favoritePostApi