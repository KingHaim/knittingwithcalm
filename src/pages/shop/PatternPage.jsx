import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { patternService } from '../../services/patternService';
import { useCart } from '../../stores/cartStore';
import Button from '../../components/ui/Button';
import PatternTags from '../../components/shop/PatternTags';
import { ChevronLeft, ShoppingCart, Check, Info, Ruler, Scissors } from 'lucide-react';

export default function PatternPage() {
    const { slug } = useParams();
    const [pattern, setPattern] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');
    const { addItem, items } = useCart();

    useEffect(() => {
        async function loadPattern() {
            try {
                const data = await patternService.getPatternBySlug(slug);
                setPattern(data);
                setSelectedImage(data.main_image || data.images?.[0]);
            } catch (error) {
                console.error('Error loading pattern:', error);
            } finally {
                setLoading(false);
            }
        }
        loadPattern();
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    if (!pattern) return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-2xl font-bold mb-4">Pattern not found</h1>
            <Link to="/shop" className="text-primary hover:underline flex items-center justify-center gap-2">
                <ChevronLeft size={20} /> Back to shop
            </Link>
        </div>
    );

    const isInCart = items.some(item => item.id === pattern.id);

    return (
        <div className="bg-white min-h-screen pb-20">
            <div className="container mx-auto px-4 py-8">
                <Link to="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8 group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Gallery Section */}
                    <div className="space-y-4">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-gray-100 bg-gray-50">
                            <img
                                src={selectedImage}
                                alt={pattern.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {pattern.images && pattern.images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {pattern.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-primary ring-2 ring-primary/10' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                    >
                                        <img src={img} className="w-full h-full object-cover" alt={`Preview ${idx}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <PatternTags categories={pattern.categories} yarnWeight={pattern.yarn_weight} size={pattern.size_tag} />
                            <h1 className="text-4xl lg:text-5xl font-primary mt-4 mb-2">{pattern.title}</h1>
                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-bold text-gray-900">{pattern.price}€</span>
                                {pattern.previous_price && (
                                    <span className="text-xl text-gray-400 line-through">{pattern.previous_price}€</span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Action */}
                            <Button
                                onClick={() => addItem(pattern)}
                                className="w-full py-4 text-lg rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-primary/20"
                                disabled={isInCart}
                                variant={isInCart ? 'secondary' : 'primary'}
                            >
                                {isInCart ? (
                                    <>
                                        <Check size={24} /> In Cart
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={24} /> Add to Cart
                                    </>
                                )}
                            </Button>

                            {/* Description */}
                            <div className="prose prose-stone max-w-none">
                                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                                    <Info size={18} className="text-primary" />
                                    About this pattern
                                </h3>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                    {pattern.description}
                                </p>
                            </div>

                            {/* Specs Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-2xl p-4">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Scissors size={14} /> Materials
                                    </h4>
                                    <div className="space-y-2">
                                        {pattern.materials?.yarn && (
                                            <p className="text-sm"><strong>Yarn:</strong> {pattern.materials.yarn}</p>
                                        )}
                                        {pattern.materials?.needles && (
                                            <p className="text-sm"><strong>Needles:</strong> {pattern.materials.needles}</p>
                                        )}
                                        {pattern.materials?.other?.length > 0 && (
                                            <ul className="text-sm list-disc list-inside">
                                                {pattern.materials.other.map((m, i) => (
                                                    <li key={i}>{m}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-4">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <Ruler size={14} /> Technical Details
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <p><strong>Level:</strong> {pattern.difficulty_level || pattern.skill_level}</p>
                                        <p><strong>Yarn Weight:</strong> {pattern.yarn_weight}</p>
                                        <p><strong>Languages:</strong> {pattern.languages?.join(', ')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
