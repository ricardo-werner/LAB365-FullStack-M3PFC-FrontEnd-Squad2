import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

// Função para obter o token de autenticação do localStorage ou de algum outro local
const getToken = () => {
  return localStorage.getItem('token');
};

// FUNÇÃO PARA OBTER O TOKEN CSRF DE UM COOKIE
const getCSRFToken = () => {
  const name = 'csrfToken';
  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
};

// Intercepta todas as requisições e adiciona o cabeçalho de autenticação em todas as requisições
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  const csrfToken = getCSRFToken();
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }

  return config;
});

export { api };
