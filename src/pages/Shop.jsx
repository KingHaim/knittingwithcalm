import React, { useState } from 'react';
import PatternFilters from '../components/PatternFilters';
import PatternGrid from '../components/shop/PatternGrid';
import { usePatterns } from '../hooks/usePatterns';
import { filterPatterns } from '../utils/filterPatterns';

export default function Shop() {
  // Move usePatterns to the top
  const { data: patterns, isLoading, error } = usePatterns();

  const [filters, setFilters] = useState({
    skillLevel: [],
    age: [],
    yarnWeight: [],
    gender: [],
    price: { min: 0, max: 100 }
  });
  
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
      return;
    }
    
    setFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  // Calculate filtered patterns after patterns is defined
  const filteredPatterns = patterns ? filterPatterns(patterns, filters) : [];

  // Loading states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading patterns</div>;
  if (!patterns) return <div>No patterns available</div>;
  if (!Array.isArray(patterns)) return <div>Invalid patterns data</div>;

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