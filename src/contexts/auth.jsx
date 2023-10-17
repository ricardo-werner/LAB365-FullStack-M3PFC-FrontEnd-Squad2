import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const AuthContext = createContext();
import { toast } from "react-toastify";

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

  const login = async (email, senha) => {
    // <--- aqui é onde você configura o login do usuário
    const res = await axios.post("http://localhost:3333/api/usuario/login", {
      email,
      senha,
    });
    const usuarioLogado = res.data; //Pega resposta do backend
    const tipoUsuario = usuarioLogado.tipoUsuario; //Pega o tipo de usuário
    const token = res.data.token; //Pega o token
    localStorage.setItem("usuario", JSON.stringify(usuarioLogado));
    localStorage.setItem("token", token); //Salva o token no localstorage

    //Configurar token no headers do axios
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(usuarioLogado);
    if (tipoUsuario === "Administrador") {
      toast.success("Administrador seu login foi efetuado com sucesso!");
      navigate("/dashboard");
    } else if (tipoUsuario === "Comprador") {
      toast.success("Administrador seu login foi efetuado com sucesso!");
      navigate("/medicamentos");
    }
  };
  const logout = () => {
    // <--- aqui é onde você configura o logout do usuário
    setUser(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
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
