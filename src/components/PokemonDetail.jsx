import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import PokemonTypes from './PokemonTypes';
import PokemonMoves from './PokemonMoves';
import PokemonAttributes from './PokemonAttributes';
import PokemonStats from './PokemonStats';
import PokemonImage from './PokemonImage';
import PokemonEvolution from './PokemonEvolution';
import { useFavorites } from '../hooks/useFavorites';

const PokemonDetail = ({ pokemon, onClose, clickPosition = null }) => {
  if (!pokemon) return null;

  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(pokemon.id);
  const detailCardRef = useRef(null);

  // Get primary type for theming
  const primaryType = pokemon.types[0]?.type.name || 'normal';

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

  // Handle favorite toggle
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(pokemon.id);
  };

  // Calculate position for the detail card based on the click position
  const cardWidth = Math.min(900, window.innerWidth - 40);
  const modalHeight = 400; // Approximate modal height, adjust as needed
  let left = 0, top = 0;
  if (clickPosition) {
    // Center horizontally in viewport, but keep the top at the card's center Y (with a little more up)
    left = (window.innerWidth - cardWidth) /3;
    top = clickPosition.y - modalHeight*2.7  -32; // 32px extra up for a bit more "up" feel
    if (top < 20) top = 20;
    if (top + modalHeight > window.innerHeight + window.scrollY - 20) {
      top = window.innerHeight + window.scrollY - modalHeight - 20;
    }
  }

  // Scroll back to the original position when the detail view is closed
  useEffect(() => {
    if (clickPosition?.scrollY) {
      window.scrollTo(0, clickPosition.scrollY);
    }
    // Add click listener to close on outside click
    const handleOutsideClick = (e) => {
      if (detailCardRef.current && !detailCardRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [clickPosition, onClose]);

  return (
    <div className="fixed inset-0 z-50" style={{ pointerEvents: 'auto' }}>
      {/* Semi-transparent backdrop */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      {/* Pokemon Detail Card */}
      <motion.div
        ref={detailCardRef}
        className={`absolute z-50 bg-gradient-to-br ${getBackgroundGradient(primaryType)} rounded-xl shadow-2xl overflow-hidden`}
        style={{
          top: clickPosition ? `${top}px` : '50%',
          left: clickPosition ? `${left}px` : '50%',
          maxWidth: `${cardWidth}px`,
          width: '100%',
          transform: clickPosition ? 'none' : 'translate(-50%, -50%)'
        }}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Pokeball background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-pokeball-pattern rounded-xl"></div>
        {/* Content Container - scrollable */}
        <div className="bg-white/90 backdrop-blur-sm m-1 rounded-lg max-h-[80vh] overflow-y-auto">
          {/* Header - sticky inside the card */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm flex justify-between items-center p-3 border-b">
            <h2 className="text-lg font-bold capitalize flex items-center">
              {pokemon.name}
              <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">#{pokemon.id}</span>
            </h2>
            <div className="flex items-center space-x-2">
              {/* Favorite button */}
              <button
                onClick={handleFavoriteClick}
                className={`p-2 rounded-full ${isFav ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100 transition-colors`}
                aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              {/* Close button */}
              <button
                onClick={onClose}
                className="p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          {/* Main Content */}
          <div className="p-4">
            <div className="flex flex-col md:flex-row gap-5">
              {/* Left side - Image */}
              <motion.div
                className="md:w-2/5"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className={`bg-gradient-to-br ${getBackgroundGradient(primaryType)} p-4 rounded-lg mb-4 relative overflow-hidden`}>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 opacity-20 bg-pokeball"></div>
                  <PokemonImage sprites={pokemon.sprites} name={pokemon.name} />
                </div>
                <div className="bg-white rounded-lg shadow-sm p-3">
                  <PokemonEvolution pokemon={pokemon} />
                </div>
              </motion.div>
              {/* Right side - Information */}
              <motion.div
                className="md:w-3/5"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="bg-white rounded-lg shadow-sm p-3">
                    <PokemonTypes types={pokemon.types} />
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-3">
                    <PokemonAttributes height={pokemon.height} weight={pokemon.weight} />
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-3">
                    <PokemonStats stats={pokemon.stats} />
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-3">
                    <PokemonMoves moves={pokemon.moves} />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PokemonDetail;