"use client";
import { useGetAllPostsQuery } from "../../services/postAPI";
import React, { FC, useEffect, useMemo, useState } from "react";
import PostItem from "./PostItem";
import AddNewPost from "../AddNewPost";
import Pagination from "../Pagination";
import { useGetAllUsersQuery } from "../../services/usersApi";
import { useGetAllFavoritesPostsQuery } from "../../services/favoritesApi";
import { IPost } from "@/models/IPost";
import { IUser } from "@/models/IUser";

const PostsList: FC = () => {
  const [limit, setLimit] = useState<string>("10");
  const { data: posts, isLoading } = useGetAllPostsQuery(limit);
  const [visibleAddData, setVisibleAddData] = useState<boolean>(false);
  const { data: users } = useGetAllUsersQuery("");
  const { data: favoritePosts } = useGetAllFavoritesPostsQuery("");
  const [name, setName] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const lastRepositoryIndex = currentPage * postsPerPage;
  const firstRepositoryIndex = lastRepositoryIndex - postsPerPage;
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  const currentPosts = useMemo(() => {
    let filteredPosts = posts ? [...posts] : [];

    if (name) {
      return filteredPosts.filter((post) => post.userId === Number(name));
    }
    if (filter === "title") {
      return filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filter === "like") {
      return filteredPosts.sort((a, b) => {
        const isAFavorite = favoritePosts?.some((el: IPost) => el.id === a.id);
        const isBFavorite = favoritePosts?.some((el: IPost) => el.id === b.id);
        if (isAFavorite && !isBFavorite) {
          return -1;
        } else if (!isAFavorite && isBFavorite) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    return filteredPosts?.slice(firstRepositoryIndex, lastRepositoryIndex);
  }, [posts, filter, name, currentPage, postsPerPage]);

  return (
    <>
      <div className="container">
        <div className="flex gap-x-6 mt-4">
        <select
          value={limit}
          onChange={(event) => setLimit(event.target.value)}
        >
          <option value="10">10 Posts</option>
          <option value="20">20 Posts</option>
          <option value="50">50 Posts</option>
          <option value="100">100 Posts</option>
          <option value="">All</option>
        </select>
        <button onClick={() => setVisibleAddData(true)}>Add new post</button>
        <button onClick={() => setFilter("title")}>Filter By Title</button>
        <button onClick={() => setFilter("like")}>Favorite</button>
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
          ) : currentPosts.length !== 0 ? (
            currentPosts.map((post) => <PostItem key={post.id} post={post} />)
          ) : (
            <h1 className="font-bold text-3xl">No posts...</h1>
          )}
          {visibleAddData && (
            <AddNewPost close={() => setVisibleAddData(false)} />
          )}
        </div>
        <Pagination
          perPage={postsPerPage}
          totalRepocitories={posts?.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default PostsList;
