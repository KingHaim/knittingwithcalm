import React, { useState } from 'react';
import Button from '../ui/Button';
import FileUploadManager from './FileUploadManager';
import { Plus, Trash2, Eye, EyeOff, Save, X as CloseIcon } from 'lucide-react';

const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const YARN_WEIGHTS = ['Lace', 'Fingering', 'Sport', 'DK', 'Worsted', 'Aran', 'Bulky', 'Super Bulky'];
const CATEGORIES = ['Baby', 'Kids', 'Women', 'Men', 'Accessories'];
const LANGUAGES = ['Spanish', 'English', 'French', 'German', 'Italian'];

export default function ProductForm({ initialData, onSubmit, onCancel, isLoading }) {
    const data = initialData || {};
    const [formData, setFormData] = useState({
        title: data.title || '',
        slug: data.slug || '',
        description: data.description || '',
        price: data.price || '',
        previous_price: data.previous_price || '',
        status: data.status || 'draft',
        difficulty_level: data.difficulty_level || DIFFICULTY_LEVELS[0],
        yarn_weight: data.yarn_weight || YARN_WEIGHTS[0],
        languages: (data.languages && data.languages.length > 0)
            ? data.languages.map(l => l === 'Español' ? 'Spanish' : l)
            : [LANGUAGES[1]], // Default to English (index 1)
        categories: data.categories || [],
        size_tag: data.size_tag || '',
        materials: data.materials || { yarn: '', needles: '', other: [] },
        video_url: data.video_url || '',
        images: data.images || [],
        main_image: data.main_image || '',
        pdf_files: data.pdf_files || []
    });

    const [images, setImages] = useState(data.images || []);
    const [mainImage, setMainImage] = useState(data.main_image || '');
    const [pdfFiles, setPdfFiles] = useState(data.pdf_files || []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            // Auto-generate slug from title if slug is empty or matches previous title slug
            if (name === 'title' && (!prev.slug || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))) {
                newData.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            }
            return newData;
        });
    };

    const handleCategoryToggle = (cat) => {
        setFormData(prev => {
            const cats = prev.categories.includes(cat)
                ? prev.categories.filter(c => c !== cat)
                : [...prev.categories, cat];
            return { ...prev, categories: cats };
        });
    };

    const handleLanguageToggle = (lang) => {
        setFormData(prev => {
            const langs = prev.languages.includes(lang)
                ? prev.languages.filter(l => l !== lang)
                : [...prev.languages, lang];
            // When removing a language, also remove associated PDF if any
            if (prev.languages.includes(lang)) {
                setPdfFiles(current => current.filter(p => p.language !== lang));
            }
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
        onSubmit({
            ...formData,
            images,
            main_image: mainImage || images[0], // Default to first image if none selected
            pdf_files: pdfFiles
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Visibility Status</span>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, status: 'draft' })}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all duration-300 ${formData.status === 'draft'
                                ? 'bg-amber-50 border-amber-500 text-amber-700 shadow-sm shadow-amber-200/50 scale-105'
                                : 'bg-white border-gray-100 text-gray-400 hover:border-amber-200 hover:text-amber-500'
                                }`}
                        >
                            <EyeOff size={18} className={formData.status === 'draft' ? 'animate-pulse' : ''} />
                            <span className="font-semibold text-sm">Draft</span>
                        </button>

                        <div className="w-8 h-[2px] bg-gray-100 rounded-full" />

                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, status: 'published' })}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all duration-300 ${formData.status === 'published'
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm shadow-emerald-200/50 scale-105'
                                : 'bg-white border-gray-100 text-gray-400 hover:border-emerald-200 hover:text-emerald-500'
                                }`}
                        >
                            <Eye size={18} className={formData.status === 'published' ? 'animate-bounce-subtle' : ''} />
                            <span className="font-semibold text-sm">Published</span>
                        </button>
                    </div>
                </div>

                <div className="hidden sm:block text-right">
                    <p className="text-xs text-gray-400 max-w-[200px] italic">
                        {formData.status === 'published'
                            ? "This product will be visible to all customers in the shop."
                            : "This product is hidden. You can keep editing until it's ready."}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Basic Info */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g.: Luxury Knit Snood"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Slug (URL)</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="luxury-knit-snood"
                                className="w-full px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (€)</label>
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
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Previous Price</label>
                            <input
                                type="number"
                                name="previous_price"
                                value={formData.previous_price}
                                onChange={handleChange}
                                step="0.01"
                                placeholder="e.g.: 10.00"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Size / Tag</label>
                            <input
                                type="text"
                                name="size_tag"
                                value={formData.size_tag}
                                onChange={handleChange}
                                placeholder="S-M-L or One Size"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty Level</label>
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
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Yarn Weight</label>
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
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Section / Categories</label>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => handleCategoryToggle(cat)}
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${formData.categories.includes(cat)
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-primary'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Selected Languages</label>
                        <p className="text-xs text-gray-500 mb-2">Select the languages to enable uploading their corresponding PDFs.</p>
                        <div className="flex flex-wrap gap-2">
                            {LANGUAGES.map(lang => (
                                <button
                                    key={lang}
                                    type="button"
                                    onClick={() => handleLanguageToggle(lang)}
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${formData.languages.includes(lang)
                                        ? 'bg-secondary text-white border-secondary'
                                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-secondary'
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
                        initialImages={images}
                        initialMainImage={mainImage}
                        initialPdfs={pdfFiles}
                        selectedLanguages={formData.languages}
                        onImagesChange={setImages}
                        onMainImageChange={setMainImage}
                        onPdfsChange={setPdfFiles}
                    />

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-700">Required Materials</h3>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Suggested Yarn</label>
                            <input
                                type="text"
                                name="materials_yarn"
                                value={formData.materials.yarn}
                                onChange={(e) => handleMaterialChange('yarn', e.target.value)}
                                placeholder="e.g.: 3 hanks of Merino Wool"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Needles</label>
                            <input
                                type="text"
                                value={formData.materials.needles}
                                onChange={(e) => handleMaterialChange('needles', e.target.value)}
                                placeholder="e.g.: 4.5mm circular needles"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs text-gray-500">Other Materials</label>
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
                                <Plus size={16} className="mr-1" /> Add another material
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Video Link (Optional)</label>
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
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Product'}
                </Button>
            </div>
        </form>
    );
}
