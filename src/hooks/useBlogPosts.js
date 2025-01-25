import { useQuery } from '@tanstack/react-query';

const mockPosts = [
  {
    id: 1,
    title: "Mastering Color Work in Knitting",
    excerpt: "Learn how to create beautiful patterns using multiple colors in your knitting projects",
    content: "Full article content here...",
    author: "Ainhoa Sanchez",
    date: "2024-03-15",
    readTime: "5 min",
    image: "/images/pattern-placeholder.jpg",
    category: "Techniques",
    tags: ["colorwork", "fair isle", "techniques"]
  },
  {
    id: 2,
    title: "Choosing the Right Yarn for Your Project",
    excerpt: "A comprehensive guide to selecting the perfect yarn for different knitting projects",
    content: "Full article content here...",
    author: "Ainhoa Sanchez",
    date: "2024-03-10",
    readTime: "8 min",
    image: "/images/pattern-placeholder.jpg",
    category: "Materials",
    tags: ["yarn", "materials", "guide"]
  }
];

const fetchBlogPosts = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPosts;
};

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: fetchBlogPosts
  });
}