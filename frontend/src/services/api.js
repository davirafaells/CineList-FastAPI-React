import axios from 'axios';

const api = axios.create({
  // Use a URL completa da sua API FastAPI
  baseURL: 'http://127.0.0.1:8000',
});

// Interceptador para adicionar o token JWT em cada requisição autenticada
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;