import React from 'react';
import { motion } from 'framer-motion';
import { getTypeColorClass } from '../../utils/helpers';

const POKEMON_TYPES = [
  'bug', 'dark', 'dragon', 'electric', 'fairy',
  'fighting', 'fire', 'flying', 'ghost', 'grass',
  'ground', 'ice', 'normal', 'poison', 'psychic',
  'rock', 'steel', 'water'
];

const TypeFilter = ({ selectedTypes, onChange }) => {
  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      onChange(selectedTypes.filter(t => t !== type));
    } else {
      onChange([...selectedTypes, type]);
    }
  };

  return (
    <div className="w-full">
      <p className="text-gray-700 font-medium mb-2">Filter by type:</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {POKEMON_TYPES.map((type) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleType(type)}
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize transition-colors ${
              selectedTypes.includes(type) 
                ? getTypeColorClass(type) + ' ring-2 ring-offset-1'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type}
          </motion.button>
        ))}
      </div>
      {selectedTypes.length > 0 && (
        <button
          onClick={() => onChange([])}
          className="text-sm text-blue-600 hover:underline mt-1"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};

export default TypeFilter;