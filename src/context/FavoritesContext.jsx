import { createContext, useState, useEffect } from 'react';
import { loadFavorites, saveFavorites } from '../utils/localStorage';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    // Load from localStorage on initial render
    return loadFavorites();
  });

  // Save to localStorage whenever favorites change
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const addFavorite = (pokemonId) => {
    setFavorites(prev => {
      if (!prev.includes(pokemonId)) {
        return [...prev, pokemonId];
      }
      return prev;
    });
  };

  const removeFavorite = (pokemonId) => {
    setFavorites(prev => prev.filter(id => id !== pokemonId));
  };

  const toggleFavorite = (pokemonId) => {
    if (favorites.includes(pokemonId)) {
      removeFavorite(pokemonId);
    } else {
      addFavorite(pokemonId);
    }
  };

  const isFavorite = (pokemonId) => favorites.includes(pokemonId);

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addFavorite,
      removeFavorite, 
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}