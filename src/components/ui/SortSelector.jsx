import React from 'react';
import { motion } from 'framer-motion';

const SortSelector = ({ value, onChange }) => {
  return (
    <div className="w-full sm:w-auto">
      <label htmlFor="sort-selector" className="block text-sm font-medium text-gray-700 mb-1">
        Sort by:
      </label>
      <div className="relative">
        <motion.select
          id="sort-selector"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 
                   focus:outline-none focus:ring-blue-500 focus:border-blue-500 
                   sm:text-sm rounded-md shadow-sm appearance-none bg-select-arrow bg-no-repeat bg-[right_0.75rem_center]"
          whileFocus={{ scale: 1.01 }}
        >
          <option value="id">ID Number (lowest first)</option>
          <option value="name">Name (A to Z)</option>
        </motion.select>
      </div>
    </div>
  );
};

export default SortSelector;