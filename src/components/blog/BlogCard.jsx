import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateFormatter';

export default function BlogCard({ post }) {
  const { id, title, excerpt, author, date, readTime, image, category, tags } = post;

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/blog/${id}`}>
        <div className="aspect-[16/9]">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span>{formatDate(date)}</span>
          <span>•</span>
          <span>{readTime} read</span>
        </div>

        <Link to={`/blog/${id}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-indigo-600 transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4">{excerpt}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-indigo-600">{category}</span>
          <span className="text-sm text-gray-600">By {author}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map(tag => (
            <Link
              key={tag}
              to={`/blog/tag/${tag}`}
              className="text-sm bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}