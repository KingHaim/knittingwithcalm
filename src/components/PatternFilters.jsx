import React from 'react';

export default function PatternFilters({ patterns, onFilterChange }) {
  // Ensure patterns is an array, if not, use empty array as fallback
  const patternsArray = Array.isArray(patterns) ? patterns : [];

  // Get unique categories
  const categories = [...new Set(patternsArray.map(pattern => pattern?.category).filter(Boolean))];

  // Get unique difficulty levels
  const difficulties = [...new Set(patternsArray.map(pattern => pattern?.difficulty).filter(Boolean))];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select 
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Difficulty</label>
        <select 
          onChange={(e) => onFilterChange('difficulty', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Difficulties</option>
          {difficulties.map((difficulty, index) => (
            <option key={index} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
} 