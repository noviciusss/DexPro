import { createContext, useState, useEffect } from 'react';
import { fetchPokemonList } from '../utils/api';

export const PokemonDataContext = createContext();

export function PokemonDataProvider({ children }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemonList();
        setPokemonList(data);
        
        // Extract unique types from all Pokemon
        const uniqueTypes = new Set();
        data.forEach(pokemon => {
          pokemon.types.forEach(typeObj => {
            uniqueTypes.add(typeObj.type.name);
          });
        });
        
        setTypes(Array.from(uniqueTypes).sort());
        setLoading(false);
      } catch (err) {
        console.error('Failed to load Pokemon data:', err);
        setError('Failed to load Pokemon data. Please try again later.');
        setLoading(false);
      }
    };
    
    loadPokemon();
  }, []);

  return (
    <PokemonDataContext.Provider value={{
      pokemonList,
      loading,
      error,
      types
    }}>
      {children}
    </PokemonDataContext.Provider>
  );
}