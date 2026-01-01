import { useQuery } from '@tanstack/react-query';
import { patternService } from '../services/patternService';

export function usePatterns(filters) {
  return useQuery({
    queryKey: ['patterns', filters],
    queryFn: () => patternService.getPatterns()
  });
}