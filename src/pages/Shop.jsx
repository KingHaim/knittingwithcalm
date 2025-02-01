import React, { useState } from 'react';
import PatternFilters from '../components/PatternFilters';
import PatternGrid from '../components/shop/PatternGrid';
import { usePatterns } from '../hooks/usePatterns';
import { filterPatterns } from '../utils/filterPatterns';

export default function Shop() {
  const { data: patterns, isLoading, error } = usePatterns();
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

  // Debug log in production
  console.log('Shop data:', { 
    patterns, 
    isLoading, 
    error,
    patternsType: typeof patterns,
    isArray: Array.isArray(patterns)
  });

  // Wait for data
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
            filters={filters}  // Changed from patterns to filters
            onFilterChange={handleFilterChange} 
          />
        </div>
        
        <div className="lg:col-span-3">
          <div className="mb-4 text-sm text-gray-600">
            {filteredPatterns.length} {filteredPatterns.length === 1 ? 'pattern' : 'patterns'} found
          </div>
          <PatternGrid patterns={filteredPatterns} /> {/* Changed from patterns to filteredPatterns */}
        </div>
      </div>
    </div>
  );
}
