import React, { createContext, useEffect, useState } from "react";
import { MainApiLink } from "../App";

export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    // Check if the user is already set; if so, skip the API call
    if (!user) {
      setLoading(true);
      const token = localStorage.getItem("AdhunikVendorToken");

      fetch(`${MainApiLink}/api/v1/auth/vendor/getVendor`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setUser(data.vendorData);
          } else {
            // Handle failure, such as token expiration
            console.log("Failed to fetch user data");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          toast.error("An error occurred while fetching user data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [refresh, setUser]); // Add `user` to the dependency array

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]); // Log user whenever user state changes

  const value = { user, loading, setLoading, setRefresh, refresh };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default UserContext;
