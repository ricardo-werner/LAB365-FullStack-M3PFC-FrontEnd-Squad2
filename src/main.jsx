import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./Router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={AppRouter} />
);
