"use client";
import { useGetAllFavoritesAlbumQuery, useGetAllFavoritesPostsQuery } from "../services/favoritesApi";
import React from "react";
import PostItem from "./Posts/PostItem";
import AlbumItem from "./Albums/AlbumItem";

const FavoriteList = () => {
  const { data: posts } = useGetAllFavoritesPostsQuery("");
  const {data: albums} = useGetAllFavoritesAlbumQuery("")
  return (
    <div className="container">
      <div className="posts mt-9 flex flex-wrap justify-center">
        {posts && posts.map((post) => <PostItem key={post.id} post={post} />)}
        {albums && albums.map(album => <AlbumItem key={album.id} album={album}/>)}
      </div>
    </div>
  );
};

export default FavoriteList;
