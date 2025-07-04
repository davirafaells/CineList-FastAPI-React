// Arquivo: frontend/src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const [watchlist, setWatchlist] = useState(new Set());

  const fetchUserLists = useCallback(async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const favResponse = await api.get('/api/users/me/favorites');
      setFavorites(new Set(favResponse.data.map(m => m.id)));
      
      const watchResponse = await api.get('/api/users/me/watchlist');
      setWatchlist(new Set(watchResponse.data.map(m => m.id)));
    } catch (error) {
      console.error("Erro ao buscar listas do usuário:", error);
    }
  }, []);

  useEffect(() => {
    async function loadUserFromToken() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await api.get('/api/users/me/');
          if (data) {
            setUser(data);
            await fetchUserLists();
          }
        } catch {
          console.error("Sessão inválida ou expirada. Limpando token.");
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    }
    loadUserFromToken();
  }, [fetchUserLists]);

  const login = async (email, password) => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    const { data } = await api.post('/api/token', formData);
    localStorage.setItem('token', data.access_token);
    const { data: userData } = await api.get('/api/users/me/');
    setUser(userData);
    await fetchUserLists();
  };

  const signup = async (email, password) => {
    await api.post('/api/users/', { email, password });
  };

  const logout = () => {
    setUser(null);
    setFavorites(new Set());
    setWatchlist(new Set());
    localStorage.removeItem('token');
  };
  
  const value = { isAuthenticated: !!user, user, login, signup, logout, loading, favorites, watchlist, fetchUserLists };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);