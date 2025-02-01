import React from 'react';
import { FILTER_OPTIONS } from '../constants/filterOptions';

export default function PatternFilters({ filters, onFilterChange }) {
  console.log('PatternFilters received:', { filters, FILTER_OPTIONS });

  if (!filters || typeof filters !== 'object') {
    console.error('Invalid filters prop:', filters);
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
              <label key={option} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters[category]?.includes(option) || false}
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