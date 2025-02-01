import { useState, useCallback } from 'react';

const initialFilters = {
  skillLevel: [],
  age: [],
  yarnWeight: [],
  gender: []
};

export function usePatternFilters() {
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = useCallback((category, value) => {
    setFilters(current => {
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