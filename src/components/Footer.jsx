import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img 
              src="/images/logo.png"
              alt="Knitting With Calm"
              className="h-16" // Using Tailwind to control the height
            />
            <p className="text-gray-600">Beautiful & Modern Knitting Patterns</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><a href="/shop" className="text-gray-600 hover:text-gray-900">All Patterns</a></li>
              <li><a href="/bundles" className="text-gray-600 hover:text-gray-900">Bundles</a></li>
              <li><a href="/tutorials" className="text-gray-600 hover:text-gray-900">Video Tutorials</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">Instagram</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Pinterest</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}