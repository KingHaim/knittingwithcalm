import React from 'react';
import { Link } from 'react-router-dom';
import closeupImage from "../../assets/closeup.jpg";

export default function Hero() {
  return (
    <section 
      className="relative py-20 bg-cover bg-center" 
      style={{ 
        backgroundImage: `url(${closeupImage})`,
      }}
    >
      {/* Add an overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/30" /> {/* This creates a semi-transparent dark overlay */}
      
      <div className="container mx-auto px-4 relative"> {/* relative ensures this stays above the overlay */}
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-primary mb-6 text-white"> {/* Changed to white text */}
            Beautiful Knitting Patterns for Every Skill Level
          </h1>
          <p className="text-xl text-gray-100 mb-8"> {/* Lightened text color */}
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