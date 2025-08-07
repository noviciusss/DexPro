import { useState, useMemo } from 'react';

export function usePagination(items, itemsPerPage = 20) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);
  
  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPageState);
  }, [items.length, itemsPerPageState]);
  
  // Get current page items
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPageState;
    const indexOfFirstItem = indexOfLastItem - itemsPerPageState;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  }, [items, currentPage, itemsPerPageState]);
  
  // Change page
  const goToPage = (pageNumber) => {
    // Make sure we stay within valid page numbers
    const newPage = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(newPage);
  };
  
  // Next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Change items per page
  const changeItemsPerPage = (newItemsPerPage) => {
    setItemsPerPageState(newItemsPerPage);
    // Reset to first page when changing items per page
    setCurrentPage(1);
  };
  
  return {
    currentPage,
    totalPages,
    currentItems,
    itemsPerPage: itemsPerPageState,
    goToPage,
    nextPage,
    prevPage,
    changeItemsPerPage
  };
}