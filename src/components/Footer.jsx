import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img
              src="/images/logo.png"
              alt="Knitting Patterns Logo"
              className="h-16 w-auto"
            />
            <p className="text-gray-600">
              Modern knitting patterns for contemporary crafters.
            </p>
          </div>
          <div>
            <h3 className="font-primary text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-indigo-600">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-indigo-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-indigo-600">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-primary text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Email: hello@knittingpatterns.com</li>
              <li>Follow us on Instagram</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Knitting Patterns. All rights reserved.</p>
          <Link to="/signin" className="mt-2 md:mt-0 opacity-30 hover:opacity-100 transition-opacity">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}