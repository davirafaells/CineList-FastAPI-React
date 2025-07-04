import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 4) {
      toast.error('A senha deve ter pelo menos 4 caracteres.');
      setError('A senha deve ter pelo menos 4 caracteres.');
      return;
    }

    try {
      await signup(email, password);
      toast.success('Conta criada com sucesso! Por favor, faça o login.');
      navigate('/login');
    } catch (err) {
      toast.error('Email já cadastrado ou erro no servidor.');
      setError('Email já cadastrado ou erro no servidor.');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-white">Criar Conta</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full px-3 py-2 mt-1 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Senha</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full px-3 py-2 mt-1 text-gray-200 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button 
            type="submit" 
            className="w-full py-2 px-4 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Criar Conta
          </button>
        </form>
        <p className="text-sm text-center text-gray-400">
          Já tem uma conta? <Link to="/login" className="font-medium text-indigo-400 hover:underline">Faça o login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;