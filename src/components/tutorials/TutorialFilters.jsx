import React from 'react';

const SKILL_LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function TutorialFilters({ activeSkillLevel, onSkillLevelChange }) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        {SKILL_LEVELS.map(level => (
          <button
            key={level}
            onClick={() => onSkillLevelChange(level)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeSkillLevel === level
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}