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

  const [user, setUser] = useState(usuarioRecuperado); // <--- aqui é onde você configura o estado do usuário
  const [loading, setLoading] = useState(true);
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');

  useEffect(() => {
    const usuarioRecuperado = localStorage.getItem('usuario');
    if (usuarioRecuperado) {
      const tempoExpirarToken = new Date(expirarToken);

      if (new Date() > tempoExpirarToken) {
        // O token expirou, faça logout
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
      // <--- aqui é onde você configura o login do usuário
      const response = await api.post('/usuario/login', {
        email,
        senha,
      });
      if (response.status === 200) {
        const usuarioLogado = response.data; //Pega resposta do backend
        setTipoUsuario(usuarioLogado.tipoUsuario); //Muda o valor do UseState tipoUsuario
        setNomeCompleto(usuarioLogado.nomeCompleto); //Muda o valor do UseState nomeCompleto

        //defina o tempo de expiração do token para 1 dia (86400 segundos)
        //altera os 20 segundos abaixo que foi usado para teste
        const tempoExpirarToken = new Date();
        tempoExpirarToken.setSeconds(tempoExpirarToken.getSeconds() + 86400);

        const token = response.data.token; //Pega o token
        localStorage.setItem('usuario', JSON.stringify(usuarioLogado));
        localStorage.setItem('token', token); //Salva o token no localstorage
        localStorage.setItem('expirarToken', tempoExpirarToken.toISOString());

        //Configurar token no headers do axios
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
      toast.error(error.response.data.message); // Exibe a mensagem de erro da API
      navigate('/');
    }
  };

  const logout = () => {
    // <--- aqui é onde você configura o logout do usuário
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
