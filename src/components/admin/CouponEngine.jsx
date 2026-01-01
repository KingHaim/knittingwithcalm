import React, { useState, useEffect } from 'react';
import { couponService } from '../../services/couponService';
import { patternService } from '../../services/patternService';
import Button from '../ui/Button';
import {
    Plus, Trash2, Tag, Percent, Calendar,
    Users, CheckCircle2, ChevronDown, ChevronUp,
    Package, Layout
} from 'lucide-react';

export default function CouponEngine() {
    const [coupons, setCoupons] = useState([]);
    const [patterns, setPatterns] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [formData, setFormData] = useState({
        code: '',
        type: 'percentage',
        value: '',
        applies_to: 'all',
        applicable_pattern_ids: [],
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
        usage_limit: ''
    });

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setIsLoading(true);
        try {
            const [couponsData, patternsData] = await Promise.all([
                couponService.getCoupons(),
                patternService.getPatterns()
            ]);
            setCoupons(couponsData);
            setPatterns(patternsData);
        } catch (err) {
            setError('Error loading data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Validate data
            if (!formData.code || !formData.value) throw new Error('Code and Value are required');

            const payload = {
                ...formData,
                code: formData.code.toUpperCase().replace(/\s/g, ''),
                value: parseFloat(formData.value),
                usage_limit: formData.usage_limit ? parseInt(formData.usage_limit) : null,
                end_date: formData.end_date || null
            };

            await couponService.createCoupon(payload);
            setSuccess('Coupon created successfully!');
            setShowForm(false);
            setFormData({
                code: '',
                type: 'percentage',
                value: '',
                applies_to: 'all',
                applicable_pattern_ids: [],
                start_date: new Date().toISOString().split('T')[0],
                end_date: '',
                usage_limit: ''
            });
            fetchInitialData();
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err.message || 'Error creating coupon');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this coupon?')) {
            try {
                await couponService.deleteCoupon(id);
                fetchInitialData();
            } catch (err) {
                setError('Error deleting coupon');
            }
        }
    };

    const togglePatternSelection = (id) => {
        setFormData(prev => ({
            ...prev,
            applicable_pattern_ids: prev.applicable_pattern_ids.includes(id)
                ? prev.applicable_pattern_ids.filter(pid => pid !== id)
                : [...prev.applicable_pattern_ids, id]
        }));
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header with New Button */}
            {!showForm && (
                <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Active Coupons</h2>
                        <p className="text-gray-500 text-sm">Manage your marketing discounts and promotions</p>
                    </div>
                    <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
                        <Plus size={20} /> Create Coupon
                    </Button>
                </div>
            )}

            {/* Form Section */}
            {showForm && (
                <div className="bg-white p-8 rounded-2xl border border-primary/20 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-primary text-gray-900">New Marketing Coupon</h2>
                        <button
                            onClick={() => setShowForm(false)}
                            className="text-gray-400 hover:text-gray-600 p-2"
                        >
                            Cancel
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Code */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                    Coupon Code
                                </label>
                                <div className="relative">
                                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none text-lg font-bold tracking-widest placeholder:text-gray-300"
                                        placeholder="EX: SUMMER25"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Value & Type */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                        Type
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                    >
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="fixed">Fixed Amount (€)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                        Value
                                    </label>
                                    <div className="relative">
                                        {formData.type === 'percentage' ? (
                                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        ) : (
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">€</span>
                                        )}
                                        <input
                                            type="number"
                                            value={formData.value}
                                            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                            placeholder="20"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Applies To */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                                    Applies To
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, applies_to: 'all' })}
                                        className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${formData.applies_to === 'all'
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                                            }`}
                                    >
                                        <Layout size={20} />
                                        <span className="font-bold">Entire Cart</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, applies_to: 'specific' })}
                                        className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${formData.applies_to === 'specific'
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                                            }`}
                                    >
                                        <Package size={20} />
                                        <span className="font-bold">Specific Products</span>
                                    </button>
                                </div>

                                {formData.applies_to === 'specific' && (
                                    <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-100 max-h-60 overflow-y-auto">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {patterns.map(pattern => (
                                                <div
                                                    key={pattern.id}
                                                    onClick={() => togglePatternSelection(pattern.id)}
                                                    className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center gap-2 ${formData.applicable_pattern_ids.includes(pattern.id)
                                                            ? 'bg-white border-primary shadow-sm text-primary'
                                                            : 'bg-white/50 border-transparent text-gray-500 grayscale opacity-60'
                                                        }`}
                                                >
                                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.applicable_pattern_ids.includes(pattern.id) ? 'bg-primary border-primary' : 'border-gray-300'
                                                        }`}>
                                                        {formData.applicable_pattern_ids.includes(pattern.id) && <CheckCircle2 size={10} className="text-white" />}
                                                    </div>
                                                    <span className="text-sm font-medium truncate">{pattern.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Validity Dates */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                    Start Date
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="date"
                                        value={formData.start_date}
                                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                    End Date (Optional)
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="date"
                                        value={formData.end_date}
                                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                    />
                                </div>
                            </div>

                            {/* Usage Limit */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                    Usage Limit (Optional)
                                </label>
                                <div className="relative">
                                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="number"
                                        value={formData.usage_limit}
                                        onChange={(e) => setFormData({ ...formData, usage_limit: e.target.value })}
                                        placeholder="EX: 50"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-6 border-t border-gray-100">
                            <Button type="submit" disabled={isLoading} className="px-12 py-4 text-lg">
                                {isLoading ? 'Creating...' : 'Launch Coupon'}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* List Section */}
            {!showForm && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coupons.map((coupon) => (
                        <div key={coupon.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                            {/* Decorative Background */}
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="px-4 py-1.5 bg-primary/10 text-primary font-bold tracking-widest rounded-full text-sm">
                                        {coupon.code}
                                    </div>
                                    <button
                                        onClick={() => handleDelete(coupon.id)}
                                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <div className="mb-6">
                                    <div className="text-3xl font-black text-gray-900 mb-1">
                                        {coupon.type === 'percentage' ? `${coupon.value}%` : `${coupon.value}€`}
                                    </div>
                                    <div className="text-sm font-medium text-gray-500 uppercase tracking-tighter">
                                        OFF on {coupon.applies_to === 'all' ? 'entire cart' : `${coupon.applicable_pattern_ids?.length || 0} products`}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase">Usage</span>
                                        <span className="text-sm font-bold text-gray-700">
                                            {coupon.used_count || 0} / {coupon.usage_limit || '∞'}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase">Valid Until</span>
                                        <span className="text-sm font-bold text-gray-700">
                                            {coupon.end_date ? new Date(coupon.end_date).toLocaleDateString() : 'Indefinite'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {coupons.length === 0 && !isLoading && (
                        <div className="col-span-full py-20 bg-gray-50/50 border-2 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center text-center">
                            <Tag className="text-gray-200 mb-4" size={48} />
                            <h3 className="text-lg font-bold text-gray-400">No active coupons</h3>
                            <p className="text-gray-400 text-sm">Launch a new promotion to boost your sales</p>
                        </div>
                    )}
                </div>
            )}

            {/* Error/Success Toast */}
            {(error || success) && (
                <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl shadow-2xl z-50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300 ${error ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
                    }`}>
                    {error ? <Trash2 size={20} /> : <CheckCircle2 size={20} />}
                    <span className="font-bold">{error || success}</span>
                </div>
            )}
        </div>
    );
}
