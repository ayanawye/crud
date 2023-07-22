import { IPhoto } from '@/models/IAlbums';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const photosApi = createApi({
  reducerPath: "photosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  tagTypes: ["Album"],
  endpoints: (build) => ({
    getAllPhotos: build.query<IPhoto[], {id: number, limit: number}>({
      query: ({id, limit}) => ({
        url: "/photos",
        params: {
          albumId: id,
          _limit: limit
        }
      }),
    })
  })
});

export const { useGetAllPhotosQuery} = photosApi