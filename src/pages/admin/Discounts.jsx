import React from 'react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import DiscountManager from '../../components/admin/DiscountManager';

export default function Discounts() {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-semibold">Admin Access Required</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-primary mb-8">Cupones y Descuentos</h1>
            <DiscountManager />
        </div>
    );
}
