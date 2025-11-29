import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="p-6">
    

      <h1 className="text-2xl font-bold mb-4">Bienvenue sur CocktailsMixer 🥂</h1>
      {/* <nav className="mb-4 space-x-4">
        <Link to="/dashboard" className="text-blue-500">Dashboard</Link>
        <Link to="/recipes" className="text-blue-500">Recettes</Link>
        <button onClick={logout} className="text-red-500 ml-4">Se déconnecter</button>
      </nav> */}
    </div>
  );
}