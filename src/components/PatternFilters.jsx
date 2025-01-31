import React from 'react';

export default function PatternFilters({ patterns, onFilterChange }) {
  // Add console.log to debug
  console.log('Patterns received:', patterns);

  // Guard clause - if patterns is undefined or null, return null
  if (!patterns) {
    console.log('No patterns available yet');
    return null;
  }

  // Ensure patterns is an array
  const patternsArray = Array.isArray(patterns) ? patterns : [];
  
  // Get unique categories
  const categories = [...new Set(patternsArray
    .filter(Boolean) // Remove any null/undefined items
    .map(pattern => pattern.category)
    .filter(Boolean))]; // Remove any null/undefined categories

  // Get unique skill levels
  const skillLevels = [...new Set(patternsArray
    .filter(Boolean) // Remove any null/undefined items
    .map(pattern => pattern.skillLevel)
    .filter(Boolean))]; // Remove any null/undefined skill levels

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select 
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Skill Level</label>
        <select 
          onChange={(e) => onFilterChange('skillLevel', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Skill Levels</option>
          {skillLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
} 