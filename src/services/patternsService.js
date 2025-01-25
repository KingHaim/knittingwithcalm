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
  // ... add all your other patterns here
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