import React from 'react';

export default function PatternImage({ src, alt }) {
  return (
    <div className="aspect-square overflow-hidden">
      <img 
        src={src || '/images/pattern-placeholder.jpg'} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
    </div>
  );
}