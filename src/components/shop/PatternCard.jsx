import React from 'react';
import { useCart } from '../../stores/cartStore';
import Button from '../ui/Button';
import PatternImage from './PatternImage';
import PatternDetails from './PatternDetails';
import PatternTags from './PatternTags';

export default function PatternCard({ pattern }) {
  const { items, addItem, removeItem } = useCart();
  const isInCart = items.some(item => item.id === pattern.id);

  const { title, price, previous_price, categories, yarn_weight, main_image, images, status, size_tag } = pattern;

  // Don't show drafts in shop
  if (status === 'draft') return null;

  const image = main_image || images?.[0] || '';
  const yarnWeight = yarn_weight;

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
        <PatternDetails title={title} price={price} previousPrice={previous_price} />
        <PatternTags categories={categories} yarnWeight={yarnWeight} size={size_tag} />
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