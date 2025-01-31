import React from 'react';

export default function PatternFilters({ patterns = [], onFilterChange }) {
  // Early return if patterns is not available
  if (!patterns || !Array.isArray(patterns)) {
    return null;
  }

  // Get unique categories safely
  const categories = [...new Set(patterns
    .filter(pattern => pattern && pattern.category)
    .map(pattern => pattern.category))];

  // Get unique skill levels safely - now using skillLevel instead of difficulty
  const skillLevels = [...new Set(patterns
    .filter(pattern => pattern && pattern.skillLevel)
    .map(pattern => pattern.skillLevel))];

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
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
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
            {skillLevels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
} 