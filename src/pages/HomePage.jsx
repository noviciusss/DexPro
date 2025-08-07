import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PokemonCard from '../components/cards/PokemonCard';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';
import SortSelector from '../components/ui/SortSelector';
import TypeFilter from '../components/ui/TypeFilter';
import { useFavorites } from '../hooks/useFavorites';
import { fetchPokemonList } from '../utils/api';

function HomePage() {
  // Keep existing state variables and hooks
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOption, setSortOption] = useState('id');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [clickPosition, setClickPosition] = useState(null);
  
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  
  // Keep existing useEffect and filtering logic
  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const data = await fetchPokemonList();
        setPokemonList(data);
      } catch (err) {
        setError('Failed to load Pokémon data');
      } finally {
        setLoading(false);
      }
    };
    
    loadPokemon();
  }, []);
  
  // Keep existing memoized filtering and sorting logic
  const filteredAndSortedPokemon = useMemo(() => {
    // ... existing logic
    let result = [...pokemonList];
    
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedTypes.length > 0) {
      result = result.filter(p => 
        p.types.some(t => selectedTypes.includes(t.type.name))
      );
    }
    
    switch(sortOption) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'id':
        result.sort((a, b) => a.id - b.id);
        break;
      default:
        break;
    }
    
    return result;
  }, [pokemonList, searchTerm, selectedTypes, sortOption]);
  
  // Keep existing pagination logic
  const currentPokemon = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredAndSortedPokemon.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredAndSortedPokemon, currentPage, itemsPerPage]);
  
  const totalPages = Math.ceil(filteredAndSortedPokemon.length / itemsPerPage);
  
  // Keep random Pokemon handler
  const handleRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * pokemonList.length) + 1;
    navigate(`/pokemon/${randomId}`);
  };
  
  // Loading and error states
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
        <div className="pokeball w-16 h-16 relative">
          <div className="pokeball-button"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg border border-red-200">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  // Capture both the pokemon data and click position
  const handlePokemonClick = (e, pokemon) => {
  // Store the click coordinates
  setClickPosition({ x: e.clientX, y: e.clientY });
  
  // Set the selected pokemon
  setSelectedPokemon(pokemon);
};
  // Updated UI for the HomePage
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Improved header section */}
      <div className="relative mb-8 pb-6 border-b border-gray-200">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 bg-pokeball"></div>
        <motion.div 
  className="text-center mb-10 mt-4 relative"
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.5 }}
>
  <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
    <div className="bg-pokeball w-32 h-32 sm:w-40 sm:h-40"></div>
  </div>
  
  <h2 className="text-2xl sm:text-3xl font-bold mb-2">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-blue-500 to-yellow-500">
    Explore the world of Pokémon with our interactive Dexplorer
  </span>
</h2>
  <p className="text-gray-600 text-lg max-w-2xl mx-auto">
    Search and filter to find your favorites!
  </p>
  
  <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mt-4"></div>
</motion.div>
      </div>
      
      {/* Improved search and filter controls */}
      <div className="bg-white rounded-xl shadow-lg p-5 mb-8 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-10 -right-10 w-40 h-40 opacity-5 bg-pokeball"></div>
        
        {/* Search bar */}
        {/* Search/Filter card - update background */}
<div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-5 mb-8 border border-indigo-100 relative overflow-hidden">
          <SearchBar onSearch={setSearchTerm} />
        </div>
        
        {/* Filters and controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <TypeFilter 
              selectedTypes={selectedTypes} 
              onChange={setSelectedTypes} 
            />
          </div>
          
          <div className="col-span-1">
            <SortSelector 
              value={sortOption}
              onChange={setSortOption}
            />
            
            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Items per page:
              </label>
              <select 
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 
                         focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                         sm:text-sm rounded-md shadow-sm appearance-none bg-select-arrow bg-no-repeat bg-[right_0.75rem_center]"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
          
          <div className="col-span-1 flex items-end">
            {/* Random Pokémon button - update colors */}
          <motion.button
  onClick={handleRandomPokemon}
  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-colors font-medium relative overflow-hidden"
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
>
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="pokeball w-12 h-12"></div>
              </div>
              <span className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                Random Pokémon
              </span>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Results section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-5 mb-8 border border-indigo-100">
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
    Results <span className="text-red-500">{filteredAndSortedPokemon.length}</span>
  </h2>
</div>
        
        {currentPokemon.length === 0 ? (
          <div className="text-center py-10">
            <div className="mx-auto w-16 h-16 text-gray-300 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Pokémon found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentPokemon.map(pokemon => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                isFavorite={isFavorite(pokemon.id)}
                onToggleFavorite={() => toggleFavorite(pokemon.id)}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default HomePage;