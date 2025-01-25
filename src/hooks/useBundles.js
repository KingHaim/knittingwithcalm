import { useQuery } from '@tanstack/react-query';

const mockBundles = [
  {
    id: 1,
    title: "Sweater Collection",
    description: "A collection of our most popular sweater patterns",
    patterns: [
      {
        id: 1,
        title: "Aaron's Cardigan",
        price: 6.50
      },
      {
        id: 2,
        title: "Aaron's Sweater",
        price: 6.50
      },
      {
        id: 4,
        title: "Cloudy Sweater",
        price: 7.50
      }
    ],
    price: 16.99,
    savings: 3.51
  },
  {
    id: 2,
    title: "Summer Tops Bundle",
    description: "Light and airy tops perfect for summer",
    patterns: [
      {
        id: 8,
        title: "Levana Top & Bralette",
        price: 6.50
      },
      {
        id: 12,
        title: "Natura Top",
        price: 6.50
      },
      {
        id: 14,
        title: "Sweet Cake top",
        price: 6.99
      }
    ],
    price: 15.99,
    savings: 4.00
  },
  {
    id: 3,
    title: "Luna Collection",
    description: "Complete Luna pattern collection",
    patterns: [
      {
        id: 10,
        title: "Luna Cardigan & Sweater",
        price: 7.99
      },
      {
        id: 11,
        title: "Luna Newborn Set - Cardi and Pants",
        price: 8.99
      }
    ],
    price: 14.99,
    savings: 1.99
  }
];

const fetchBundles = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockBundles;
};

export function useBundles() {
  return useQuery({
    queryKey: ['bundles'],
    queryFn: fetchBundles
  });
}