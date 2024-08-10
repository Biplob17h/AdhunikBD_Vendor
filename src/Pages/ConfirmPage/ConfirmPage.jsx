import React, { useContext, useState } from "react";
import { AuthContext } from "../../ContextApi/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { MainApiLink } from "../../App";
import ShowSinglePhoto from "./ShowSinglePhoto";

const ConfirmPage = () => {
  const { user, loading, setRefresh, refresh } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [infoLoading, setInfoLoading] = useState(false);
  const [vendorPhotoLoading, setVendorPhotoLoading] = useState(false);
  const [shopPhotoLoading, setShopPhotoLoading] = useState(false);

  const logout = () => {
    localStorage.removeItem("AdhunikVendorToken");
    setRefresh(refresh + 1);
    toast.success("Vendor logout successful");
    navigate("/login", { replace: true });
  };

  const handleUpdateVendorProfile = (event) => {
    setError("");
    setInfoLoading(true);
    event.preventDefault();
    // get form data
    const form = event.target;
    const vendorName = form.vendorName.value;
    const shopName = form.shopName.value;
    const shopAddress = form.shopAddress.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const nid = form.nid.value;

    const vendor = {
      vendorName,
      shopName,
      shopAddress,
      email,
      phone,
      nid,
    };

    fetch(`${MainApiLink}/api/v1/auth/vendor/updateVendor`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendor),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Vendor profile updated successfully");
          setInfoLoading(false);
          window.location.reload();
          setRefresh(!refresh);
        }
      });
  };

  const handleVendorPhotoUpdate = (event) => {
    setError("");
    setVendorPhotoLoading(true);
    event.preventDefault();
    const form = event.target;
    const photo = form.vendorPhoto.files[0];

    const photoData = new FormData();

    photoData.append("file", photo);
    photoData.append("upload_preset", "test-upload");
    photoData.append("cloud_name", "dqeuy96cs");

    fetch("https://api.cloudinary.com/v1_1/dqeuy96cs/image/upload", {
      method: "POST",
      body: photoData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data?.url) {
          // update vendor info
          const vendor = {
            vendorPhoto: data?.url,
            phone: user?.phone,
          };
          fetch(`${MainApiLink}/api/v1/auth/vendor/updateVendor`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(vendor),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === "success") {
                toast.success("Vendor photo updated successfully");
                setRefresh(!refresh);
                form.reset();
                setVendorPhotoLoading(false);
              }
            });
        }
      });
  };

  const handleUpdateShopPhoto = (event) => {
    event.preventDefault();
    setShopPhotoLoading(true);

    const form = event.target;
    const photo = form.shopPhoto.files[0];

    const photoData = new FormData();

    photoData.append("file", photo);
    photoData.append("upload_preset", "test-upload");
    photoData.append("cloud_name", "dqeuy96cs");

    fetch("https://api.cloudinary.com/v1_1/dqeuy96cs/image/upload", {
      method: "POST",
      body: photoData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data?.url) {
          // update vendor info
          const vendor = {
            shopPhoto: data?.url,
            phone: user?.phone,
          };
          fetch(`${MainApiLink}/api/v1/auth/vendor/addAShopPhoto`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(vendor),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === "success") {
                toast.success("Vendor photo updated successfully");
                setRefresh(!refresh);
                form.reset();
                setShopPhotoLoading(false);
              }
            });
        }
      });
  };
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1 className="text-center mt-10 font-bold text-4xl">
            Welcome to vendor Page
          </h1>
          <h1 className="text-center mt-5 font-semibold text-xl">
            Your application is reviewing by admin.
          </h1>
          <form
            onSubmit={handleVendorPhotoUpdate}
            className="flex items-center justify-center flex-col mt-10"
          >
            <img
              className="w-[110px] rounded-full"
              src={
                user?.vendorPhoto
                  ? user?.vendorPhoto
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC_GTSOMv5MWxOHBLROf2ExOHFKpZpaDqQRw&s"
              }
              alt=""
            />
            <div className="flex flex-col mb-10">
              <input type="file" name="vendorPhoto" id="" />
              <button type="submit" className="btn btn-ghost mt-2">
                <span
                  className={`loading loading-spinner mr-2 ${
                    vendorPhotoLoading ? "" : "hidden"
                  }`}
                ></span>{" "}
                Update vendor Photo
              </button>
            </div>
          </form>
          <form
            onSubmit={handleUpdateShopPhoto}
            className="flex justify-center items-center flex-col"
          >
            <div className="flex">
              {user?.shopPhoto <= 0 ? (
                <div className="w-[130px] h-[130px] border-2 flex justify-center items-center cursor-pointer">
                  <FaPlus className="" size={30} />
                </div>
              ) : (
                user?.shopPhoto.map((photo) => (
                  <ShowSinglePhoto key={photo?._id} photo={photo} user={user} />
                ))
              )}
            </div>
            <div className="flex flex-col my-10">
              <input type="file" name="shopPhoto" id="" />
              <button type="submit" className="btn btn-ghost mt-2">
                <span
                  className={`loading loading-spinner mr-2 ${
                    shopPhotoLoading ? "" : "hidden"
                  }`}
                ></span>{" "}
                Update Shop Photo
              </button>
            </div>
          </form>
          <form
            onSubmit={handleUpdateVendorProfile}
            className="flex justify-center flex-col items-center mt-10 min-w-[300px]"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                defaultValue={user?.phone}
                name="phone"
                disabled
                className="input input-bordered w-[400px]"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Vendor Name</span>
              </label>
              <input
                type="text"
                placeholder="Vendor Name"
                name="vendorName"
                defaultValue={user?.vendorName}
                className="input input-bordered w-[400px]"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Shop Name</span>
              </label>
              <input
                type="text"
                placeholder="Shop Name"
                defaultValue={user?.shopName}
                name="shopName"
                className="input input-bordered w-[400px]"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Shop Address</span>
              </label>
              <input
                type="text"
                placeholder="Shop Name"
                defaultValue={user?.shopAddress}
                name="shopAddress"
                className="input input-bordered w-[400px]"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                defaultValue={user?.email}
                name="email"
                className="input input-bordered w-[400px]"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">NID</span>
              </label>
              <input
                type="text"
                placeholder="NID"
                name="nid"
                defaultValue={user?.nid}
                className="input input-bordered w-[400px]"
              />
            </div>

            {user?.status === "pending" && (
              <div className="flex justify-center pt-10 pb-20">
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="px-5 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 w-[200px]"
                >
                  Logout
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md text-white bg-green-500 hover:bg-green-600 w-[200px] ml-10 flex justify-center items-center"
                >
                  <span
                    className={`loading loading-spinner mr-3 ${
                      infoLoading ? "" : "hidden"
                    }`}
                  ></span>
                  Confirm Update
                </button>
              </div>
            )}
            {user?.status === "rejected" && (
              <div className="flex flex-col justify-center items-center pt-10 pb-20">
                <button
                  type="submit"
                  disabled
                  className="px-5 py-2 rounded-md text-white bg-red-600  w-[500px] ml-10 flex justify-center items-center"
                >
                  Application Rejected
                </button>
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="px-5 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 w-[200px] mt-5"
                >
                  Logout
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default ConfirmPage;
