import { useQuery } from '@tanstack/react-query';
import { tutorialService } from '../services/tutorialService';

export function useTutorials() {
  return useQuery({
    queryKey: ['tutorials'],
    queryFn: () => tutorialService.getTutorials(),
  });
}
