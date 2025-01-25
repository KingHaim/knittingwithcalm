// src/hooks/usePatterns.js
import { useQuery } from '@tanstack/react-query';
import { fetchPatterns } from '../services/patternsService';

// We'll keep mockPatterns as a fallback, so move it to patternsService.js
export function usePatterns(filters) {
  return useQuery({
    queryKey: ['patterns', filters],
    queryFn: () => fetchPatterns(filters),
    // Add some caching configuration
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes
  });
}