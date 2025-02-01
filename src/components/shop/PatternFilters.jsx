import React from 'react';
import FilterSection from './FilterSection';
import { FILTER_OPTIONS } from '../../constants/filterOptions';

export default function PatternFilters({ filters, onFilterChange }) {
  // Add debug logging
  console.log('PatternFilters props:', { filters, FILTER_OPTIONS });

  if (!filters) {
    console.warn('No filters provided to PatternFilters');
    return null;
  }

  return (
    <aside className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      {Object.entries(FILTER_OPTIONS).map(([category, options]) => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-medium mb-2 capitalize">{category}</h3>
          <div className="space-y-2">
            {options.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={Array.isArray(filters[category]) && filters[category].includes(option)}
                  onChange={() => onFilterChange(category, option)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}