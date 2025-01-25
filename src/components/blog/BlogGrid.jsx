import React from 'react';
import BlogCard from './BlogCard';

export default function BlogGrid({ posts }) {
  if (!posts?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No blog posts available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}