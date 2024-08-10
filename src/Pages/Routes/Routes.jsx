import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout";
import Home from "../Home/Home";
import Order from "../Order/Order";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";
import ConfirmPage from "../ConfirmPage/ConfirmPage";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/order", element: <Order /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/confirm",
    element: <ConfirmPage />,
  },
]);

export default Routes;
