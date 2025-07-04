// Arquivo: frontend/src/pages/WatchlistPage.jsx - VERSÃO CORRIGIDA

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import MovieCard from '../components/MovieCard';
import MovieDetailModal from '../components/MovieDetailModal'; // Importe o modal
import { useAuth } from '../context/AuthContext'; // Importe o useAuth

const WatchlistPage = () => {
  const { watchlist } = useAuth(); // Pegamos a lista direto do contexto
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null); // Estado para o modal

  useEffect(() => {
    setLoading(true);
    api.get('/api/users/me/watchlist')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => console.error("Erro ao buscar watchlist:", error))
      .finally(() => setLoading(false));
  }, [watchlist]); // Roda o efeito novamente quando a watchlist mudar

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  if (loading) return <p className="text-center mt-8">Carregando sua watchlist...</p>;

  return (
    <div>
      <h1 className="text-4xl font-bold text-white my-6 text-center">Minha Watchlist</h1>
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map(movie => 
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onCardClick={handleCardClick} // Passando a prop que faltava
            />
          )}
        </div>
      ) : (
        <p className="text-center text-gray-400">Sua watchlist está vazia.</p>
      )}

      {selectedMovie && (
        <MovieDetailModal 
          movie={selectedMovie} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default WatchlistPage;