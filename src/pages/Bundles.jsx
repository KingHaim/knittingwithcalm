import React from 'react';
import { useBundles } from '../hooks/useBundles';
import BundleGrid from '../components/bundles/BundleGrid';

export default function Bundles() {
  const { data: bundles, isLoading } = useBundles();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map(i => (
              <div key={i} className="bg-white rounded-lg p-6">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="space-y-2">
                  {[1, 2].map(j => (
                    <div key={j} className="h-4 bg-gray-200 rounded w-2/3"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-primary mb-4">Pattern Bundles</h1>
        <p className="text-gray-600">
          Save money with our carefully curated pattern collections
        </p>
      </div>
      <BundleGrid bundles={bundles} />
    </div>
  );
}