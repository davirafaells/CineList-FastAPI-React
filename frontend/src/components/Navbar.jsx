
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">CineList</Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="text-gray-300 hover:text-white">Catálogo</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-gray-300 hover:text-white">Meu Perfil</Link>
              <Link to="/favorites" className="text-gray-300 hover:text-white">Favoritos</Link>
              <Link to="/watchlist" className="text-gray-300 hover:text-white">Watchlist</Link>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
              <Link to="/signup" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
                Criar Conta
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;