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
          <Link to="/" className="font-primary">
            <img
              src="/images/logo.png"
              alt="Knitting Patterns Logo"
              className="h-12 w-auto"
            />
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/shop" className="text-gray-700 hover:text-gray-900">
              Shop
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-gray-900">
              Blog
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="text-gray-700 hover:text-gray-900 flex items-center gap-2">
              <span className="font-medium">Cart</span>
              <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </Link>

            {user?.role === 'admin' && (
              <div className="flex items-center space-x-4 border-l pl-4 border-gray-100">
                <Link to="/admin" className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors">
                  Admin
                </Link>
                <button
                  onClick={signOut}
                  className="text-sm font-semibold text-gray-400 hover:text-red-500 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}