import { useGetAllPhotosQuery } from "../../services/photosApi";
import { Image } from "antd";
import React, { FC, useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";

interface PhotoListProps {
  id: number;
  close: () => void;
}

const PhotoList: FC<PhotoListProps> = ({ id, close }) => {
  const [limit, selLimit] = useState<number>(5)
  const { data: photos } = useGetAllPhotosQuery({id, limit});

  return (
    <div
      className="confirm_modal fixed flex justify-center items-center"
      onClick={() => close()}
    >
      <div className="modal_box photos relative" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={() => close()}>
          <AiOutlineCloseSquare size={20} fill="#000"/>
        </button>
        <div className="flex justify-center gap-4">
          {photos &&
            photos.map((photo) => (
              <div className="photo" key={photo.id}>
                <Image placeholder="blur" alt="photo" src={photo.url} />
                <p>{photo.title}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoList;
