import React, { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { api } from '../service/api';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const usuarioRecuperado = JSON.parse(localStorage.getItem('usuario')) || null;
  const expirarToken = localStorage.getItem('expirarToken') || null;
  const [user, setUser] = useState(usuarioRecuperado);  
  const [loading, setLoading] = useState(true);
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');

  useEffect(() => {
    const usuarioRecuperado = localStorage.getItem('usuario');
    if (usuarioRecuperado) {
      const tempoExpirarToken = new Date(expirarToken);

      if (new Date() > tempoExpirarToken) {

        logout();
      } else {
        setUser(JSON.parse(usuarioRecuperado));
        setTipoUsuario(JSON.parse(usuarioRecuperado).tipoUsuario);
        setNomeCompleto(JSON.parse(usuarioRecuperado).nomeCompleto);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, senha) => {
    try {

      const response = await api.post('/usuario/login', {
        email,
        senha,
      });
      if (response.status === 200) {
        const usuarioLogado = response.data; 
        setTipoUsuario(usuarioLogado.tipoUsuario);
        setNomeCompleto(usuarioLogado.nomeCompleto); 

        const tempoExpirarToken = new Date();
        tempoExpirarToken.setSeconds(tempoExpirarToken.getSeconds() + 86400);

        const token = response.data.token;
        localStorage.setItem('usuario', JSON.stringify(usuarioLogado));
        localStorage.setItem('token', token); 
        localStorage.setItem('expirarToken', tempoExpirarToken.toISOString());

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(usuarioLogado);

        if (usuarioLogado.tipoUsuario === 'Administrador') {
          toast.success('Administrador seu login foi efetuado com sucesso!');
          navigate('/admin/dashboard');
        } else if (usuarioLogado.tipoUsuario === 'Comprador') {
          toast.success('Comprador seu login foi efetuado com sucesso!');
          navigate('/comprador/medicamentos');
        }
      }
    } catch (error) {
      toast.error(error.response.data.message); 
      navigate('/');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('expirarToken');

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
