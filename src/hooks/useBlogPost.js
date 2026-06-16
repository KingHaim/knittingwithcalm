import { useQuery } from '@tanstack/react-query';
import { blogService } from '../services/blogService';

export function useBlogPost(id) {
  return useQuery({
    queryKey: ['blog-post', id],
    queryFn: () => blogService.getPublishedPostById(id),
    enabled: Boolean(id),
  });
}
