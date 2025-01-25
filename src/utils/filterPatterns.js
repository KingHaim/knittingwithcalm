export function filterPatterns(patterns, filters) {
  if (!patterns) return [];
  
  return patterns.filter(pattern => {
    return Object.entries(filters).every(([category, selectedValues]) => {
      if (selectedValues.length === 0) return true;
      return selectedValues.includes(pattern[category]);
    });
  });
}