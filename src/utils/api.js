import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'https://pokeapi.co/api/v2';

// Configure axios with timeout and retry logic
const apiClient = axios.create({
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add retry interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;
    
    // Retry logic for network errors
    if (!config.__retryCount) {
      config.__retryCount = 0;
    }
    
    if (config.__retryCount < 3 && (
      error.code === 'NETWORK_ERROR' || 
      error.code === 'TIMEOUT' ||
      (error.response && error.response.status >= 500)
    )) {
      config.__retryCount++;
      console.log(`Retrying request (attempt ${config.__retryCount}/3)...`);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * config.__retryCount));
      
      return apiClient(config);
    }
    
    return Promise.reject(error);
  }
);

// Fetch the list of all Pokemon (limit to first 151 for original Pokemon)
export const fetchPokemonList = async () => {
  try {
    const response = await apiClient.get(`${API_BASE_URL}/pokemon?limit=250`);
    
    // Helper function to batch API calls
    const fetchInBatches = async (urls, batchSize = 20) => {
      const results = [];
      
      for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);
        console.log(`Fetching batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(urls.length / batchSize)}`);
        
        const batchPromises = batch.map(async (pokemon) => {
          try {
            const details = await apiClient.get(pokemon.url);
            return details.data;
          } catch (error) {
            console.error(`Failed to fetch ${pokemon.name}:`, error);
            return null; // Return null for failed requests
          }
        });
        
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults.filter(result => result !== null));
        
        // Add a small delay between batches to avoid rate limiting
        if (i + batchSize < urls.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      return results;
    };
    
    // Fetch detailed data for each Pokemon in batches
    const pokemonDetails = await fetchInBatches(response.data.results);
    
    return pokemonDetails;
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    throw error;
  }
};

// Fetch a single Pokemon by ID or name
export const fetchPokemonById = async (idOrName) => {
  try {
    const response = await apiClient.get(`${API_BASE_URL}/pokemon/${idOrName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Pokemon ${idOrName}:`, error);
    throw error;
  }
};

// Fetch evolution chain for a Pokemon
export const fetchEvolutionChain = async (pokemonId) => {
  try {
    // First get the species data
    const speciesResponse = await apiClient.get(`${API_BASE_URL}/pokemon-species/${pokemonId}`);
    
    // Get the evolution chain URL from species data
    const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
    
    // Fetch the evolution chain data
    const evolutionResponse = await apiClient.get(evolutionChainUrl);
    return evolutionResponse.data.chain;
  } catch (error) {
    console.error(`Error fetching evolution chain for Pokemon ${pokemonId}:`, error);
    throw error;
  }
};

// Fetch multiple Pokemon by IDs (used for favorites)
export const fetchPokemonByIds = async (ids) => {
  try {
    const pokemonPromises = ids.map(id => fetchPokemonById(id));
    return await Promise.all(pokemonPromises);
  } catch (error) {
    console.error("Error fetching multiple Pokemon:", error);
    throw error;
  }
};

// Get a random Pokemon ID (from the original 151)
export const getRandomPokemonId = () => {
  return Math.floor(Math.random() * 151) + 1;
};