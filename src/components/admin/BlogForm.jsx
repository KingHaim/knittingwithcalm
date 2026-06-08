import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import BlogHtmlEditor from './BlogHtmlEditor';
import BlogFeaturedImage from './BlogFeaturedImage';
import BlogPostPreview from './BlogPostPreview';

const initialForm = {
  title: '',
  excerpt: '',
  content: '',
  author: '',
  read_time: '',
  image: '',
  category: '',
  tags: [],
};

export default function BlogForm({ post, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState(initialForm);
  const [tagsInput, setTagsInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        author: post.author || '',
        read_time: post.readTime || post.read_time || '',
        image: post.image || '',
        category: post.category || '',
        tags: Array.isArray(post.tags) ? post.tags : [],
      });
      setTagsInput(Array.isArray(post.tags) ? post.tags.join(', ') : '');
      setImageFile(null);
      setImagePreview('');
    } else {
      setFormData(initialForm);
      setTagsInput('');
      setImageFile(null);
      setImagePreview('');
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildPayload = () => {
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    return { ...formData, tags, imageFile };
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handlePublish = () => {
    onSubmit(buildPayload());
    setShowPreview(false);
  };

  const handleFeaturedImageChange = ({ file, preview }) => {
    setImageFile(file);
    setImagePreview(preview);
    setFormData((prev) => ({ ...prev, image: preview }));
  };

  const handleFeaturedImageClear = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData((prev) => ({ ...prev, image: '' }));
  };

  const previewPost = {
    ...buildPayload(),
    imagePreview: imagePreview || formData.image,
    date: post?.date,
  };

  const fieldClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500';

  return (
    <>
      <form onSubmit={handlePreview} className="w-full bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={fieldClass}
              placeholder="Post title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={2}
              className={fieldClass}
              placeholder="Short summary shown on the blog listing card"
            />
          </div>
        </div>

        <BlogHtmlEditor
          value={formData.content}
          onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-gray-100">
          <BlogFeaturedImage
            value={formData.image}
            previewUrl={imagePreview}
            onChange={handleFeaturedImageChange}
            onClear={handleFeaturedImageClear}
          />

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className={fieldClass}
                placeholder="Author name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Read time</label>
              <input
                type="text"
                name="read_time"
                value={formData.read_time}
                onChange={handleChange}
                className={fieldClass}
                placeholder="e.g. 5 min"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={fieldClass}
                placeholder="e.g. Techniques"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className={fieldClass}
                placeholder="e.g. colorwork, fair isle"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-indigo-200 text-indigo-700 rounded-lg hover:bg-indigo-50"
          >
            <Eye size={18} />
            Preview
          </button>
          <button
            type="button"
            onClick={() => onSubmit(buildPayload())}
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? 'Saving…' : post ? 'Update Post' : 'Publish'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>

      {showPreview && (
        <BlogPostPreview
          post={previewPost}
          onClose={() => setShowPreview(false)}
          onPublish={handlePublish}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
