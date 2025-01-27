import React from 'react';

export function PatternFilters(props) {
  // Ensure props exist
  if (!props) return null;

  // Destructure with defaults
  const { filters = {}, setFilters = () => {} } = props;

  // Define static filter options
  const CATEGORIES = ['Sweaters', 'Hats', 'Scarves', 'Socks'];
  const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.category?.includes(category)}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...(filters.category || []), category]
                    : (filters.category || []).filter(c => c !== category);
                  handleFilterChange('category', newCategories);
                }}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Difficulty</h3>
        <div className="space-y-2">
          {DIFFICULTIES.map((level) => (
            <label key={level} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.difficulty?.includes(level)}
                onChange={(e) => {
                  const newDifficulties = e.target.checked
                    ? [...(filters.difficulty || []), level]
                    : (filters.difficulty || []).filter(d => d !== level);
                  handleFilterChange('difficulty', newDifficulties);
                }}
                className="mr-2"
              />
              {level}
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <div className="space-y-2">
          <div>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.price?.max || 100}
              onChange={(e) => handleFilterChange('price', {
                min: filters.price?.min || 0,
                max: parseInt(e.target.value)
              })}
              className="w-full"
            />
            <div className="text-sm text-gray-600">
              €{filters.price?.min || 0} - €{filters.price?.max || 100}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 