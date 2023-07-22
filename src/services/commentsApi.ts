import { IComment } from '@/models/IComment';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
  endpoints: (build) => ({
    getComments: build.query<IComment[], number>({
      query: (postId) => ({
        url: "/comments",
        params: {
          postId
        }
      })
    })
  })
});

export const { useGetCommentsQuery } = commentsApi