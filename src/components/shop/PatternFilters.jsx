import React from 'react';
import FilterSection from './FilterSection';
import { FILTER_OPTIONS } from '../../constants/filterOptions';

export default function PatternFilters({ filters = {}, onFilterChange }) {
  console.log('PatternFilters received:', { filters, FILTER_OPTIONS });

  // Add validation
  if (!filters || typeof filters !== 'object') {
    console.error('Invalid filters prop:', filters);
    return null;
  }

  return (
    <aside className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Filter Patterns</h2>
      {Object.entries(FILTER_OPTIONS).map(([category, options]) => {
        console.log('Rendering category:', category, 'with options:', options);
        return (
          <FilterSection
            key={category}
            title={category}
            options={options}
            selected={filters[category] || []}
            onSelect={(value) => onFilterChange(category, value)}
          />
        );
      })}
    </aside>
  );
}