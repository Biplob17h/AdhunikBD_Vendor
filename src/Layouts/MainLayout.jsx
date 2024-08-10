import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextApi/UserContext";
import Login from "../Pages/Authentication/Login";
import toast from "react-hot-toast";
import ConfirmPage from "../Pages/ConfirmPage/ConfirmPage";

const MainLayout = () => {
  const { user, refresh, setRefresh, loading } = useContext(AuthContext);
  const { navigate } = useNavigate();

  const logout = () => {
    localStorage.removeItem("AdhunikVendorToken");
    window.location.reload();
    toast.success("Vendor Logout Successfully");
  };
  return (
    <div>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          {user?.phone ? (
            <div>
              {user?.status === "active" ? (
                <div className="drawer lg:drawer-open">
                  <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label
                      htmlFor="my-drawer-2"
                      className="btn btn-primary drawer-button lg:hidden"
                    >
                      Open drawer
                    </label>
                    <Outlet />
                  </div>
                  <div className="drawer-side">
                    <label
                      htmlFor="my-drawer-2"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4">
                      {/* Sidebar content here */}
                      <Link to={"/"}>
                        <li>
                          <a>Home</a>
                        </li>
                      </Link>
                      <Link to={"/order"}>
                        <li>
                          <a>Order</a>
                        </li>
                      </Link>
                      <Link>
                        <li
                          onClick={() => {
                            logout();
                          }}
                        >
                          <a>Logout</a>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
              ) : (
                <div>
                  <ConfirmPage />
                </div>
              )}
            </div>
          ) : (
            <Login />
          )}
        </div>
      )}
    </div>
  );
};

export default MainLayout;
