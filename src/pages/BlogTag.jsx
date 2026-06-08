import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useBlogPosts } from '../hooks/useBlogPosts';
import BlogGrid from '../components/blog/BlogGrid';

export default function BlogTag() {
  const { tag } = useParams();
  const { data: posts, isLoading } = useBlogPosts();

  const filteredPosts = posts?.filter((post) =>
    post.tags?.some((t) => t.toLowerCase() === tag?.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-4">
                <div className="aspect-[16/9] bg-gray-200 rounded mb-4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
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
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-8 group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to blog
      </Link>

      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-primary mb-4">#{tag}</h1>
        <p className="text-gray-600">
          {filteredPosts?.length
            ? `${filteredPosts.length} post${filteredPosts.length === 1 ? '' : 's'} tagged with "${tag}"`
            : `No posts tagged with "${tag}"`}
        </p>
      </div>

      <BlogGrid posts={filteredPosts} />
    </div>
  );
}
