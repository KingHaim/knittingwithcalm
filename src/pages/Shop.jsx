import React, { useState } from 'react';
import PatternFilters from '../components/PatternFilters';
import PatternGrid from '../components/shop/PatternGrid';
import { usePatterns } from '../hooks/usePatterns';
import { FILTER_OPTIONS } from '../constants/filterOptions';

export default function Shop() {
  const { data: patterns, isLoading, error } = usePatterns();

  const [filters, setFilters] = useState({
    skillLevel: [],
    age: [],
    yarnWeight: [],
    gender: []
  });

  const handleFilterChange = (category, value) => {
    console.log('Handling filter change:', { category, value });
    setFilters(prevFilters => {
      const currentFilters = prevFilters[category] || [];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter(item => item !== value)
        : [...currentFilters, value];
        
      return {
        ...prevFilters,
        [category]: newFilters
      };
    });
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        Error: {error.message}
      </div>
    );
  }

  const filteredPatterns = patterns?.filter(pattern => {
    if (!pattern) return false;
    
    return Object.entries(filters).every(([category, selectedValues]) => {
      if (!selectedValues || selectedValues.length === 0) return true;
      return selectedValues.includes(pattern[category]);
    });
  }) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-primary mb-8">Shop Patterns</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <PatternFilters 
            filters={filters}
            filterOptions={FILTER_OPTIONS}  // Pass the available filter options
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