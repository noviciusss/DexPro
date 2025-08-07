import { useState, useMemo } from 'react';

export function useSorting(items, initialSortKey = 'id', initialDirection = 'asc') {
  const [sortKey, setSortKey] = useState(initialSortKey);
  const [direction, setDirection] = useState(initialDirection); // 'asc' or 'desc'
  
  // Sort items based on current sort key and direction
  const sortedItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    
    return [...items].sort((a, b) => {
      let valueA = a[sortKey];
      let valueB = b[sortKey];
      
      // Handle nested properties (e.g., 'stats.hp')
      if (sortKey.includes('.')) {
        const keys = sortKey.split('.');
        valueA = keys.reduce((obj, key) => obj && obj[key], a);
        valueB = keys.reduce((obj, key) => obj && obj[key], b);
      }
      
      // Handle string comparison
      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
        return direction === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      // Handle number comparison
      return direction === 'asc' 
        ? valueA - valueB
        : valueB - valueA;
    });
  }, [items, sortKey, direction]);
  
  // Change sort key and possibly reverse direction
  const sortBy = (key) => {
    if (sortKey === key) {
      // Toggle direction if clicking the same key
      setDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // New key, default to ascending
      setSortKey(key);
      setDirection('asc');
    }
  };
  
  return {
    sortedItems,
    sortKey,
    direction,
    sortBy
  };
}