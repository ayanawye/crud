import { IAlbum } from '@/models/IAlbums';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const albumsApi = createApi({
  reducerPath: "albumsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002" }),
  tagTypes: ["Album"],
  endpoints: (build) => ({
    getAllAlbums: build.query<IAlbum[], string>({
      query: (limit) => ({
        url: "/albums",
        params: {
          _limit: limit
        }
      }),
      providesTags: result => ["Album"]
    }),
    updateAlbums: build.mutation<IAlbum, IAlbum> ({
      query: (post) => ({
        url: `/albums/${post.id}`,
        method: "PUT",
        body: post
      }),
      invalidatesTags: ["Album"]
    }),
    deleteAlbums: build.mutation<IAlbum, number> ({
      query: (id) => ({
        url: `/albums/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Album"]
    }),
  })
});

export const { useDeleteAlbumsMutation, useGetAllAlbumsQuery, useUpdateAlbumsMutation} = albumsApi