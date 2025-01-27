import React from 'react';

export function PatternFilters({ filters = null, setFilters = () => {} }) {
  // Ensure we have default values
  const defaultFilters = {
    category: [],
    difficulty: [],
    price: { min: 0, max: 100 }
  };

  // Ensure we're working with valid data
  const safeFilters = filters || defaultFilters;
  
  // Ensure arrays exist
  const categories = Array.isArray(safeFilters.category) ? safeFilters.category : [];
  const difficulties = Array.isArray(safeFilters.difficulty) ? safeFilters.difficulty : [];

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
        <div>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <div key={index}>{category}</div>
            ))
          ) : (
            <p>No categories available</p>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Difficulty</h3>
        <div>
          {difficulties.length > 0 ? (
            difficulties.map((difficulty, index) => (
              <div key={index}>{difficulty}</div>
            ))
          ) : (
            <p>No difficulty levels available</p>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <div>
          <span>€{safeFilters.price?.min || 0} - €{safeFilters.price?.max || 100}</span>
        </div>
      </div>
    </div>
  );
} 