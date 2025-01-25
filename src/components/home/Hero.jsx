import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-primary mb-6">
            Beautiful Knitting Patterns for Every Skill Level
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover modern designs and start your next knitting project today
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/shop"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Browse Patterns
            </Link>
            <Link
              to="/tutorials"
              className="px-8 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Watch Tutorials
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}