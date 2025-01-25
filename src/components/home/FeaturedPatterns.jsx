import React from 'react';
import { usePatterns } from '../../hooks/usePatterns';
import PatternGrid from '../shop/PatternGrid';

export default function FeaturedPatterns() {
  const { data: patterns, isLoading } = usePatterns({ featured: true });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return <PatternGrid patterns={patterns} />;
}