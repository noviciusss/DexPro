import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchPokemonList } from '../utils/api';
import { getStatColor, getTypeColorClass } from '../utils/helpers';

const ComparisonPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemonList();
        setPokemonList(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading Pokémon:', error);
        setLoading(false);
      }
    };
    
    loadPokemon();
  }, []);

  const handleSelectPokemon1 = (e) => {
    const pokemon = pokemonList.find(p => p.id === parseInt(e.target.value));
    setSelectedPokemon1(pokemon);
  };

  const handleSelectPokemon2 = (e) => {
    const pokemon = pokemonList.find(p => p.id === parseInt(e.target.value));
    setSelectedPokemon2(pokemon);
  };

  const renderPokemonSelector = (label, value, onChange) => (
    <div className="w-full mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}:
      </label>
      <select
        value={value || ""}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md bg-select-arrow bg-no-repeat bg-[right_0.75rem_center] appearance-none"
      >
        <option value="">Select a Pokémon</option>
        {pokemonList.map(pokemon => (
          <option key={pokemon.id} value={pokemon.id}>
            #{pokemon.id} - {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );

  const renderPokemonCard = (pokemon) => {
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
        className={`bg-gradient-to-br ${getBackgroundGradient(primaryType)} p-1 rounded-xl shadow-lg`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
            <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
              #{pokemon.id}
            </span>
          </div>
          
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32 relative">
              <img
                src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-full h-full object-contain"
              />
            </div>
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
        </div>
      </motion.div>
    );
  };
  
  const ComparisonTable = ({ pokemon1, pokemon2 }) => {
    if (!pokemon1 || !pokemon2) return null;
    
    // Get all stats to compare
    const stats = pokemon1.stats.map(stat => ({
      name: stat.stat.name,
      value1: stat.base_stat,
      value2: pokemon2.stats.find(s => s.stat.name === stat.stat.name)?.base_stat || 0
    }));
    
    return (
      <motion.div
        className="mt-8 bg-white rounded-lg shadow-lg p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h3 className="text-lg font-bold mb-4 text-center">Stats Comparison</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2">Stat</th>
                <th className="text-center py-2">{pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)}</th>
                <th className="text-center py-2">Difference</th>
                <th className="text-center py-2">{pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}</th>
              </tr>
            </thead>
            <tbody>
              {stats.map(stat => {
                const diff = stat.value1 - stat.value2;
                return (
                  <tr key={stat.name} className="border-t">
                    <td className="py-3 capitalize">{stat.name.replace('-', ' ')}</td>
                    <td className="py-3 text-center font-medium">{stat.value1}</td>
                    <td className="py-3 text-center">
                      <span className={diff > 0 ? 'text-green-600' : diff < 0 ? 'text-red-600' : 'text-gray-500'}>
                        {diff > 0 ? `+${diff}` : diff}
                      </span>
                    </td>
                    <td className="py-3 text-center font-medium">{stat.value2}</td>
                  </tr>
                );
              })}
              <tr className="border-t">
                <td className="py-3 font-bold">Total</td>
                <td className="py-3 text-center font-bold">
                  {pokemon1.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                </td>
                <td className="py-3 text-center font-bold">
                  {(() => {
                    const total1 = pokemon1.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
                    const total2 = pokemon2.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
                    const diff = total1 - total2;
                    return (
                      <span className={diff > 0 ? 'text-green-600' : diff < 0 ? 'text-red-600' : 'text-gray-500'}>
                        {diff > 0 ? `+${diff}` : diff}
                      </span>
                    );
                  })()}
                </td>
                <td className="py-3 text-center font-bold">
                  {pokemon2.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Pokémon Comparison
      </motion.h1>
      
      <motion.p 
        className="text-gray-600 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Select two Pokémon to compare their stats side by side.
      </motion.p>
      
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="pokeball w-16 h-16 relative">
            <div className="pokeball-button"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {renderPokemonSelector('Select first Pokémon', selectedPokemon1?.id, handleSelectPokemon1)}
              {renderPokemonCard(selectedPokemon1)}
            </div>
            
            <div>
              {renderPokemonSelector('Select second Pokémon', selectedPokemon2?.id, handleSelectPokemon2)}
              {renderPokemonCard(selectedPokemon2)}
            </div>
          </div>
          
          {selectedPokemon1 && selectedPokemon2 && (
            <ComparisonTable pokemon1={selectedPokemon1} pokemon2={selectedPokemon2} />
          )}
        </>
      )}
    </div>
  );
};

export default ComparisonPage;