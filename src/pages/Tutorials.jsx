import React, { useState } from 'react';
import { useTutorials } from '../hooks/useTutorials';
import TutorialGrid from '../components/tutorials/TutorialGrid';
import TutorialFilters from '../components/tutorials/TutorialFilters';

export default function Tutorials() {
  const { data: tutorials, isLoading } = useTutorials();
  const [skillLevel, setSkillLevel] = useState('All');

  const filteredTutorials = tutorials?.filter(tutorial => 
    skillLevel === 'All' || tutorial.skillLevel === skillLevel
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg p-4">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="space-y-2">
                  {[1, 2].map(j => (
                    <div key={j} className="h-4 bg-gray-200 rounded w-2/3"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-primary mb-4">Video Tutorials</h1>
        <p className="text-gray-600">
          Learn knitting techniques with our step-by-step video guides
        </p>
      </div>

      <TutorialFilters
        activeSkillLevel={skillLevel}
        onSkillLevelChange={setSkillLevel}
      />

      <TutorialGrid tutorials={filteredTutorials} />
    </div>
  );
}