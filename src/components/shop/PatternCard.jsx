import React from 'react';
import { useCart } from '../../stores/cartStore';
import Button from '../ui/Button';
import PatternImage from './PatternImage';
import PatternDetails from './PatternDetails';
import PatternTags from './PatternTags';

export default function PatternCard({ pattern }) {
  const { items, addItem, removeItem } = useCart();
  const isInCart = items.some(item => item.id === pattern.id);

  if (!pattern) return null;

  const { title, price, category, yarnWeight, image } = pattern;

  const handleCartAction = () => {
    if (isInCart) {
      removeItem(pattern.id);
    } else {
      addItem(pattern);
    }
  };

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <PatternImage src={image} alt={title} />
      <div className="p-4">
        <PatternDetails title={title} price={price} />
        <PatternTags category={category} yarnWeight={yarnWeight} />
        <div className="mt-4">
          <Button
            onClick={handleCartAction}
            variant={isInCart ? "secondary" : "primary"}
            className="w-full"
          >
            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </article>
  );
}