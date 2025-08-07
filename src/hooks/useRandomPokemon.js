import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { PokemonDataContext } from '../context/PokemonDataContext';

export function useRandomPokemon() {
  const { pokemonList } = useContext(PokemonDataContext);
  const navigate = useNavigate();
  
  // Get a random Pokemon ID from the list
  const getRandomPokemonId = () => {
    if (pokemonList.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    return pokemonList[randomIndex].id;
  };
  
  // Navigate to a random Pokemon
  const navigateToRandomPokemon = () => {
    const randomId = getRandomPokemonId();
    if (randomId) navigate(`/pokemon/${randomId}`);
  };
  
  return {
    getRandomPokemonId,
    navigateToRandomPokemon
  };
}