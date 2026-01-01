import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import SignInForm from '../../features/auth/components/SignInForm';
import { Lock, Tag } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-amber-600" size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-gray-900">Admin Access Required</h1>
          <p className="text-gray-500 mb-8">Please sign in with your administrator credentials to access the dashboard.</p>
          <div className="text-left bg-gray-50/50 p-6 rounded-xl border border-gray-50">
            <SignInForm />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-primary mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/patterns"
          className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Patterns</h2>
          <p className="text-gray-600">Manage knitting patterns</p>
        </Link>

        <Link
          to="/admin/bundles"
          className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Bundles</h2>
          <p className="text-gray-600">Create and edit pattern bundles</p>
        </Link>

        <Link
          to="/admin/tutorials"
          className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Tutorials</h2>
          <p className="text-gray-600">Manage video tutorials</p>
        </Link>

        <Link
          to="/admin/discounts"
          className="p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-50 group"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
            <Tag size={24} />
          </div>
          <h2 className="text-xl font-bold mb-1 text-gray-900 tracking-tight">Coupon Engine</h2>
          <p className="text-gray-500 text-sm">Marketing, discounts and product offers</p>
        </Link>
      </div>
    </div>
  );
}