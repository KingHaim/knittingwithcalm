import { useQuery } from '@tanstack/react-query';

const mockTutorials = [
  {
    id: 1,
    title: "Basic Knitting Techniques",
    description: "Learn the fundamental stitches and techniques for beginners",
    duration: "45:00",
    skillLevel: "Beginner",
    thumbnail: "/images/pattern-placeholder.jpg",
    videoUrl: "https://example.com/video1",
    topics: ["Cast on", "Knit stitch", "Purl stitch", "Binding off"]
  },
  {
    id: 2,
    title: "Advanced Cable Patterns",
    description: "Master complex cable patterns and techniques",
    duration: "1:15:00",
    skillLevel: "Advanced",
    thumbnail: "/images/pattern-placeholder.jpg",
    videoUrl: "https://example.com/video2",
    topics: ["Basic cables", "Complex twists", "Reading charts"]
  }
];

const fetchTutorials = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockTutorials;
};

export function useTutorials() {
  return useQuery({
    queryKey: ['tutorials'],
    queryFn: fetchTutorials
  });
}