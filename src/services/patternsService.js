// src/services/patternsService.js
import { Octokit } from '@octokit/rest';

// Your mock patterns that serve as a fallback if GitHub fails
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
    skillLevel: "Intermediate"
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

// Initialize GitHub client with your token
const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN
});

// Store GitHub repository information
const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER;
const repo = process.env.NEXT_PUBLIC_GITHUB_REPO;
const path = 'data/patterns.json';

// Function to fetch patterns with filtering capabilities
export async function fetchPatterns(filters = {}) {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    // Convert GitHub's base64 data to JSON
    const content = JSON.parse(Buffer.from(data.content, 'base64').toString());
    let patterns = content.patterns;

    // Apply any filters that were passed in
    if (filters) {
      patterns = patterns.filter(pattern => {
        let matches = true;
        
        if (filters.category) {
          matches = matches && pattern.category === filters.category;
        }
        
        if (filters.skillLevel) {
          matches = matches && pattern.skillLevel === filters.skillLevel;
        }
        
        if (filters.yarnWeight) {
          matches = matches && pattern.yarnWeight === filters.yarnWeight;
        }

        return matches;
      });
    }

    return patterns;
  } catch (error) {
    console.error('Error fetching patterns:', error);
    // Return mock data as a fallback if GitHub fails
    return mockPatterns;
  }
}

// Function to save or update a pattern
export async function savePattern(pattern) {
  try {
    // First, get the current content of the patterns file
    const { data: currentFile } = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    // Decode the current content
    const content = JSON.parse(Buffer.from(currentFile.content, 'base64').toString());
    let patterns = content.patterns;

    // Check if we're updating an existing pattern or adding a new one
    const existingIndex = patterns.findIndex(p => p.id === pattern.id);
    if (existingIndex >= 0) {
      // Update existing pattern
      patterns[existingIndex] = { ...patterns[existingIndex], ...pattern };
    } else {
      // Add new pattern with a unique ID
      const newPattern = {
        ...pattern,
        id: pattern.id || Date.now(),
      };
      patterns.push(newPattern);
    }

    // Save the updated patterns back to GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `Update pattern: ${pattern.title}`,
      content: Buffer.from(JSON.stringify({ patterns }, null, 2)).toString('base64'),
      sha: currentFile.sha,
    });

    return pattern;
  } catch (error) {
    console.error('Error saving pattern:', error);
    throw error;
  }
}