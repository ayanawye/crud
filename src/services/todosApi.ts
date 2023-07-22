import { ITodo } from '@/models/ITodo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002" }),
  tagTypes: ["Todo"],
  endpoints: (build) => ({
    getAllTodos: build.query<ITodo[], string>({
      query: (limit) => ({
        url: "/todos",
        params: {
          _limit: limit
        }
      }),
      transformResponse: (response: unknown) => {
        // Cast the response to PostsResponse and sort the array in descending order
        const todoResponse = response as ITodo[];
        return todoResponse.sort((a, b) => b.id - a.id);
      },
      providesTags: result => ["Todo"]
    }),
    createTodo: build.mutation ({
      query: (todo: any) => ({
        url: "/todos",
        method: "POST",
        body: todo
      }),
      invalidatesTags: ["Todo"]
    }),
    updateTodo: build.mutation<ITodo, ITodo> ({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PUT",
        body: todo
      }),
      invalidatesTags: ["Todo"]
    }),
    deleteTodo: build.mutation<ITodo, number> ({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Todo"]
    }),
  })
});

export const { useCreateTodoMutation, useDeleteTodoMutation, useGetAllTodosQuery, useUpdateTodoMutation} = todoApi