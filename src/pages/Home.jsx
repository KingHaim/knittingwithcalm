import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedPatterns from '../components/home/FeaturedPatterns';

export default function Home() {
  return (
    <div>
      <Hero />
      
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-primary mb-8 text-center">Featured Patterns</h2>
        <FeaturedPatterns />
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-primary mb-4">Join Our Newsletter</h2>
          <p className="text-gray-600 mb-6">Get updates on new patterns and exclusive offers</p>
          <form className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}