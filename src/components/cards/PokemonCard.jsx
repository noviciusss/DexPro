import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { getTypeColorClass } from '../../utils/helpers';
import { useFavorites } from '../../hooks/useFavorites';
import PokemonDetail from '../PokemonDetail';

const PokemonCard = ({
  pokemon,
  showFavoriteIcon = false,
  isFavorite: propIsFavorite,
  onToggleFavorite
}) => {
  const { isFavorite } = useFavorites();
  const [showModal, setShowModal] = useState(false);
  const [clickPosition, setClickPosition] = useState(null);
  const cardRef = useRef(null);

  // Get primary type for card theming
  const primaryType = pokemon.types[0]?.type.name || 'normal';

  // Custom background gradients based on pokemon type
  const getCardBackground = (type) => {
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

  // Use either the prop value or the context value
  const isFav = propIsFavorite !== undefined ? propIsFavorite : isFavorite(pokemon.id);

  // Handle favorites toggle without triggering card click
  const handleFavoriteClick = (e) => {
    if (onToggleFavorite) {
      e.stopPropagation();
      onToggleFavorite();
    }
  };

  // Handle card click to show modal with position tracking
  const handlePokemonClick = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setClickPosition({
        x: rect.left + rect.width / 2 + window.scrollX,
        y: rect.top + window.scrollY,
        cardWidth: rect.width,
        cardTop: rect.top + window.scrollY,
        scrollY: window.scrollY
      });
      setShowModal(true);
    }
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setClickPosition(null);
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all bg-gradient-to-br ${getCardBackground(primaryType)} cursor-pointer w-full max-w-xs relative`}
        onClick={handlePokemonClick}
        whileHover={{
          scale: 1.05,
          y: -5,
          boxShadow: "0px 10px 25px rgba(0,0,0,0.2)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Pokeball background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-pokeball-pattern"></div>

        <div className="relative p-2 sm:p-4">
          {/* Card shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>

          {/* Pokemon ID badge */}
          <div className="absolute top-3 right-3 bg-white/80 rounded-full px-2 py-1 text-xs font-bold text-gray-700 backdrop-blur-sm shadow-sm">
            #{pokemon.id}
          </div>

          {/* Favorite icon - make it clickable */}
          {onToggleFavorite && (
            <div
              className="absolute top-3 left-3 z-10 cursor-pointer"
              onClick={handleFavoriteClick}
            >
              <svg className={`h-6 w-6 ${isFav ? 'text-red-500' : 'text-gray-400'} drop-shadow-md`}
                viewBox="0 0 20 20"
                fill={isFav ? "currentColor" : "none"}
                stroke="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
          )}

          {/* Card content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 sm:p-4 relative">
            {/* Small decorative pokeball in background */}
            <div className="absolute top-2 right-2 w-12 h-12 opacity-5 bg-pokeball"></div>

            <div className="flex flex-col items-center">
              <motion.div
                className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-full w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center mb-2 sm:mb-4 overflow-hidden"
                whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-full h-full object-contain"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <h2 className="text-lg sm:text-xl font-extrabold capitalize mb-1 text-gray-800 text-center">
                {pokemon.name}
              </h2>

              <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-1 sm:mt-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium capitalize ${getTypeColorClass(type.type.name)}`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pokemon Detail Modal */}
      {showModal && (
        <PokemonDetail
          pokemon={pokemon}
          onClose={handleCloseModal}
          clickPosition={clickPosition}
        />
      )}
    </>
  );
};

export default PokemonCard;