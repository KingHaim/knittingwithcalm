import { useQuery } from '@tanstack/react-query';

const mockPatterns = [
  {
    id: 1,
    title: "Aaron's Cardigan",
    price: 6.50,
    description: "A classic cardigan design",
    image: "/images/patterns/aarons-cardigan.jpg",
    category: "Sweater",
    subcategory: "Cardigan",
    yarnWeight: "DK",
    skillLevel: "Intermediate"
  },
  {
    id: 2,
    title: "Aaron's Sweater",
    price: 6.50,
    description: "A cozy pullover sweater",
    image: "/images/patterns/aarons-sweater.jpg",
    category: "Sweater",
    subcategory: "Pullover",
    yarnWeight: "DK",
    skillLevel: "Intermediate"
  },
  {
    id: 3,
    title: "Belle Maxi Bow Headband",
    price: 4.99,
    description: "A stylish headband with bow detail",
    image: "/images/patterns/belle-maxi-bow-headband.jpg",
    category: "Other Headwear",
    subcategory: "Headband",
    yarnWeight: "DK",
    skillLevel: "Beginner"
  },
  {
    id: 4,
    title: "Cloudy Sweater",
    price: 7.50,
    description: "A comfortable pullover design",
    image: "/images/patterns/cloudy-sweater.jpg",
    category: "Sweater",
    subcategory: "Pullover",
    yarnWeight: "DK",
    skillLevel: "Intermediate"
  },
  {
    id: 5,
    title: "Forest Berries",
    price: 6.99,
    description: "A beautiful cardigan with berry details",
    image: "/images/patterns/forest-berries.jpg",
    category: "Sweater",
    subcategory: "Cardigan",
    yarnWeight: "DK",
    skillLevel: "Advanced"
  },
  {
    id: 6,
    title: "Harvard Slipover",
    price: 5.99,
    description: "A classic vest design",
    image: "/images/patterns/harvard-slipover.jpg",
    category: "Vest",
    yarnWeight: "DK",
    skillLevel: "Intermediate"
  },
  {
    id: 7,
    title: "Heart Me Out socks",
    price: 4.99,
    description: "Cute socks with heart pattern",
    image: "/images/patterns/heart-me-out-socks.jpg",
    category: "Feet / Legs",
    subcategory: "Socks → Mid-calf",
    yarnWeight: "Fingering",
    skillLevel: "Intermediate"
  },
  {
    id: 8,
    title: "Levana Top & Bralette",
    price: 6.50,
    description: "A versatile sleeveless top design",
    image: "/images/patterns/levana-top-bralette.jpg",
    category: "Tops",
    subcategory: "Sleeveless Top",
    yarnWeight: "Sport",
    skillLevel: "Intermediate"
  },
  {
    id: 9,
    title: "Lily Sweater",
    price: 7.50,
    description: "A beautiful floral-inspired pullover",
    image: "/images/patterns/lily-sweater.jpg",
    category: "Sweater",
    subcategory: "Pullover",
    yarnWeight: "DK",
    skillLevel: "Intermediate"
  },
  {
    id: 10,
    title: "Luna Cardigan & Sweater",
    price: 7.99,
    description: "A versatile design that can be made as cardigan or pullover",
    image: "/images/patterns/luna-cardigan-sweater.jpg",
    category: "Sweater",
    subcategory: ["Cardigan", "Pullover"],
    yarnWeight: "DK",
    skillLevel: "Intermediate"
  },
  {
    id: 11,
    title: "Luna Newborn Set - Cardi and Pants",
    price: 8.99,
    description: "Adorable newborn set including cardigan and pants",
    image: "/images/patterns/luna-newborn-set.jpg",
    category: "Sweater",
    subcategory: ["Cardigan", "Pullover", "Pants"],
    yarnWeight: "Sport",
    skillLevel: "Intermediate"
  },
  {
    id: 12,
    title: "Natura Top",
    price: 6.50,
    description: "A nature-inspired sleeveless top",
    image: "/images/patterns/natura-top.jpg",
    category: "Tops",
    subcategory: "Sleeveless Top",
    yarnWeight: "Sport",
    skillLevel: "Intermediate"
  },
  {
    id: 13,
    title: "Priscila Handbag",
    price: 5.99,
    description: "A stylish knitted handbag",
    image: "/images/patterns/priscila-handbag.jpg",
    category: "Bag",
    subcategory: "Purse / Handbag",
    yarnWeight: "Worsted",
    skillLevel: "Intermediate"
  },
  {
    id: 14,
    title: "Sweet Cake top",
    price: 6.99,
    description: "A cute and playful tee design",
    image: "/images/patterns/sweet-cake-top.jpg",
    category: "Tops",
    subcategory: "Tee",
    yarnWeight: "Sport",
    skillLevel: "Intermediate"
  }
];

const fetchPatterns = async (filters) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPatterns;
};

export function usePatterns(filters) {
  return useQuery({
    queryKey: ['patterns', filters],
    queryFn: () => fetchPatterns(filters)
  });
}