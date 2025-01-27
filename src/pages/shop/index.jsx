import React from 'react';
import PatternGrid from '../../components/shop/PatternGrid';
import PatternFilters from '../../components/shop/PatternFilters';

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-primary mb-8">Shop Patterns</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64">
          <PatternFilters />
        </aside>
        <main className="flex-1">
          <PatternGrid />
        </main>
      </div>
    </div>
  );
} 