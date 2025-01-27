import React from 'react';
import { Link } from 'react-router-dom';
import { usePatterns } from '../../hooks/usePatterns';

export default function FeaturedPatterns() {
  const { data: patterns, isLoading } = usePatterns();

  const featuredPatterns = patterns?.slice(0, 3) || [];

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-primary mb-8 text-center">Featured Patterns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="w-full h-64 bg-gray-200" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-primary mb-8 text-center">Featured Patterns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPatterns.map(pattern => (
            <Link key={pattern.id} to={`/shop/pattern/${pattern.id}`} className="group">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img 
                  src={pattern.image} 
                  alt={pattern.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium mb-2">{pattern.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-600">${pattern.price}</span>
                    <span className="text-sm text-gray-500">{pattern.difficulty}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}