import React from 'react';

export function PatternFilters({ filters, setFilters }) {
  // Static data
  const categories = ['Sweaters', 'Hats', 'Scarves'];
  const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];

  // Direct state updates
  const updateCategory = (category, isChecked) => {
    if (!setFilters || !filters) return;
    
    const newCategories = isChecked 
      ? [...(filters.category || []), category]
      : (filters.category || []).filter(c => c !== category);
      
    setFilters({
      ...filters,
      category: newCategories
    });
  };

  const updateDifficulty = (level, isChecked) => {
    if (!setFilters || !filters) return;
    
    const newDifficulties = isChecked
      ? [...(filters.difficulty || []), level]
      : (filters.difficulty || []).filter(d => d !== level);
      
    setFilters({
      ...filters,
      difficulty: newDifficulties
    });
  };

  const updatePrice = (value) => {
    if (!setFilters || !filters) return;
    
    setFilters({
      ...filters,
      price: {
        min: 0,
        max: parseInt(value) || 100
      }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category}`}
                checked={filters?.category?.includes(category) || false}
                onChange={(e) => updateCategory(category, e.target.checked)}
                className="mr-2"
              />
              <label htmlFor={`category-${category}`}>{category}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Difficulty</h3>
        <div className="space-y-2">
          {difficultyLevels.map((level) => (
            <div key={level} className="flex items-center">
              <input
                type="checkbox"
                id={`difficulty-${level}`}
                checked={filters?.difficulty?.includes(level) || false}
                onChange={(e) => updateDifficulty(level, e.target.checked)}
                className="mr-2"
              />
              <label htmlFor={`difficulty-${level}`}>{level}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <div>
          <input
            type="range"
            min="0"
            max="100"
            value={filters?.price?.max || 100}
            onChange={(e) => updatePrice(e.target.value)}
            className="w-full"
          />
          <div className="text-sm text-gray-600">
            €{filters?.price?.min || 0} - €{filters?.price?.max || 100}
          </div>
        </div>
      </div>
    </div>
  );
} 