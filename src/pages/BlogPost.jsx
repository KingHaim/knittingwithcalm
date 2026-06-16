import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useBlogPost } from '../hooks/useBlogPost';
import BlogPostContent from '../components/blog/BlogPostContent';
import { formatDate } from '../utils/dateFormatter';

export default function BlogPost() {
  const { handle } = useParams();
  const { data: post, isLoading, isError } = useBlogPost(handle);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto animate-pulse space-y-6">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="aspect-[16/9] bg-gray-200 rounded-lg" />
          <div className="h-10 bg-gray-200 rounded w-3/4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold mb-4">Post not found</h1>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500"
        >
          <ChevronLeft size={20} />
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-8 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to blog
        </Link>

        {post.image && (
          <div className="aspect-[16/9] rounded-lg overflow-hidden mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
            {post.category && (
              <span className="text-indigo-600 font-medium">{post.category}</span>
            )}
            {post.date && (
              <>
                {post.category && <span>•</span>}
                <span>{formatDate(post.date)}</span>
              </>
            )}
            {post.readTime && (
              <>
                <span>•</span>
                <span>{post.readTime} read</span>
              </>
            )}
            {post.author && (
              <>
                <span>•</span>
                <span>By {post.author}</span>
              </>
            )}
          </div>

          <h1 className="text-4xl font-primary mb-4">{post.title}</h1>

          {post.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed">{post.excerpt}</p>
          )}
        </header>

        <BlogPostContent html={post.content} />

        {post.tags?.length > 0 && (
          <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog/tag/${tag}`}
                className="text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
