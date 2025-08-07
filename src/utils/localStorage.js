// Constants
const FAVORITES_KEY = 'pokemon_favorites';
const THEME_KEY = 'pokemon_theme';
const SETTINGS_KEY = 'pokemon_settings';

// Load favorites from local storage
export const loadFavorites = () => {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
};

// Save favorites to local storage
export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

// Get user theme preference
export const loadTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY) || 'light';
  } catch (error) {
    console.error('Error loading theme from localStorage:', error);
    return 'light';
  }
};

// Save user theme preference
export const saveTheme = (theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Error saving theme to localStorage:', error);
  }
};

// Load user settings
export const loadSettings = () => {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? JSON.parse(saved) : {
      itemsPerPage: 20,
      sortBy: 'id',
      sortDirection: 'asc'
    };
  } catch (error) {
    console.error('Error loading settings from localStorage:', error);
    return {
      itemsPerPage: 20,
      sortBy: 'id',
      sortDirection: 'asc'
    };
  }
};

// Save user settings
export const saveSettings = (settings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings to localStorage:', error);
  }
};