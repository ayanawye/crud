import React, { FC, useState } from "react";
import ConfirmModal from "../ConfirmModal";
import { AiOutlineComment } from "react-icons/ai";
import { BsFillTrashFill, BsFillBookmarkHeartFill } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { IPost } from "@/models/IPost";
import { message } from "antd";
import {
  useAddFavoritePostMutation,
  useDeleteFavoritePostMutation,
  useGetAllFavoritesPostsQuery,
} from "../../services/favoritesApi";
import { useGetUserByIdQuery } from "../../services/usersApi";
import UpdateModal from "../UpdateModal";
import Comments from "./Comments";

interface PostItemProps {
  post: IPost;
}

const PostItem: FC<PostItemProps> = ({ post }) => {
  const [visibleConfirm, setVisibleConfirm] = useState<boolean>(false);
  const [visibleUpdate, setVisibleUpdate] = useState<boolean>(false);
  const [visibleComments, setVisibleComments] = useState<boolean>(false);
  const [addFavoritePost] = useAddFavoritePostMutation();
  const [deleteFavoritePost] = useDeleteFavoritePostMutation();
  const { data: posts } = useGetAllFavoritesPostsQuery("");
  const { data: user } = useGetUserByIdQuery(post?.userId);

  const isPostInFavorites = posts?.find((el: IPost) => el.id === post.id);

  const addToFavorite = () => {
    if (post && posts) {
      if (!isPostInFavorites) {
        addFavoritePost(post);
        message.success("This post has been added to favorites.");
      } else {
        deleteFavoritePost(post.id)
        console.log("This post is already in favorites.");
        message.warning("This post is delete from favorites.");
      }
    }
  };
  const watchComments = () => {
    setVisibleComments((prevState) => !prevState);
  };

  return (
    <div
      key={post.id}
      className={
        isPostInFavorites
          ? "is_favorite flex flex-col justify-between"
          : "post flex flex-col justify-between"
      }
    >
      <div className="post_content">
        <h2 className="font-bold text-center">{post?.title}</h2>
        <p className="font-semibold">Author: {user?.name}</p>
        <p>{post?.body}</p>
      </div>
      <div className="buttons_tab justify-between flex px-5">
        <button onClick={() => watchComments()}>
          <AiOutlineComment fill={isPostInFavorites || visibleComments ? "#d4148b" : ""} />
        </button>
        <button onClick={() => setVisibleUpdate(true)}>
          <BiEditAlt fill={isPostInFavorites ? "#d4148b" : ""} />
        </button>
        <button onClick={() => setVisibleConfirm(true)}>
          <BsFillTrashFill fill={isPostInFavorites ? "#d4148b" : ""} />
        </button>
        <button onClick={addToFavorite}>
          <BsFillBookmarkHeartFill fill={isPostInFavorites ? "#d4148b" : ""} />
        </button>
      </div>
      {visibleComments && <Comments id={post.id} />}
      {visibleConfirm && <ConfirmModal close={() => setVisibleConfirm(false)} id={post.id} />}
      {visibleUpdate && <UpdateModal close={() => setVisibleUpdate(false)} post={post}/>}
    </div>
  );
};

export default PostItem;
