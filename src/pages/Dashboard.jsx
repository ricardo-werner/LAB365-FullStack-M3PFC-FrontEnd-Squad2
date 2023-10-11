import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export const DashboardAdmin = () => {
  const { logout } = useContext(AuthContext); // Recupera o logout do contexto
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
};
