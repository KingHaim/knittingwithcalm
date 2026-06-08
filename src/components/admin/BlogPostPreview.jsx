import React from 'react';
import { X } from 'lucide-react';
import BlogPostContent from '../blog/BlogPostContent';
import { formatDate } from '../../utils/dateFormatter';

export default function BlogPostPreview({ post, onClose, onPublish, isLoading }) {
  const previewDate = post.date || new Date().toISOString();
  const imageUrl = post.imagePreview || post.image;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:p-8">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl my-4">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-gray-200 bg-white/95 backdrop-blur px-6 py-4 rounded-t-2xl">
          <div>
            <p className="text-xs uppercase tracking-wider text-indigo-600 font-medium">Preview</p>
            <p className="text-sm text-gray-500">This is how your post will appear on the blog</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPublish}
              disabled={isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 text-sm font-medium"
            >
              {isLoading ? 'Publishing…' : 'Publish'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              title="Close preview"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <article className="px-6 py-8 sm:px-10">
          {imageUrl && (
            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-8">
              <img
                src={imageUrl}
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
              <span>•</span>
              <span>{formatDate(previewDate)}</span>
              {post.read_time && (
                <>
                  <span>•</span>
                  <span>{post.read_time} read</span>
                </>
              )}
              {post.author && (
                <>
                  <span>•</span>
                  <span>By {post.author}</span>
                </>
              )}
            </div>

            <h1 className="text-4xl font-primary mb-4">{post.title || 'Untitled post'}</h1>

            {post.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed">{post.excerpt}</p>
            )}
          </header>

          <BlogPostContent html={post.content} />

          {post.tags?.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
