import React from 'react';

export default function PatternFilters({ patterns, onFilterChange }) {
  // Debug log to see what's happening in production
  console.log('PatternFilters received:', { 
    patternsType: typeof patterns,
    isArray: Array.isArray(patterns),
    patternsValue: patterns
  });

  // Super defensive check for patterns
  if (!patterns || !Array.isArray(patterns) || patterns.length === 0) {
    console.log('No valid patterns data');
    return null;
  }

  try {
    // Wrap everything in try-catch to prevent crashes
    const categories = [...new Set(
      patterns
        .filter(Boolean) // Remove null/undefined items
        .filter(p => p && typeof p === 'object' && p.category) // Ensure valid objects
        .map(p => p.category)
    )];

    const skillLevels = [...new Set(
      patterns
        .filter(Boolean)
        .filter(p => p && typeof p === 'object' && p.skillLevel)
        .map(p => p.skillLevel)
    )];

    if (!categories.length && !skillLevels.length) {
      console.log('No categories or skill levels found');
      return null;
    }

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
  } catch (error) {
    console.error('Error in PatternFilters:', error);
    return null;
  }
}