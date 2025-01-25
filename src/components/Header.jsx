import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../stores/cartStore';
import { useAuth } from '../features/auth/hooks/useAuth';

export default function Header() {
  const cartCount = useCart(state => state.items.length);
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-primary">KnitPatterns</Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/shop" className="text-gray-700 hover:text-gray-900">Shop</Link>
            <Link to="/bundles" className="text-gray-700 hover:text-gray-900">Bundles</Link>
            <Link to="/tutorials" className="text-gray-700 hover:text-gray-900">Tutorials</Link>
            <Link to="/blog" className="text-gray-700 hover:text-gray-900">Blog</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-gray-700 hover:text-gray-900">
              Cart ({cartCount})
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/account" className="text-gray-700 hover:text-gray-900">
                  Account
                </Link>
                <button
                  onClick={signOut}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/signup" className="text-gray-700 hover:text-gray-900">
                  Sign Up
                </Link>
                <Link to="/signin" className="text-gray-700 hover:text-gray-900">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}