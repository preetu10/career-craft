import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Error from "../Error";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Blogs from "../pages/Blogs/Blogs";
import LogIn from "../pages/LogIn/LogIn";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoute";
import UserProfile from "../pages/Profile/UserProfile";
import Dashboard from "../pages/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "user-profile",
        element: <UserProfile></UserProfile>,
      },
    ],
  },
]);
export default router;
