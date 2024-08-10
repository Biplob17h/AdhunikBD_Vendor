import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { MainApiLink } from "../../App";

const SignUp = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUpSubmit = (event) => {
    setError("");
    event.preventDefault();

    const form = event.target;
    const vendorName = form.vendorName.value;
    const shopName = form.shopName.value;
    const shopAddress = form.shopAddress.value;
    const phone = form.phone.value;
    const password = form.password.value;

    const vendor = {
      vendorName,
      shopName,
      shopAddress,
      phone,
      password,
    };

    fetch(`${MainApiLink}/api/v1/auth/vendor/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vendor),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success("Vendor created successfully");
          navigate("/login");
          form.reset();
        } else {
          setError(data.message);
        }
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Vendor Sign Up</h1>
        </div>
        <div className="card bg-base-100 w-[500px] shrink-0 shadow-2xl">
          <form onSubmit={handleSignUpSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Vendor Name</span>
              </label>
              <input
                type="text"
                placeholder="Vendor Name"
                name="vendorName"
                className="input input-bordered"
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
                className="input input-bordered"
                name="shopName"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Shop Address</span>
              </label>
              <input
                type="text"
                placeholder="Shop Address"
                className="input input-bordered"
                name="shopAddress"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="number"
                placeholder="Phone"
                className="input input-bordered"
                name="phone"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                name="password"
                required
              />
            </div>
            <p className="text-red-600">{error}</p>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
          <p className="text-center mb-5">or</p>
          <p className="text-center mb-5">
            {`Already have an account`}{" "}
            <Link to={`/login`} className="font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
