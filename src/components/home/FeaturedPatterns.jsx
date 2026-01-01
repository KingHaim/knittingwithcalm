import React from 'react';
import { Link } from 'react-router-dom';
import { usePatterns } from '../../hooks/usePatterns';

export default function FeaturedPatterns() {
  const { data: patterns, isLoading } = usePatterns();

  const featuredPatterns = patterns?.filter(p => p.status === 'published').slice(0, 3) || [];

  if (isLoading) {
    return (
      <section className="py-24 bg-gray-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-primary mb-4">Featured Patterns</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-3xl shadow-sm overflow-hidden aspect-[4/5] bg-gray-100" />
                <div className="mt-6 space-y-3">
                  <div className="h-6 bg-gray-100 rounded-full w-3/4" />
                  <div className="h-4 bg-gray-100 rounded-full w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50/30">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-primary mb-4 text-gray-900">Featured Patterns</h2>
          <p className="text-gray-500 mb-6">Discover our most loved designs, perfect for your next project.</p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-30" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredPatterns.map(pattern => {
            const image = pattern.main_image || pattern.images?.[0] || pattern.image;
            const slug = pattern.slug || pattern.id;

            return (
              <Link key={pattern.id} to={`/shop/${slug}`} className="group flex flex-col">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-700 bg-white">
                  <img
                    src={image}
                    alt={pattern.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="mt-8 px-2 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">{pattern.title}</h3>
                    <p className="text-sm text-gray-400 font-medium uppercase tracking-widest">{pattern.difficulty_level || pattern.skill_level || 'Intermediate'}</p>
                  </div>
                  <span className="text-2xl font-black text-gray-900">{pattern.price}€</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}