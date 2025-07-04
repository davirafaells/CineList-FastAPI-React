// Arquivo: frontend/src/components/MovieCard.jsx - VERSÃO FINAL COM URL COMPLETA

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const MovieCard = ({ movie, onCardClick = () => {} }) => {
  const { isAuthenticated, favorites, watchlist, fetchUserLists } = useAuth();
  const navigate = useNavigate();

  // --- LÓGICA INTELIGENTE PARA A URL DA IMAGEM ---
  const backendUrl = 'http://127.0.0.1:8000';
  let imageUrl = movie.poster_url;

  // Se a URL do poster for um caminho local (começa com /),
  // nós adicionamos o endereço do backend na frente.
  if (movie.poster_url && movie.poster_url.startsWith('/')) {
    imageUrl = `${backendUrl}${movie.poster_url}`;
  }
  // Se for uma URL completa (começa com http), usamos como está.
  // --- FIM DA LÓGICA ---


  const isFavorite = favorites.has(movie.id);
  const isOnWatchlist = watchlist.has(movie.id);

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Você precisa estar logado para esta ação.');
      navigate('/login');
      return;
    }
    const action = isFavorite 
      ? api.delete(`/api/users/me/favorites/${movie.id}`)
      : api.post(`/api/users/me/favorites/${movie.id}`);
    await toast.promise(action, {
      loading: 'Atualizando...',
      success: <b>Favoritos atualizados!</b>,
      error: <b>Ocorreu um erro.</b>,
    });
    fetchUserLists();
  };

  const handleWatchlistClick = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Você precisa estar logado para esta ação.');
      navigate('/login');
      return;
    }
    const action = isOnWatchlist
      ? api.delete(`/api/users/me/watchlist/${movie.id}`)
      : api.post(`/api/users/me/watchlist/${movie.id}`);
    await toast.promise(action, {
      loading: 'Atualizando...',
      success: <b>Watchlist atualizada!</b>,
      error: <b>Ocorreu um erro.</b>,
    });
    fetchUserLists();
  };

  return (
    <div 
      onClick={() => onCardClick(movie)}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      {/* Usamos a variável imageUrl aqui */}
      <img src={imageUrl} alt={`Poster de ${movie.title}`} className="w-full h-96 object-cover bg-gray-700" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-white">{movie.title} ({movie.release_year})</h3>
        <p className="text-gray-400 text-sm mb-2">{movie.director}</p>
        <p className="text-gray-300 text-sm line-clamp-3">{movie.synopsis}</p>
      </div>
      <div className="p-4 bg-gray-700 flex justify-around">
        <button 
          onClick={handleFavoriteClick} 
          className={`text-sm font-semibold transition-colors duration-200 ${isFavorite ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`}
        >
          {isFavorite ? '✓ Favorito' : '⭐ Favoritar'}
        </button>
        <button 
          onClick={handleWatchlistClick} 
          className={`text-sm font-semibold transition-colors duration-200 ${isOnWatchlist ? 'text-blue-400' : 'text-white hover:text-blue-400'}`}
        >
          {isOnWatchlist ? '✓ Na Watchlist' : '🎬 Watchlist'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;