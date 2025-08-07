import { useState, useMemo } from 'react';

export function useFiltering(items) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  
  // Filter items based on search term and selected types
  const filteredItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    
    return items.filter(item => {
      // Apply search filter on name
      const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Apply type filters
      const typeMatch = selectedTypes.length === 0 || 
        item.types.some(typeObj => selectedTypes.includes(typeObj.type.name));
      
      return nameMatch && typeMatch;
    });
  }, [items, searchTerm, selectedTypes]);
  
  // Toggle a type filter
  const toggleType = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTypes([]);
  };
  
  return {
    filteredItems,
    searchTerm,
    setSearchTerm,
    selectedTypes,
    setSelectedTypes,
    toggleType,
    clearFilters
  };
}