import React from 'react';

export default function PatternDetails({ title, price }) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 mt-1">
        {price?.toFixed(2) || '0.00'}€
      </p>
    </div>
  );
}