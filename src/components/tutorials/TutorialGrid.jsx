import React from 'react';
import TutorialCard from './TutorialCard';

export default function TutorialGrid({ tutorials }) {
  if (!tutorials?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No tutorials available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tutorials.map(tutorial => (
        <TutorialCard key={tutorial.id} tutorial={tutorial} />
      ))}
    </div>
  );
}