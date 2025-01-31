export function filterPatterns(patterns = [], filters) {
  if (!patterns) return [];
  
  return patterns.filter(pattern => {
    // Category filter
    if (filters.category.length && !filters.category.includes(pattern.category)) {
      return false;
    }
    
    // Skill level filter (changed from difficulty)
    if (filters.skillLevel.length && !filters.skillLevel.includes(pattern.skillLevel)) {
      return false;
    }
    
    // Price filter
    if (pattern.price < filters.price.min || pattern.price > filters.price.max) {
      return false;
    }
    
    return true;
  });
}