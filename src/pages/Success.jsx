import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-primary mb-4">Thank You for Your Purchase!</h1>
        <p className="text-gray-600 mb-8">
          We've sent you an email with your download instructions and the link to your patterns.
        </p>

        <div className="space-y-4">
          <Link
            to="/account/patterns"
            className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            View My Patterns
          </Link>

          <Link
            to="/shop"
            className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
} 