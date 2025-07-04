// Arquivo: frontend/src/components/ProtectedRoute.jsx - VERSÃO SIMPLIFICADA

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // <-- Removido o 'loading'
  const location = useLocation();

  // A verificação de loading agora é feita no App.jsx,
  // então quando este componente renderiza, já sabemos o estado de autenticação.
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;