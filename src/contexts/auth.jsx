import React, { useState, createContext, useEffect } from "react";
import { navigate, useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // <--- aqui é onde você configura o estado do usuário
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuarioRecuperado = localStorage.getItem("usuario");
    if (usuarioRecuperado) {
      setUser(JSON.parse(usuarioRecuperado));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // <--- aqui é onde você configura o login do usuário
    const usuarioLogado = { id: 1, nome: "Fulano" };
    localStorage.setItem("usuario", JSON.stringify(usuarioLogado));
  };
  const logout = () => {
    // <--- aqui é onde você configura o logout do usuário
    setUser(null);
    localStorage.removeItem("usuario");
    navigate("/");
  };
  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
