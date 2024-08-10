import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainApiLink } from "../../App";
import toast from "react-hot-toast";
import { AuthContext } from "../../ContextApi/UserContext";
import setTokenToLocalStorage from "../../Components/SetTokenToLocalStroge";

const Login = () => {
  const { setRefresh, refresh } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = (event) => {
    setError("");
    event.preventDefault();

    const form = event.target;
    const phone = form.phone.value;
    const password = form.password.value;

    const vendor = {
      phone,
      password,
    };

    console.log(vendor);

    fetch(`${MainApiLink}/api/v1/auth/vendor/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vendor),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          toast.success("Vendor Login successfully");
          setTokenToLocalStorage(data?.data?.token);
          setRefresh(!refresh);
          form.reset();
          navigate("/");
          // if (data?.data?.vendorData?.status === "active") {
          //   navigate("/");
          // } else {
          //   navigate("/confirm");
          // }
        } else {
          setError(data.message);
        }
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Vendor Login</h1>
        </div>
        <div className="card bg-base-100 w-[500px] shrink-0 shadow-2xl">
          <form onSubmit={handleLoginSubmit} className="card-body">
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
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className="text-center mb-4 -mt-3">or</p>
          <p className="text-center mb-5">
            {`Already have an account`}{" "}
            <Link to={`/signup`} className="font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
