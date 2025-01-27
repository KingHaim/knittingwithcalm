import React from 'react';

export function PatternFilters() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
            />
            Sweaters
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Difficulty</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
            />
            Beginner
          </label>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <div className="space-y-2">
          <div>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue={100}
              className="w-full"
            />
            <div className="text-sm text-gray-600">
              €0 - €100
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 