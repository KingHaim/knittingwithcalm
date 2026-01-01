import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import Button from '../ui/Button';
import { Plus, Trash2, Tag, Percent } from 'lucide-react';

export default function DiscountManager() {
    const [codes, setCodes] = useState([]);
    const [newCode, setNewCode] = useState({ code: '', discount_type: 'percentage', value: '', active: true });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCodes();
    }, []);

    const fetchCodes = async () => {
        const { data, error } = await supabase
            .from('discount_codes')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) setError('Error charging discount codes');
        else setCodes(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { error } = await supabase
                .from('discount_codes')
                .insert([newCode]);
            if (error) throw error;
            setNewCode({ code: '', discount_type: 'percentage', value: '', active: true });
            fetchCodes();
        } catch (err) {
            setError('Error creating discount code. Code might already exist.');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteCode = async (id) => {
        if (window.confirm('¿Eliminar este código?')) {
            const { error } = await supabase
                .from('discount_codes')
                .delete()
                .eq('id', id);
            if (error) setError('Error deleting code');
            else fetchCodes();
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Plus size={20} className="text-primary" /> Crear Nuevo Código
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
                        <input
                            type="text"
                            value={newCode.code}
                            onChange={(e) => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })}
                            placeholder="EJ: VERANO20"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                        <select
                            value={newCode.discount_type}
                            onChange={(e) => setNewCode({ ...newCode, discount_type: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        >
                            <option value="percentage">Porcentaje (%)</option>
                            <option value="fixed">Fijo (€)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                        <input
                            type="number"
                            value={newCode.value}
                            onChange={(e) => setNewCode({ ...newCode, value: e.target.value })}
                            placeholder="10"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            required
                        />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        Añadir Código
                    </Button>
                </form>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-6 py-4 font-semibold text-gray-700">Código</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Descuento</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {codes.map((code) => (
                            <tr key={code.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-primary">{code.code}</td>
                                <td className="px-6 py-4">
                                    {code.discount_type === 'percentage' ? (
                                        <span className="flex items-center gap-1 text-green-600 font-medium">
                                            <Percent size={14} /> {code.value}%
                                        </span>
                                    ) : (
                                        <span className="font-medium text-gray-900">{code.value}€</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => deleteCode(code.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {codes.length === 0 && (
                            <tr>
                                <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                                    No hay códigos de descuento activos
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
