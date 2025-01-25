import React from 'react';
import { Link } from 'react-router-dom';

export default function TutorialCard({ tutorial }) {
  const { id, title, description, duration, skillLevel, thumbnail, topics } = tutorial;

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-video relative">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
          {duration}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
            {skillLevel}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Topics covered:</h4>
          <div className="flex flex-wrap gap-2">
            {topics.map(topic => (
              <span 
                key={topic}
                className="text-sm bg-gray-100 px-2 py-1 rounded"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <Link 
          to={`/tutorials/${id}`}
          className="mt-4 inline-block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Watch Tutorial
        </Link>
      </div>
    </article>
  );
}