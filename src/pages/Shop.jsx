import React, { useState } from 'react';
import PatternFilters from '../components/PatternFilters';
import PatternGrid from '../components/shop/PatternGrid';
import { usePatterns } from '../hooks/usePatterns';
import { filterPatterns } from '../utils/filterPatterns';

export default function Shop() {
  const { data: patterns, isLoading } = usePatterns();
  const [filters, setFilters] = useState({
    category: [],
    skillLevel: [],
    price: { min: 0, max: 100 },
  });
  
  const handleFilterChange = (category, value) => {
    if (category === 'clear') {
      setFilters({
        category: [],
        skillLevel: [],
        price: { min: 0, max: 100 },
      });
    } else {
      setFilters(prev => ({
        ...prev,
        [category]: value
      }));
    }
  };

  const filteredPatterns = patterns ? filterPatterns(patterns, filters) : [];

  // Add console.log to debug
  console.log('Shop patterns:', patterns);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-lg p-4">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-primary mb-8">Shop Patterns</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div>
          {patterns && patterns.length > 0 ? (
            <PatternFilters 
              patterns={patterns} 
              onFilterChange={handleFilterChange} 
            />
          ) : null}
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