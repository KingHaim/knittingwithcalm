import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-primary mb-6">
            Beautiful & Modern Knitting Patterns
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create stunning knitwear with our carefully crafted patterns. 
            Perfect for beginners and experienced knitters alike.
          </p>
          <Link 
            to="/shop" 
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Browse Patterns
          </Link>
        </div>
      </div>
    </section>
  );
}