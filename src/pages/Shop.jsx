import React, { useState } from 'react';
import PatternFilters from '../components/PatternFilters';
import PatternGrid from '../components/shop/PatternGrid';
import { usePatterns } from '../hooks/usePatterns';
import { filterPatterns } from '../utils/filterPatterns';

export default function Shop() {
  // Get patterns data using the hook
  const { data: patterns, isLoading, error } = usePatterns();

  // Initialize filters state
  const [filters, setFilters] = useState({
    skillLevel: [],
    age: [],
    yarnWeight: [],
    gender: [],
    price: { min: 0, max: 100 }
  });
  
  // Debug log to check data
  console.log('Shop component state:', {
    patterns,
    isLoading,
    error,
    filters,
    patternsLength: patterns?.length
  });

  // Handle filter changes
  const handleFilterChange = (category, value) => {
    console.log('Filter change:', { category, value });
    
    if (category === 'clear') {
      setFilters({
        skillLevel: [],
        age: [],
        yarnWeight: [],
        gender: [],
        price: { min: 0, max: 100 }
      });
    } else {
      setFilters(prev => ({
        ...prev,
        [category]: value
      }));
    }
  };

  // Filter patterns based on current filters
  const filteredPatterns = patterns ? filterPatterns(patterns, filters) : [];

  // Loading and error states
  if (isLoading) return (
    <div className="container mx-auto px-4 py-8">
      <div>Loading patterns...</div>
    </div>
  );

  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div>Error loading patterns: {error.message}</div>
    </div>
  );

  if (!patterns || !Array.isArray(patterns)) return (
    <div className="container mx-auto px-4 py-8">
      <div>No patterns available</div>
    </div>
  );

  // Main render
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-primary mb-8">Shop Patterns</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div>
          <PatternFilters 
            filters={filters}
            onFilterChange={handleFilterChange} 
          />
        </div>
        
        <div className="lg:col-span-3">
          <div className="mb-4 text-sm text-gray-600">
            {filteredPatterns.length} {filteredPatterns.length === 1 ? 'pattern' : 'patterns'} found
          </div>
          <PatternGrid patterns={filteredPatterns} />
        </div>
      </div>
    </div>
  );
}