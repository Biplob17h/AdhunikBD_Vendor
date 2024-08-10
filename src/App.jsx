import React from "react";
import { RouterProvider } from "react-router-dom";
import Routes from "./Pages/Routes/Routes";
import { Toaster } from "react-hot-toast";

export const MainApiLink = "http://localhost:5000";

const App = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={Routes} />
    </div>
  );
};

export default App;
