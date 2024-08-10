import React from "react";
import { MdDelete } from "react-icons/md";
import { MainApiLink } from "../../App";
import toast from "react-hot-toast";

const ShowSinglePhoto = ({ photo, user }) => {
  const { shopPhoto, _id } = photo;

  const deleteAShopPhoto = () => {
    console.log("clicked");
    const shopPhotoId = _id;
    const phone = user?.phone;

    const photo = {
      phone,
      shopPhotoId,
    };

    console.log(photo)

    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      fetch(`${MainApiLink}/api/v1/auth/vendor/removeAShopPhoto`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(photo),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Photo deleted");
          window.location.reload();
        });
    }
  };
  return (
    <div className=" flex justify-center items-center ml-5 relative">
      <img src={shopPhoto} className="w-[130px] h-[130px] border-2 "></img>
      <MdDelete
        size={30}
        className="absolute top-0 right-0 text-2xl  text-gray-800 cursor-pointer"
        onClick={() => {
          deleteAShopPhoto();
        }}
      />
    </div>
  );
};

export default ShowSinglePhoto;
