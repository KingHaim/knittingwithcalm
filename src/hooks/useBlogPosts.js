import { useQuery } from '@tanstack/react-query';
import { blogService } from '../services/blogService';

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => blogService.getPosts(),
  });
}
