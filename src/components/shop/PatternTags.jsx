import React from 'react';

export default function PatternTags({ categories = [], yarnWeight, size }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {categories && categories.length > 0 && categories.map(cat => (
        <span key={cat} className="text-[10px] uppercase tracking-wider font-bold bg-gray-50 text-gray-500 px-2 py-0.5 rounded-md border border-gray-100">
          {cat}
        </span>
      ))}
      {yarnWeight && (
        <span className="text-[10px] uppercase font-bold bg-primary/5 text-primary px-2 py-0.5 rounded-md border border-primary/10">
          {yarnWeight}
        </span>
      )}
      {size && (
        <span className="text-[10px] uppercase font-bold bg-secondary/5 text-secondary px-2 py-0.5 rounded-md border border-secondary/10">
          {size}
        </span>
      )}
    </div>
  );
}