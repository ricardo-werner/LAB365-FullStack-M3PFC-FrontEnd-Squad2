import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import { CartProvider } from "./contexts/carrinhoCompras.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <CartProvider>
      <App />
    </CartProvider>
);
