import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import Button from '../../components/ui/Button';
import ProductForm from '../../components/admin/ProductForm';
import { patternService } from '../../services/patternService';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';

export default function AdminPatterns() {
  const { user } = useAuth();
  const [patterns, setPatterns] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPattern, setEditingPattern] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatterns();
  }, []);

  const fetchPatterns = async () => {
    try {
      const data = await patternService.getPatterns();
      setPatterns(data);
    } catch (err) {
      setError(`Error loading patterns: ${err.message || 'Unknown error'}`);
      console.error('Supabase Error:', err);
    }
  };

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      if (editingPattern) {
        // Update logic: for now we use createPattern which we'll enhance to handle update
        await patternService.createPattern({ ...formData, id: editingPattern.id });
      } else {
        await patternService.createPattern(formData);
      }
      setShowForm(false);
      setEditingPattern(null);
      fetchPatterns();
    } catch (err) {
      setError(`Error saving: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (pattern) => {
    if (window.confirm('¿Are you sure you want to delete this pattern?')) {
      try {
        await patternService.deletePattern(pattern.id, pattern.pdf_url, pattern.images, pattern.pdf_files);
        fetchPatterns();
      } catch (err) {
        setError('Error deleting pattern');
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Admin Access Required</h1>
          <p className="text-gray-600">Please sign in to access the patterns management.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-primary">Manage Patterns</h1>
          <p className="text-gray-600">Upload and manage your shop products</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
            <Plus size={20} /> New Pattern
          </Button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {showForm ? (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {editingPattern ? 'Edit Pattern' : 'Add New Pattern'}
            </h2>
          </div>
          <ProductForm
            initialData={editingPattern}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditingPattern(null); }}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {patterns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No patterns added yet</p>
              <Button onClick={() => setShowForm(true)} variant="secondary">
                Add your first pattern
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-bottom border-gray-100">
                    <th className="px-6 py-4 font-semibold text-gray-700">Product</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Level</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Price</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {patterns.map((pattern) => (
                    <tr key={pattern.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={pattern.main_image || pattern.images?.[0]}
                              alt={pattern.title}
                              className="w-12 h-12 rounded object-cover border border-gray-200"
                            />
                            {pattern.status === 'draft' && (
                              <span className="absolute -top-1 -left-1 bg-amber-100 text-amber-700 text-[8px] font-bold px-1 rounded border border-amber-200">
                                DRAFT
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{pattern.title}</div>
                            <div className="text-xs text-gray-500">
                              {pattern.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {pattern.difficulty_level || pattern.skill_level}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {pattern.price}€
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 text-gray-400 hover:text-primary transition-colors"
                            title="Edit"
                            onClick={() => { setEditingPattern(pattern); setShowForm(true); }}
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete"
                            onClick={() => handleDelete(pattern)}
                          >
                            <Trash2 size={18} />
                          </button>
                          {pattern.pdf_files && pattern.pdf_files.length > 0 ? (
                            pattern.pdf_files.map((pdf, idx) => (
                              <a
                                key={idx}
                                href={pdf.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-400 hover:text-primary transition-colors flex flex-col items-center"
                                title={`View PDF (${pdf.language})`}
                              >
                                <ExternalLink size={14} />
                                <span className="text-[8px] font-bold uppercase">{pdf.language.substring(0, 2)}</span>
                              </a>
                            ))
                          ) : pattern.pdf_url && (
                            <a
                              href={pattern.pdf_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                              title="View PDF (Legacy)"
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}