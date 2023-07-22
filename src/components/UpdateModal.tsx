import {
  useDeleteFavoritePostMutation,
  useUpdateFavoritePostMutation,
} from "../services/favoritesApi";
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../services/postAPI";
import { IPost } from "@/models/IPost";
import React, { FC, useState } from "react";
import { message } from "antd";

interface UpdateModalProps {
  post: IPost;
  close: () => void;
}

const UpdateModal: FC<UpdateModalProps> = ({ close, post }) => {
  const [newData, setNewData] = useState({
    title: post.title,
    body: post.body,
  });
  const [updatePost] = useUpdatePostMutation();
  const [updateFavoritePost] = useUpdateFavoritePostMutation();

  const handleUpdatePost = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePost({ ...post, title: newData.title, body: newData.body });
    updateFavoritePost({ ...post, title: newData.title, body: newData.body });
    message.success("This post has been updated.");
    close();
  };

  return (
    <div className="confirm_modal fixed flex justify-center items-center" onClick={() => close()} >
      <div className="modal_box2" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleUpdatePost}>
          <textarea
            value={newData.title}
            onChange={(e) => setNewData({ ...newData, title: e.target.value })}
          />
          <textarea
            value={newData.body}
            onChange={(e) => setNewData({ ...newData, body: e.target.value })}
          />
          <button type="submit" className="font-medium">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
