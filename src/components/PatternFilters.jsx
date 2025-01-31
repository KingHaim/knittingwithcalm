import React from 'react';

export default function PatternFilters({ patterns, onFilterChange }) {
  // Add console.log to debug
  console.log('PatternFilters received:', { patterns });

  // If patterns is falsy or empty, return early
  if (!patterns?.length) {
    console.log('No patterns available');
    return null;
  }

  // Get unique categories and skill levels
  const categories = [...new Set(patterns.map(p => p?.category).filter(Boolean))];
  const skillLevels = [...new Set(patterns.map(p => p?.skillLevel).filter(Boolean))];

  return (
    <div className="space-y-4">
      {categories.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select 
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      )}

      {skillLevels.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Skill Level</label>
          <select 
            onChange={(e) => onFilterChange('skillLevel', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Skill Levels</option>
            {skillLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}