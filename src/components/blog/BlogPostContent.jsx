import React from 'react';

export default function BlogPostContent({ html, className = '' }) {
  if (!html) return null;

  return (
    <div
      className={`blog-content ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
