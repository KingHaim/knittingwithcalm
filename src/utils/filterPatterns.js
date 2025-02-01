export function filterPatterns(patterns = [], filters) {
  console.log('Filtering patterns:', { patterns, filters });
  
  if (!patterns) return [];
  
  return patterns.filter(pattern => {
    // Skip price filter if price object is not properly defined
    const priceFilter = filters.price && typeof filters.price.min === 'number' && typeof filters.price.max === 'number';
    
    if (filters.skillLevel.length && !filters.skillLevel.includes(pattern.skillLevel)) {
      return false;
    }
    
    if (filters.age.length && !filters.age.includes(pattern.age)) {
      return false;
    }
    
    if (filters.yarnWeight.length && !filters.yarnWeight.includes(pattern.yarnWeight)) {
      return false;
    }
    
    if (filters.gender.length && !filters.gender.includes(pattern.gender)) {
      return false;
    }
    
    if (priceFilter && (pattern.price < filters.price.min || pattern.price > filters.price.max)) {
      return false;
    }
    
    return true;
  });
}