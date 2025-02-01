import React from 'react';

const PatternFilters = ({ filters, filterOptions, onFilterChange }) => {
  return (
    <div>
      {Object.entries(filterOptions).map(([category, options]) => (
        <div key={category} className="mb-4">
          <h3 className="font-bold mb-2 capitalize">{category}</h3>
          {options.map((option) => (
            <div key={option} className="flex items-center mb-1">
              <input
                type="checkbox"
                className="mr-2"
                checked={filters[category]?.includes(option)}
                onChange={() => onFilterChange(category, option)}
              />
              <span>{option}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PatternFilters;