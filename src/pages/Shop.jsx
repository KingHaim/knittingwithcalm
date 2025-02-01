import React from 'react';
import PatternFilters from '../components/PatternFilters';
import PatternGrid from '../components/shop/PatternGrid';
import { usePatterns } from '../hooks/usePatterns';
import { FILTER_OPTIONS } from '../constants/filterOptions';

export default function Shop() {
  const { data: patterns, isLoading, error } = usePatterns();
  const [filters, setFilters] = React.useState({
    skillLevel: [],
    age: [],
    yarnWeight: [],
    gender: []
  });

  const handleFilterChange = (category, value) => {
    if (category === 'clear') {
      setFilters({
        skillLevel: [],
        age: [],
        yarnWeight: [],
        gender: []
      });
      return;
    }

    setFilters(prev => ({
      ...prev,
      [category]: Array.isArray(prev[category]) 
        ? prev[category].includes(value)
          ? prev[category].filter(item => item !== value)
          : [...prev[category], value]
        : [value]
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!patterns) return <div>No patterns available</div>;

  const filteredPatterns = patterns.filter(pattern => {
    return Object.entries(filters).every(([category, selectedValues]) => {
      if (!Array.isArray(selectedValues) || selectedValues.length === 0) return true;
      return selectedValues.includes(pattern[category]);
    });
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-primary mb-8">Shop Patterns</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="bg-gray-50 p-4 rounded-lg">
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