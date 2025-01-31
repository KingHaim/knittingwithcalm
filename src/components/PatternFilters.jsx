import React from 'react';

export default function PatternFilters({ patterns, onFilterChange }) {
  // Add defensive checks
  if (!patterns) {
    console.log('Patterns is undefined');
    return null;
  }

  // Ensure we have an array
  const patternsArray = Array.isArray(patterns) ? patterns : [];
  
  // Get categories and skill levels one by one to avoid map errors
  const categories = new Set();
  const skillLevels = new Set();

  patternsArray.forEach(pattern => {
    if (pattern && typeof pattern === 'object') {
      if (pattern.category) categories.add(pattern.category);
      if (pattern.skillLevel) skillLevels.add(pattern.skillLevel);
    }
  });

  return (
    <div className="space-y-4">
      {categories.size > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select 
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            {[...categories].map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      )}

      {skillLevels.size > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Skill Level</label>
          <select 
            onChange={(e) => onFilterChange('skillLevel', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">All Skill Levels</option>
            {[...skillLevels].map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}