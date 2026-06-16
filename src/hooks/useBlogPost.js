import { useQuery } from '@tanstack/react-query';
import { blogService } from '../services/blogService';

export function useBlogPost(handle) {
  return useQuery({
    queryKey: ['blog-post', handle],
    queryFn: () => blogService.getPublishedPostByHandle(handle),
    enabled: Boolean(handle),
  });
}
