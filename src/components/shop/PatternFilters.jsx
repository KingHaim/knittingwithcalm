import React from 'react';
import FilterSection from './FilterSection';
import { FILTER_OPTIONS } from '../../constants/filterOptions';

// In PatternFilters.jsx
export default function PatternFilters({ filters = {}, onFilterChange }) {
  console.log('PatternFilters rendering with filters:', filters);
  
  // Input validation
  if (!onFilterChange || typeof onFilterChange !== 'function') {
    console.error('PatternFilters: onFilterChange prop must be a function');
    return null;
  }

  return (
    <aside className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Filters</h2> {/* Added heading */}
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
            onSelect={(value) => onFilterChange(category, value)}
          />
        );
      })}
      
      {Object.values(filters).some(arr => Array.isArray(arr) && arr.length > 0) && (
        <button
          onClick={() => onFilterChange('clear')}
          className="w-full mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </aside>
  );
}