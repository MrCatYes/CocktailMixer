import React, { useEffect, useState } from 'react';

type Recipe = {
  id: number;
  title: string;
  description: string;
};

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    fetch('/api/recipes').then(res => res.json()).then(setRecipes);
  }, []);

  const submit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description: desc })
    });
    if (res.ok) {
      const newRecipe = await res.json();
      setRecipes([...recipes, newRecipe]);
      setTitle(title);
      setDesc(desc);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Recettes</h2>
      <form onSubmit={submit} className="mb-6 space-y-2">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre" className="block w-full border p-2" />
        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" className="block w-full border p-2" />
        <button className="bg-blue-500 text-white px-4 py-2">Ajouter</button>
      </form>
      <ul>
        {recipes.map((r: any) => (
          <li key={r.id} className="mb-2"><strong>{r.title}</strong>: {r.description}</li>
        ))}
      </ul>
    </div>
  );
}