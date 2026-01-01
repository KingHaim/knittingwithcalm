import React from 'react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import CouponEngine from '../../components/admin/CouponEngine';

export default function Discounts() {
    const { user } = useAuth();

    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100 text-center">
                    <h1 className="text-2xl font-bold mb-2">Admin Access Required</h1>
                    <p className="text-gray-500">Sign in to manage marketing coupons.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-primary mb-8 text-gray-900 leading-tight">Coupon Engine (Marketing)</h1>
            <CouponEngine />
        </div>
    );
}
