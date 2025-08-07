import React from 'react';
import { motion } from 'framer-motion';
import { getTypeColorClass, getStatColor } from '../../utils/helpers';

const ComparisonCard = ({ pokemon }) => {
  if (!pokemon) return null;
  
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

  return (
    <motion.div
      className={`bg-gradient-to-br ${getBackgroundGradient(primaryType)} p-1 rounded-xl shadow-lg h-full`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
            #{pokemon.id}
          </span>
        </div>
        
        <div className="flex justify-center mb-4 flex-grow">
          <img
            src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            className="h-32 object-contain"
          />
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-1">Types</h3>
          <div className="flex gap-2">
            {pokemon.types.map(type => (
              <span 
                key={type.type.name}
                className={`px-2 py-1 rounded-full text-xs capitalize ${getTypeColorClass(type.type.name)}`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Base Stats</h3>
          {pokemon.stats.map(stat => (
            <div key={stat.stat.name} className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="capitalize">{stat.stat.name.replace('-', ' ')}</span>
                <span>{stat.base_stat}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getStatColor(stat.base_stat)}`}
                  style={{ width: `${Math.min(100, (stat.base_stat / 150) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span>Total</span>
            <span className="font-bold">
              {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComparisonCard;