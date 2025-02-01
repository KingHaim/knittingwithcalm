import React from 'react';
import FilterSection from './FilterSection';
import { FILTER_OPTIONS } from '../../constants/filterOptions';

export default function PatternFilters({ filters = {}, onFilterChange }) {
  // Input validation
  if (!onFilterChange || typeof onFilterChange !== 'function') {
    console.error('PatternFilters: onFilterChange prop must be a function');
    return null;
  }

  const handleClearFilters = () => {
    onFilterChange('clear');
  };

  const hasActiveFilters = Object.values(filters).some(arr => 
    Array.isArray(arr) && arr.length > 0
  );

  return (
    <aside className="bg-white p-6 rounded-lg shadow-sm">
      {Object.entries(FILTER_OPTIONS).map(([category, options]) => {
        const selectedFilters = Array.isArray(filters[category]) 
          ? filters[category] 
          : [];

        return (
          <FilterSection
            key={category}
            title={category}
            options={options}
            selected={selectedFilters}
            onSelect={onFilterChange}
          />
        );
      })}
      
      {hasActiveFilters && (
        <button
          onClick={handleClearFilters}
          className="w-full mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          aria-label="Clear all filters"
        >
          Clear all filters
        </button>
      )}
    </aside>
  );
}