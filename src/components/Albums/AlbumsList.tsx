"use client";
import { useGetAllAlbumsQuery } from "../../services/albumsApi";
import React, { useState, useMemo } from "react";
import AlbumItem from "./AlbumItem";
import Pagination from "../Pagination";
import {
  useGetAllFavoritesAlbumQuery,
  useGetAllFavoritesPostsQuery,
} from "../../services/favoritesApi";
import { IAlbum } from "@/models/IAlbums";
import { useGetAllUsersQuery } from "../../services/usersApi";
import { IUser } from "@/models/IUser";

const AlbumsList = () => {
  const [limit, setLimit] = useState("10");
  const { data: albums, isLoading } = useGetAllAlbumsQuery(limit);
  const [currentPage, setCurrentPage] = useState(1);
  const [albumsPerPage] = useState(10);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState("");
  const [postsPerPage] = useState(10);
  const { data: users } = useGetAllUsersQuery("");
  const { data: favoriteAlbums } = useGetAllFavoritesAlbumQuery("");

  const lastRepositoryIndex = currentPage * albumsPerPage;
  const firstRepositoryIndex = lastRepositoryIndex - albumsPerPage;
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  const currentAlbums = useMemo(() => {
    let filteredAlbum = albums ? [...albums] : [];

    if (name) {
      return filteredAlbum.filter((post) => post.userId === Number(name));
    }
    if (filter === "title") {
      return filteredAlbum.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filter === "like") {
      return filteredAlbum.sort((a, b) => {
        const isAFavorite = favoriteAlbums?.some(
          (el: IAlbum) => el.id === a.id
        );
        const isBFavorite = favoriteAlbums?.some(
          (el: IAlbum) => el.id === b.id
        );
        if (isAFavorite && !isBFavorite) {
          return -1;
        } else if (!isAFavorite && isBFavorite) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    return filteredAlbum?.slice(firstRepositoryIndex, lastRepositoryIndex);
  }, [albums, filter, name, currentPage, postsPerPage]);

  return (
    <div className="container">
      <div className="flex gap-x-6 mt-4">
        <select
          value={limit}
          onChange={(event) => setLimit(event.target.value)}
        >
          <option value="10">10 Albums</option>
          <option value="20">20 Albums</option>
          <option value="50">50 Albums</option>
          <option value="100">100 Albums</option>
          <option value="">All</option>
        </select>
        <button onClick={() => setFilter("title")}>Filter By Title</button>
        <button onClick={() => setFilter("like")}>Favorites</button>
        <select value={name} onChange={(event) => setName(event.target.value)}>
          <option value="">All Author</option>
          {users &&
            users?.map((user: IUser) => (
              <option key={user.name} value={user.id}>
                {user.name}
              </option>
            ))}
        </select>
      </div>
      <div className="posts mt-9 flex flex-wrap justify-center">
        {isLoading ? (
          <h1 className="font-bold text-3xl">Loading...</h1>
        ) : currentAlbums.length !== 0 ? (
          currentAlbums.map((album) => (
            <AlbumItem key={album.id} album={album} />
          ))
        ) : (
          <h1 className="font-bold text-3xl">No posts...</h1>
        )}
      </div>
      <Pagination
        perPage={albumsPerPage}
        totalRepocitories={albums?.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default AlbumsList;
