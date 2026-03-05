import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import Button from '../../components/ui/Button';
import BlogForm from '../../components/admin/BlogForm';
import { blogService } from '../../services/blogService';
import { Plus, Edit2, Trash2, Lock } from 'lucide-react';
import SignInForm from '../../features/auth/components/SignInForm';

export default function AdminBlog() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await blogService.getPosts();
      setPosts(data);
    } catch (err) {
      setError(err?.message || 'Failed to load blog posts');
      console.error(err);
    }
  };

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      if (editingPost) {
        await blogService.updatePost(editingPost.id, formData);
      } else {
        await blogService.createPost(formData);
      }
      setShowForm(false);
      setEditingPost(null);
      fetchPosts();
    } catch (err) {
      setError(err?.message || 'Failed to save post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (post) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await blogService.deletePost(post.id);
      fetchPosts();
      if (editingPost?.id === post.id) {
        setEditingPost(null);
        setShowForm(false);
      }
    } catch (err) {
      setError(err?.message || 'Failed to delete post');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-amber-600" size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-gray-900">Admin Access Required</h1>
          <p className="text-gray-500 mb-8">Please sign in to manage the blog.</p>
          <div className="text-left bg-gray-50/50 p-6 rounded-xl border border-gray-50">
            <SignInForm />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-primary">Manage Blog</h1>
          <p className="text-gray-600">Add and edit blog posts</p>
        </div>
        {!showForm && (
          <Button
            onClick={() => {
              setEditingPost(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2"
          >
            <Plus size={20} /> Add Post
          </Button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {showForm ? (
        <div className="max-w-2xl">
          <BlogForm
            post={editingPost}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-600 mb-4">No blog posts yet</p>
          <Button onClick={() => setShowForm(true)}>Add Your First Post</Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {posts.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-4 p-4 hover:bg-gray-50">
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-gray-900 truncate">{p.title}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {p.category && `${p.category} · `}
                    {p.date && new Date(p.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPost(p);
                      setShowForm(true);
                    }}
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
