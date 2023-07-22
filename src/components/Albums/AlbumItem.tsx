import { IAlbum } from "@/models/IAlbums";
import React, { FC, useMemo, useState } from "react";
import ConfirmModal from "../ConfirmModal";
import { BiEditAlt, BiSolidPhotoAlbum } from "react-icons/bi";
import PhotoList from "./PhotoList";
import { BsFillBookmarkHeartFill, BsFillTrashFill } from "react-icons/bs";
import { useUpdateAlbumsMutation } from "../../services/albumsApi";
import { message } from "antd";
import {
  useAddFavoriteAlbumsMutation,
  useDeleteFavoriteAlbumMutation,
  useGetAllFavoritesAlbumQuery,
  useUpdateFavoriteAlbumMutation,
} from "../../services/favoritesApi";
import { useGetUserByIdQuery } from "../../services/usersApi";

interface AlbumItemProps {
  album: IAlbum;
}

const AlbumItem: FC<AlbumItemProps> = ({ album }) => {
  const [visibleConfirm, setVisibleConfirm] = useState<boolean>(false);
  const [isPhoto, setIsPhoto] = useState<boolean>(false);
  const [visibleUpdate, setVisibleUpdate] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<IAlbum>({ ...album });
  const [updateAlbums] = useUpdateAlbumsMutation();
  const [updateFavoriteAlbum] = useUpdateFavoriteAlbumMutation();
  const [addFavoriteAlbums] = useAddFavoriteAlbumsMutation();
  const [deleteFavoriteAlbum] = useDeleteFavoriteAlbumMutation();
  const { data: albums } = useGetAllFavoritesAlbumQuery("");
  const { data: user } = useGetUserByIdQuery(album?.userId);


  const handleUpdateTodo = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateAlbums({ ...album, title: updateData.title });
    updateFavoriteAlbum({ ...album, title: updateData.title });
    message.success("This todo has been updated.");
    setVisibleUpdate(false);
  };

  const isAlbumInFavorites = albums?.find((el) => el.id === album.id);

  const addToFavorite = () => {
    if (album && albums) {
      if (!isAlbumInFavorites) {
        addFavoriteAlbums(album);
        message.success("This album has been added to favorites.");
      } else {
        deleteFavoriteAlbum(album.id);
        console.log("This post is already in favorites.");
        message.warning("This album is delete from favorites.");
      }
    }
  };

  return (
    <>
      <div
        className={
          isAlbumInFavorites
            ? "is_favorite flex flex-col justify-between"
            : "post flex flex-col justify-between"
        }
      >
        <div
          className="post_content flex-col cursor flex justify-center items-center gap-x-2"
          onClick={() => setIsPhoto(true)}
        >
          <div className=" flex justify-center items-center ">
          <h2 className="font-bold">{album?.title}</h2>
          <BiSolidPhotoAlbum />
          </div>
          <div>
          <p className="font-semibold">Author: {user?.name}</p>
          </div>
        </div>
        <div className="buttons_tab justify-center flex px-5 gap-x-6">
          <button onClick={() => setVisibleUpdate(true)}>
            <BiEditAlt fill={isAlbumInFavorites ? "#d4148b" : ""} />
          </button>
          <button onClick={() => setVisibleConfirm(true)}>
            <BsFillTrashFill fill={isAlbumInFavorites ? "#d4148b" : ""} />
          </button>
          <button onClick={() => addToFavorite()}>
            <BsFillBookmarkHeartFill
              fill={isAlbumInFavorites ? "#d4148b" : ""}
            />
          </button>
        </div>
      </div>
      {visibleConfirm && (
        <ConfirmModal close={() => setVisibleConfirm(false)} id={album.id} />
      )}
      {isPhoto && <PhotoList id={album.id} close={() => setIsPhoto(false)} />}
      {visibleUpdate && (
        <div
          className="confirm_modal fixed flex justify-center items-center"
          onClick={() => setVisibleUpdate(false)}
        >
          <div className="modal_box2" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleUpdateTodo}>
              <textarea
                value={updateData.title}
                onChange={(e) =>
                  setUpdateData({ ...updateData, title: e.target.value })
                }
              />
              <button type="submit" className="font-medium">
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AlbumItem;
