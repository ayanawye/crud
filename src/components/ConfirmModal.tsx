import { useDeleteAlbumsMutation } from "../services/albumsApi";
import { useDeleteFavoritePostMutation } from "../services/favoritesApi";
import { useDeletePostMutation } from "../services/postAPI";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

interface ModalProps {
  close: () => void,
  id: number;
}


const ConfirmModal: FC<ModalProps> = ({close, id}) => {
  const [ deletePost ] = useDeletePostMutation();
  const [ deleteFavoritePost ] = useDeleteFavoritePostMutation();
  const [ deleteAlbums ] = useDeleteAlbumsMutation();
  const pathname = usePathname();

  const handleDeletePost = (id: number) => {
    if(pathname === "/favorites"){
      deleteFavoritePost(id)
    } else if (pathname === "/albums"){
      deleteAlbums(id)
    } else{
        deletePost(id)
        deleteFavoritePost(id)
    }
  }


  return (
    <div className="confirm_modal fixed flex justify-center items-center" onClick={() => close()}>
      <div className="modal_box" onClick={e => e.stopPropagation()}>
        <h2 className="text-center">Подтвердите действие</h2>
        <div className="flex justify-between gap-x-5 mt-4">
          <button onClick={() => handleDeletePost(id)}>Удалить</button>
          <button onClick={() => close()}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
