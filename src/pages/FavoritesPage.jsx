import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchPokemonByIds } from '../utils/api';
import { useFavorites } from '../hooks/useFavorites';
import PokemonCard from '../components/cards/PokemonCard';

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [favoritePokemon, setFavoritePokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load favorite pokemon data
  useEffect(() => {
    const loadFavorites = async () => {
      if (favorites.length === 0) {
        setFavoritePokemon([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const pokemonData = await fetchPokemonByIds(favorites);
        setFavoritePokemon(pokemonData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading favorites:', error);
        setLoading(false);
      }
    };
    
    loadFavorites();
  }, [favorites]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <motion.h1 
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          My Favorite Pokémon
        </motion.h1>
        <motion.p
          className="text-gray-600 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Here are all the Pokémon you've marked as favorites.
        </motion.p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="pokeball w-16 h-16 relative">
            <div className="pokeball-button"></div>
          </div>
        </div>
      ) : favorites.length === 0 ? (
        <motion.div 
          className="text-center py-16 bg-gray-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-xl font-medium text-gray-600 mb-4">
            You haven't added any favorites yet!
          </h2>
          <p className="text-gray-500 mb-6">
            Start adding Pokémon to your favorites to see them here.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Browse Pokémon
          </button>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {favoritePokemon.map(pokemon => (
            <motion.div key={pokemon.id} variants={item}>
              <PokemonCard
                pokemon={pokemon}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(pokemon.id)}
                onClick={() => navigate(`/pokemon/${pokemon.id}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default FavoritesPage;