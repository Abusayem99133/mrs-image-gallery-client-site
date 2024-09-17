import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../HomePage/Home";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: "",
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "/login", element: <Login /> },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
