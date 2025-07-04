import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="p-8 max-w-lg mx-auto mt-10 bg-gray-800 rounded-lg">
      <h1 className="text-3xl font-bold text-white mb-6">Meu Perfil</h1>
      {user ? (
        <div className="text-lg space-y-4">
          <p><strong className="text-gray-400">ID do Usuário:</strong> {user.id}</p>
          <p><strong className="text-gray-400">Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Carregando informações do usuário...</p>
      )}
    </div>
  );
};

export default ProfilePage;