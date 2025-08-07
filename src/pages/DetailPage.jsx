import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchPokemonById } from '../utils/api';
import { useFavorites } from '../hooks/useFavorites';
import PokemonTypes from '../components/PokemonTypes';
import PokemonMoves from '../components/PokemonMoves';
import PokemonAttributes from '../components/PokemonAttributes';
import PokemonStats from '../components/PokemonStats';
import PokemonImage from '../components/PokemonImage';
import PokemonEvolution from '../components/PokemonEvolution';

const DetailPage = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemonById(id);
        setPokemon(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load Pokémon. It might not exist!');
        setLoading(false);
      }
    };
    
    loadPokemon();
  }, [id]);

  // Get primary type for theming
  const primaryType = pokemon?.types[0]?.type.name || 'normal';
  
  // Background gradient based on Pokemon type
  const getBackgroundGradient = (type) => {
    switch(type) {
      case 'fire': return 'from-orange-400 to-red-500';
      case 'water': return 'from-blue-400 to-blue-600';
      case 'grass': return 'from-green-400 to-green-600';
      case 'electric': return 'from-yellow-300 to-amber-500';
      case 'psychic': return 'from-pink-400 to-purple-500';
      case 'ice': return 'from-cyan-300 to-blue-400';
      case 'dragon': return 'from-indigo-500 to-purple-700';
      case 'dark': return 'from-gray-700 to-gray-900';
      case 'fairy': return 'from-pink-300 to-pink-500';
      case 'poison': return 'from-purple-400 to-purple-600';
      case 'ground': return 'from-amber-400 to-amber-600';
      case 'rock': return 'from-gray-400 to-gray-600';
      case 'fighting': return 'from-red-500 to-red-700';
      case 'ghost': return 'from-indigo-400 to-purple-600';
      case 'flying': return 'from-blue-300 to-indigo-500';
      case 'bug': return 'from-lime-400 to-green-600';
      case 'steel': return 'from-gray-300 to-gray-500';
      default: return 'from-gray-100 to-gray-300';
    }
  };
  
  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[70vh]">
        <div className="pokeball w-16 h-16 relative">
          <div className="pokeball-button"></div>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="container mx-auto px-4 py-8 text-center min-h-[70vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          {error || 'Pokémon not found!'}
        </h2>
        <p className="mb-6">We couldn't find the Pokémon you're looking for.</p>
        <button
          onClick={handleBack}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation bar */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        
        <button
          onClick={() => toggleFavorite(pokemon.id)}
          className={`flex items-center ${
            isFavorite(pokemon.id) ? 'text-red-500' : 'text-gray-400'
          } hover:text-red-600 transition-colors`}
          aria-label={isFavorite(pokemon.id) ? "Remove from favorites" : "Add to favorites"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFavorite(pokemon.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="ml-1">{isFavorite(pokemon.id) ? 'Remove from favorites' : 'Add to favorites'}</span>
        </button>
      </div>
      
      {/* Pokemon card */}
      <motion.div 
        className={`bg-gradient-to-br ${getBackgroundGradient(primaryType)} rounded-xl shadow-2xl w-full`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white/90 backdrop-blur-sm m-1 rounded-lg overflow-hidden">
          <div className="p-6 flex flex-col md:flex-row gap-8">
            {/* Left side - Information */}
            <motion.div 
              className="flex-1"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-wrap items-center mb-6">
                <h1 className="text-3xl font-extrabold capitalize mr-2">{pokemon.name}</h1>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">#{pokemon.id}</span>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <PokemonTypes types={pokemon.types} />
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <PokemonMoves moves={pokemon.moves} />
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <PokemonAttributes height={pokemon.height} weight={pokemon.weight} />
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <PokemonStats stats={pokemon.stats} />
                </div>
              </div>
            </motion.div>
            
            {/* Right side - Image and Evolution */}
            <motion.div 
              className="flex-1 flex flex-col"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className={`bg-gradient-to-br ${getBackgroundGradient(primaryType)} p-4 rounded-lg mb-6`}>
                <PokemonImage sprites={pokemon.sprites} name={pokemon.name} />
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 flex-grow">
                <PokemonEvolution pokemon={pokemon} />
              </div>
            </motion.div>        
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailPage;