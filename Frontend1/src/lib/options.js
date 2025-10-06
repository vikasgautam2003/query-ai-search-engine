// This file contains the data for our dropdown menus.

export const aiModels = [
    {
      name: "Default",
      version: "GPT-4o",
      description: "The latest and most capable model.",
    },
    {
      name: "Experimental",
      version: "Sonnet 3.5",
      description: "A fast, balanced model from Anthropic.",
    },
    {
      name: "Advanced",
      version: "Gemini 2.5",
      description: "Google's most capable model.",
    },
];
  
export const attachmentOptions = [
    {
        label: "Upload File",
        // In a real app, you might have an icon component here
    },
    {
        label: "Attach Link",
    }
];



export const interestCategories = [
    'Tech & Science',
    'Finance',
    'Arts & Culture',
    'Sports',
    'Entertainment',
    'Health & Wellness',
    'Gaming',
    'Travel'
];




// src/lib/options.js

// ... existing aiModels, attachmentOptions, interestCategories arrays ...

export const trendingTopics = [
    { id: 1, name: 'Intel Corporation', value: '$36.86', change: 0.15 },
    { id: 2, name: 'International Business M...', value: '$265.31', change: -0.05 },
    { id: 3, name: 'Google Pixel 8', value: '1.2M views', change: 0.08 },
    { id: 4, name: 'AI Ethics Debate', value: '450K discussions', change: 0.03 },
    { id: 5, name: 'New Space Missions', value: '50K articles', change: 0.02 },
];