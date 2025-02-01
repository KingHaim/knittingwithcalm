import React from 'react';
import PropTypes from 'prop-types';
import FilterSection from './FilterSection';
import { FILTER_OPTIONS } from '../../constants/filterOptions';

export default function PatternFilters({ filters = {}, onFilterChange }) {
  // Validate inputs
  if (!onFilterChange || typeof onFilterChange !== 'function') {
    console.error('PatternFilters: onFilterChange prop must be a function');
    return null;
  }

  // Safe check for FILTER_OPTIONS
  if (!FILTER_OPTIONS || typeof FILTER_OPTIONS !== 'object') {
    console.error('PatternFilters: FILTER_OPTIONS is not properly defined');
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
        // Ensure selected is always an array
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

// PropTypes for type checking
PatternFilters.propTypes = {
  filters: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired
};

// Default props
PatternFilters.defaultProps = {
  filters: {}
};