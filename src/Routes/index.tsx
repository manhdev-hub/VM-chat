import {
    createBrowserRouter,
  } from "react-router-dom";
import Login from "../pages/login";
import Chats from "../pages/chats";

export const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/",
      element: <Chats/>,
    },
  ]);
