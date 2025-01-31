export function filterPatterns(patterns = [], filters = {}) {
  if (!patterns) return [];
  
  return patterns.filter(pattern => {
    // Category filter
    if (filters.category && filters.category.length > 0) {
      if (!pattern.category || !filters.category.includes(pattern.category)) {
        return false;
      }
    }

    // Difficulty filter
    if (filters.difficulty && filters.difficulty.length > 0) {
      if (!pattern.difficulty || !filters.difficulty.includes(pattern.difficulty)) {
        return false;
      }
    }

    // Price filter
    if (filters.price) {
      const price = Number(pattern.price);
      if (isNaN(price) || price < filters.price.min || price > filters.price.max) {
        return false;
      }
    }

    return true;
  });
}