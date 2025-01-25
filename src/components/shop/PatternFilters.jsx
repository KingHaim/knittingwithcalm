import React from 'react';
import FilterSection from './FilterSection';
import { FILTER_OPTIONS } from '../../constants/filterOptions';

export default function PatternFilters({ filters, onFilterChange }) {
  return (
    <aside className="bg-white p-6 rounded-lg shadow-sm">
      {Object.entries(FILTER_OPTIONS).map(([category, options]) => (
        <FilterSection
          key={category}
          title={category}
          options={options}
          selected={filters[category] || []}
          onSelect={onFilterChange}
        />
      ))}
      
      {Object.values(filters).some(arr => arr.length > 0) && (
        <button
          onClick={() => onFilterChange('clear')}
          className="w-full mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          Clear all filters
        </button>
      )}
    </aside>
  );
}