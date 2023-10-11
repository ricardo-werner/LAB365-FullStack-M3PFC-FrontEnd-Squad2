import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./AppRoutes";

ReactDOM.createRoot(document.getElementById("root")).render(<AppRoutes />);
