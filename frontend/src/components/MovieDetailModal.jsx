// Arquivo: frontend/src/components/MovieDetailModal.jsx - VERSÃO FINAL

import React from 'react';

const MovieDetailModal = ({ movie, onClose }) => {
  if (!movie) return null;

  // --- LÓGICA INTELIGENTE PARA A URL DA IMAGEM (APLICADA AQUI TAMBÉM) ---
  const backendUrl = 'http://127.0.0.1:8000';
  let imageUrl = movie.poster_url;

  // Se a URL do poster for um caminho local, adicionamos o endereço do backend.
  if (movie.poster_url && movie.poster_url.startsWith('/')) {
    imageUrl = `${backendUrl}${movie.poster_url}`;
  }
  // --- FIM DA LÓGICA ---

  const handleBackdropClick = (e) => {
    if (e.target.id === 'modal-backdrop') {
      onClose();
    }
  };

  return (
    <div
      id="modal-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
    >
      <div className="relative w-full max-w-3xl m-4 bg-gray-800 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600 z-10"
        >
          ×
        </button>
        
        <div className="flex flex-col md:flex-row">
          {/* Usamos a variável imageUrl corrigida aqui */}
          <img
            src={imageUrl}
            alt={`Poster de ${movie.title}`}
            className="w-full md:w-1/3 h-auto object-cover rounded-l-lg bg-gray-700"
          />
          <div className="p-6 text-white flex flex-col">
            <h2 className="text-3xl font-bold mb-2">{movie.title} ({movie.release_year})</h2>
            <p className="text-md text-gray-400 mb-4">Diretor: {movie.director}</p>
            <p className="text-gray-300 text-base leading-relaxed">
              {movie.synopsis}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;