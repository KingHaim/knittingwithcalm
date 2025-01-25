import React from 'react';
import BundleCard from './BundleCard';

export default function BundleGrid({ bundles }) {
  if (!bundles?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No bundles available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {bundles.map(bundle => (
        <BundleCard key={bundle.id} bundle={bundle} />
      ))}
    </div>
  );
}