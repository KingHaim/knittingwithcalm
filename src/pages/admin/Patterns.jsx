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
      setError('Error charging patterns');
    }
  };

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      if (editingPattern) {
        // Update logic would go here
      } else {
        await patternService.createPattern(formData, formData.images, formData.pdf);
      }
      setShowForm(false);
      setEditingPattern(null);
      fetchPatterns();
    } catch (err) {
      setError('Error saving product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (pattern) => {
    if (window.confirm('¿Are you sure you want to delete this pattern?')) {
      try {
        await patternService.deletePattern(pattern.id);
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
          <h1 className="text-3xl font-primary">Administrar Patrones</h1>
          <p className="text-gray-600">Sube y gestiona tus productos del shop</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
            <Plus size={20} /> Nuevo Patrón
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
              {editingPattern ? 'Editar Patrón' : 'Añadir Nuevo Patrón'}
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
              <p className="text-gray-600 mb-4">No hay patrones añadidos todavía</p>
              <Button onClick={() => setShowForm(true)} variant="secondary">
                Añadir tu primer patrón
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-bottom border-gray-100">
                    <th className="px-6 py-4 font-semibold text-gray-700">Producto</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Nivel</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Precio</th>
                    <th className="px-6 py-4 font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {patterns.map((pattern) => (
                    <tr key={pattern.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={pattern.images?.[0]}
                            alt={pattern.title}
                            className="w-12 h-12 rounded object-cover border border-gray-200"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{pattern.title}</div>
                            <div className="text-xs text-gray-500">
                              {pattern.languages?.join(', ')}
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
                            title="Editar"
                            onClick={() => { setEditingPattern(pattern); setShowForm(true); }}
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="Eliminar"
                            onClick={() => handleDelete(pattern)}
                          >
                            <Trash2 size={18} />
                          </button>
                          {pattern.pdf_url && (
                            <a
                              href={pattern.pdf_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                              title="Ver PDF"
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