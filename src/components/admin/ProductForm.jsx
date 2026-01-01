import React, { useState } from 'react';
import Button from '../ui/Button';
import FileUploadManager from './FileUploadManager';
import { Plus, Trash2 } from 'lucide-react';

const DIFFICULTY_LEVELS = ['Principiante', 'Intermedio', 'Avanzado', 'Experto'];
const YARN_WEIGHTS = ['Lace', 'Fingering', 'Sport', 'DK', 'Worsted', 'Aran', 'Bulky', 'Super Bulky'];
const LANGUAGES = ['Español', 'English', 'Français', 'Deutsch', 'Italiano'];

export default function ProductForm({ initialData, onSubmit, onCancel, isLoading }) {
    const data = initialData || {};
    const [formData, setFormData] = useState({
        title: data.title || '',
        description: data.description || '',
        price: data.price || '',
        difficulty_level: data.difficulty_level || DIFFICULTY_LEVELS[0],
        yarn_weight: data.yarn_weight || YARN_WEIGHTS[0],
        languages: data.languages || [LANGUAGES[0]],
        materials: data.materials || { yarn: '', needles: '', other: [] },
        video_url: data.video_url || '',
        category: data.category || 'Patterns',
        ...data
    });

    const [images, setImages] = useState([]);
    const [pdf, setPdf] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLanguageToggle = (lang) => {
        setFormData(prev => {
            const langs = prev.languages.includes(lang)
                ? prev.languages.filter(l => l !== lang)
                : [...prev.languages, lang];
            return { ...prev, languages: langs };
        });
    };

    const handleMaterialChange = (field, value, index = null) => {
        setFormData(prev => {
            if (index !== null) {
                const others = [...prev.materials.other];
                others[index] = value;
                return { ...prev, materials: { ...prev.materials, other: others } };
            }
            return { ...prev, materials: { ...prev.materials, [field]: value } };
        });
    };

    const addOtherMaterial = () => {
        setFormData(prev => ({
            ...prev,
            materials: { ...prev.materials, other: [...prev.materials.other, ''] }
        }));
    };

    const removeOtherMaterial = (index) => {
        setFormData(prev => ({
            ...prev,
            materials: {
                ...prev.materials,
                other: prev.materials.other.filter((_, i) => i !== index)
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, images, pdf });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Basic Info */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Título del Producto</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Ej: Cardigan Serena"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Precio (€)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                step="0.01"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Nivel de Dificultad</label>
                            <select
                                name="difficulty_level"
                                value={formData.difficulty_level}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            >
                                {DIFFICULTY_LEVELS.map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Grosor de Lana</label>
                        <select
                            name="yarn_weight"
                            value={formData.yarn_weight}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        >
                            {YARN_WEIGHTS.map(weight => (
                                <option key={weight} value={weight}>{weight}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Idiomas Disponibles</label>
                        <div className="flex flex-wrap gap-2">
                            {LANGUAGES.map(lang => (
                                <button
                                    key={lang}
                                    type="button"
                                    onClick={() => handleLanguageToggle(lang)}
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${formData.languages.includes(lang)
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-primary'
                                        }`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Files & Materials */}
                <div className="space-y-6">
                    <FileUploadManager
                        onImagesChange={setImages}
                        onPdfChange={setPdf}
                    />

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-700">Materiales Necesarios</h3>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Lana Sugerida</label>
                            <input
                                type="text"
                                value={formData.materials.yarn}
                                onChange={(e) => handleMaterialChange('yarn', e.target.value)}
                                placeholder="Ej: 3 ovillos de Lana Merino"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Agujas</label>
                            <input
                                type="text"
                                value={formData.materials.needles}
                                onChange={(e) => handleMaterialChange('needles', e.target.value)}
                                placeholder="Ej: Agujas circulares 4.5mm"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs text-gray-500">Otros Materiales</label>
                            {formData.materials.other.map((item, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => handleMaterialChange('other', e.target.value, index)}
                                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeOtherMaterial(index)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addOtherMaterial}
                                className="flex items-center text-primary text-sm font-medium hover:underline"
                            >
                                <Plus size={16} className="mr-1" /> Añadir otro material
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Link de Video (Opcional)</label>
                        <input
                            type="url"
                            name="video_url"
                            value={formData.video_url}
                            onChange={handleChange}
                            placeholder="https://youtube.com/..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
                <Button variant="secondary" onClick={onCancel} type="button">
                    Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Guardando...' : 'Guardar Producto'}
                </Button>
            </div>
        </form>
    );
}
