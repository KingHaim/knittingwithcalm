import React from 'react';
import { useCart } from '../../stores/cartStore';
import Button from '../ui/Button';

export default function BundleCard({ bundle }) {
  const addToCart = useCart(state => state.addItem);
  const { title, description, patterns, price, savings, image } = bundle;

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-video relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
          Save ${savings.toFixed(2)}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">Includes:</h4>
          <ul className="space-y-1">
            {patterns.map(pattern => (
              <li key={pattern.id} className="text-sm text-gray-600">
                • {pattern.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-semibold">${price.toFixed(2)}</span>
            <span className="text-sm text-gray-500 ml-2">
              Value: ${(price + savings).toFixed(2)}
            </span>
          </div>
        </div>

        <Button
          onClick={() => addToCart(bundle)}
          className="w-full"
        >
          Add to Cart
        </Button>
      </div>
    </article>
  );
}