import { useState, useCallback } from 'react';

const initialFilters = {
  skillLevel: [],
  age: [],
  yarnWeight: [],
  gender: [],
  price: { min: 0, max: 100 } // Add price filter
};

export function usePatternFilters() {
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = useCallback((category, value) => {
    setFilters(current => {
      // Handle price filter separately
      if (category === 'price') {
        return {
          ...current,
          price: value
        };
      }

      // Handle array-based filters
      const values = current[category];
      const updated = values.includes(value)
        ? values.filter(v => v !== value)
        : [...values, value];
      
      return {
        ...current,
        [category]: updated
      };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return { filters, updateFilter, clearFilters };
}