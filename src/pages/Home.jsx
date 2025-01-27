import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedPatterns from '../components/home/FeaturedPatterns';
import Newsletter from '../components/home/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedPatterns />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl mb-8 text-center">Latest from the Blog</h2>
          {/* Blog posts grid will go here */}
        </div>
      </section>
      <Newsletter />
    </>
  );
}