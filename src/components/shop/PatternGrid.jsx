import React from 'react';
import PatternCard from './PatternCard';

export default function PatternGrid({ patterns }) {
  if (!patterns?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No patterns found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {patterns.map(pattern => (
        <PatternCard key={pattern.id} pattern={pattern} />
      ))}
    </div>
  );
}