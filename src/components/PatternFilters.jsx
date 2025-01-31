import React from 'react';

export default function PatternFilters({ patterns, onFilterChange }) {
  // If patterns is not an array or is empty, return null
  if (!Array.isArray(patterns) || patterns.length === 0) {
    return null;
  }

  // Get unique categories and skill levels with explicit null checks
  const categories = [];
  const skillLevels = [];

  patterns.forEach(pattern => {
    if (pattern && pattern.category && !categories.includes(pattern.category)) {
      categories.push(pattern.category);
    }
    if (pattern && pattern.skillLevel && !skillLevels.includes(pattern.skillLevel)) {
      skillLevels.push(pattern.skillLevel);
    }
  });

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
} 