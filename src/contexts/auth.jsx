import React, { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const AuthContext = createContext();
import { toast } from 'react-toastify';
import { api } from '../service/api';

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const usuarioRecuperado = JSON.parse(localStorage.getItem('usuario')) || null;
  const [user, setUser] = useState(usuarioRecuperado); // <--- aqui é onde você configura o estado do usuário
  const [loading, setLoading] = useState(true);
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');

  useEffect(() => {
    const usuarioRecuperado = localStorage.getItem('usuario');
    if (usuarioRecuperado) {
      setUser(JSON.parse(usuarioRecuperado)); //Muda o valor do UseState User
      setTipoUsuario(JSON.parse(usuarioRecuperado).tipoUsuario);
      setNomeCompleto(JSON.parse(usuarioRecuperado).nomeCompleto);
    }
    setLoading(false);
  }, []);

  const login = async (email, senha) => {
    try {
      // <--- aqui é onde você configura o login do usuário
      const response = await api.post('/usuario/login', {
        email,
        senha,
      });
      if (response.status === 200) {
        const usuarioLogado = response.data; //Pega resposta do backend
        setTipoUsuario(usuarioLogado.tipoUsuario); //Muda o valor do UseState tipoUsuario
        setNomeCompleto(usuarioLogado.nomeCompleto); //Muda o valor do UseState nomeCompleto
        const token = response.data.token; //Pega o token
        localStorage.setItem('usuario', JSON.stringify(usuarioLogado));
        localStorage.setItem('token', token); //Salva o token no localstorage

        //Configurar token no headers do axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(usuarioLogado);

        if (usuarioLogado.tipoUsuario === 'Administrador') {
          toast.success('Administrador seu login foi efetuado com sucesso!');
          navigate('/admin/dashboard');
        } else if (usuarioLogado.tipoUsuario === 'Comprador') {
          toast.success('Comprador seu login foi efetuado com sucesso!');
          navigate('/medicamentos');
        }
      }
    } catch (error) {
      toast.error(error.response.data.message); // Exibe a mensagem de erro da API
      navigate('/');
    }
  };

  const logout = () => {
    // <--- aqui é onde você configura o logout do usuário
    setUser(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    navigate('/');
  };
  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        loading,
        login,
        logout,
        setTipoUsuario,
        setNomeCompleto,
        tipoUsuario,
        nomeCompleto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
