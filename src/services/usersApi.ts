import { IPost } from '@/models/IPost';
import { IUser } from '@/models/IUser';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  endpoints: (build) => ({
    getAllUsers: build.query<IUser[], string>({
      query: () => ({
        url: "/users"
      }),
    }),
    getUserById: build.query<IUser, number>({
      query: (id) => ({
        url: `/users/${id}`
      }),
    })
  })
});

export const { useGetAllUsersQuery, useGetUserByIdQuery } = userApi