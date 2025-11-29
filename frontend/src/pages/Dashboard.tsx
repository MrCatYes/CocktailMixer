import React from 'react';

export default function Dashboard() {
  const user = JSON.parse(atob(localStorage.getItem('token')!.split('.')[1]));
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Tableau de bord</h1>
      <p>Email : {user.email}</p>
      <p>Rôle : {user.role}</p>
    </div>
  );
}