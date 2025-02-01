import React from 'react';
import PatternFilters from '../components/shop/PatternFilters';
import PatternGrid from '../components/shop/PatternGrid';
import { usePatterns } from '../hooks/usePatterns';
import { usePatternFilters } from '../hooks/usePatternFilters';
import { FILTER_OPTIONS } from '../constants/filterOptions';

export default function Shop() {
  const { data: patterns, isLoading, error } = usePatterns();
  const { filters, updateFilter, clearFilters } = usePatternFilters();

  const handleFilterChange = (category, value) => {
    console.log("Handling filter change:", { category, value });
    if (category === "clear") {
      clearFilters();
    } else {
      updateFilter(category, value);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        Error: {error.message}
      </div>
    );
  }

  const filteredPatterns = patterns?.filter((pattern) => {
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
            filterOptions={FILTER_OPTIONS}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="lg:col-span-3">
          <div className="mb-4 text-sm text-gray-600">
            {filteredPatterns.length}{" "}
            {filteredPatterns.length === 1 ? 'pattern' : 'patterns'} found
          </div>
          <PatternGrid patterns={filteredPatterns} />
        </div>
      </div>
    </div>
  );
}