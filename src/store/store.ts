import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "../services/postAPI";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { favoritePostApi, favoriteAlbumApi } from "../services/favoritesApi";
import { userApi } from "../services/usersApi";
import { commentsApi } from "../services/commentsApi";
import { todoApi } from "../services/todosApi";
import { albumsApi } from "../services/albumsApi";
import { photosApi } from "../services/photosApi";

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    [favoritePostApi.reducerPath]: favoritePostApi.reducer, 
    [favoriteAlbumApi.reducerPath]: favoriteAlbumApi.reducer, 
    [userApi.reducerPath]: userApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware, favoritePostApi.middleware, userApi.middleware, commentsApi.middleware, todoApi.middleware, albumsApi.middleware, photosApi.middleware, favoriteAlbumApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;