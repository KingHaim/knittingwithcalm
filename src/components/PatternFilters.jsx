import React from 'react';

export function PatternFilters({ filters = {}, setFilters = () => {} }) {
  // Define static options
  const categories = ['Sweaters', 'Hats', 'Scarves'];
  const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];

  // Ensure filters object has all required properties with defaults
  const safeFilters = {
    category: Array.isArray(filters.category) ? filters.category : [],
    difficulty: Array.isArray(filters.difficulty) ? filters.difficulty : [],
    price: filters.price || { min: 0, max: 100 }
  };

  const handleCategoryChange = (category) => {
    const newCategories = safeFilters.category.includes(category)
      ? safeFilters.category.filter(c => c !== category)
      : [...safeFilters.category, category];
    setFilters(prev => ({ ...prev, category: newCategories }));
  };

  const handleDifficultyChange = (level) => {
    const newDifficulties = safeFilters.difficulty.includes(level)
      ? safeFilters.difficulty.filter(d => d !== level)
      : [...safeFilters.difficulty, level];
    setFilters(prev => ({ ...prev, difficulty: newDifficulties }));
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={safeFilters.category.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Difficulty</h3>
        <div className="space-y-2">
          {difficultyLevels.map(level => (
            <label key={level} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={safeFilters.difficulty.includes(level)}
                onChange={() => handleDifficultyChange(level)}
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
              value={safeFilters.price.max}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                price: { ...prev.price, max: parseInt(e.target.value) }
              }))}
              className="w-full"
            />
            <div className="text-sm text-gray-600">
              €{safeFilters.price.min} - €{safeFilters.price.max}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 