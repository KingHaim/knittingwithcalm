export function filterPatterns(patterns = [], filters) {
  console.log('Filtering patterns:', { patterns, filters });
  
  if (!patterns) return [];
  
  return patterns.filter(pattern => {
    // Log each pattern being filtered
    console.log('Checking pattern:', pattern);
    
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
    
    if (pattern.price < filters.price.min || pattern.price > filters.price.max) {
      return false;
    }
    
    return true;
  });
}