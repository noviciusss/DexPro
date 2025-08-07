// Helper function to get color class based on Pokemon type
export const getTypeColorClass = (type) => {
  switch(type) {
    case 'normal': return 'bg-gray-300 text-gray-800';
    case 'fire': return 'bg-orange-500 text-white';
    case 'water': return 'bg-blue-500 text-white';
    case 'grass': return 'bg-green-500 text-white';
    case 'electric': return 'bg-yellow-400 text-gray-900';
    case 'ice': return 'bg-cyan-400 text-gray-900';
    case 'fighting': return 'bg-red-600 text-white';
    case 'poison': return 'bg-purple-600 text-white';
    case 'ground': return 'bg-amber-600 text-white';
    case 'flying': return 'bg-blue-400 text-white';
    case 'psychic': return 'bg-pink-500 text-white';
    case 'bug': return 'bg-lime-500 text-white';
    case 'rock': return 'bg-stone-500 text-white';
    case 'ghost': return 'bg-indigo-500 text-white';
    case 'dragon': return 'bg-violet-700 text-white';
    case 'dark': return 'bg-gray-800 text-white';
    case 'steel': return 'bg-slate-400 text-white';
    case 'fairy': return 'bg-pink-300 text-gray-800';
    default: return 'bg-gray-200 text-gray-800';
  }
};

// Helper function to get color based on stat value
export const getStatColor = (statValue) => {
  if (statValue < 50) return 'bg-red-500';
  if (statValue < 80) return 'bg-yellow-500';
  if (statValue < 100) return 'bg-green-500';
  if (statValue < 120) return 'bg-blue-500';
  return 'bg-purple-500'; // 120+
};

// Helper function to format Pokemon height (decimeters to meters)
export const formatHeight = (height) => {
  return (height / 10).toFixed(1) + ' m';
};

// Helper function to format Pokemon weight (hectograms to kilograms)
export const formatWeight = (weight) => {
  return (weight / 10).toFixed(1) + ' kg';
};

// Helper function to extract evolution names from chain
export const extractEvolutionNames = (chain) => {
  const names = [chain.species.name];
  
  if (chain.evolves_to && chain.evolves_to.length > 0) {
    for (const evolution of chain.evolves_to) {
      names.push(...extractEvolutionNames(evolution));
    }
  }
  
  return names.map(name => name.charAt(0).toUpperCase() + name.slice(1));
};

// Format Pokemon ID with leading zeros
export const formatPokemonId = (id) => {
  return '#' + id.toString().padStart(3, '0');
};

// Calculate Pokemon weakness/resistance based on types
export const calculateTypeEffectiveness = (types) => {
  const typeChart = {
    normal: { weakness: ['fighting'], resistance: [], immunity: ['ghost'] },
    fire: { 
      weakness: ['water', 'ground', 'rock'], 
      resistance: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'], 
      immunity: [] 
    },
    water: { 
      weakness: ['electric', 'grass'], 
      resistance: ['fire', 'water', 'ice', 'steel'], 
      immunity: [] 
    },
    // ... and so on for other types
  };

  const effectiveness = {
    weakness: new Set(),
    resistance: new Set(),
    immunity: new Set()
  };

  // Process each type the Pokemon has
  types.forEach(typeObj => {
    const type = typeObj.type.name;
    if (typeChart[type]) {
      typeChart[type].weakness.forEach(w => effectiveness.weakness.add(w));
      typeChart[type].resistance.forEach(r => effectiveness.resistance.add(r));
      typeChart[type].immunity.forEach(i => effectiveness.immunity.add(i));
    }
  });

  // Remove resistances that are also weaknesses (they cancel out)
  effectiveness.resistance.forEach(type => {
    if (effectiveness.weakness.has(type)) {
      effectiveness.resistance.delete(type);
      effectiveness.weakness.delete(type);
    }
  });

  // Immunities override everything else
  effectiveness.immunity.forEach(type => {
    effectiveness.weakness.delete(type);
    effectiveness.resistance.delete(type);
  });

  return {
    weakness: Array.from(effectiveness.weakness),
    resistance: Array.from(effectiveness.resistance),
    immunity: Array.from(effectiveness.immunity)
  };
};