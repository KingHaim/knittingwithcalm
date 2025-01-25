import React from 'react';

export default function PatternTags({ category, yarnWeight }) {
  return (
    <div className="flex gap-2 mt-2">
      {category && (
        <span className="text-sm bg-gray-100 px-2 py-1 rounded">
          {category}
        </span>
      )}
      {yarnWeight && (
        <span className="text-sm bg-gray-100 px-2 py-1 rounded">
          {yarnWeight}
        </span>
      )}
    </div>
  );
}