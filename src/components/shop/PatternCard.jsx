import React from 'react';
import { useCart } from '../../stores/cartStore';
import Button from '../ui/Button';
import PatternImage from './PatternImage';
import PatternDetails from './PatternDetails';
import PatternTags from './PatternTags';

export default function PatternCard({ pattern }) {
  const addToCart = useCart(state => state.addItem);

  if (!pattern) return null;

  const { title, price, category, yarnWeight, image } = pattern;

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <PatternImage src={image} alt={title} />
      <div className="p-4">
        <PatternDetails title={title} price={price} />
        <PatternTags category={category} yarnWeight={yarnWeight} />
        <div className="mt-4">
          <Button
            onClick={() => addToCart(pattern)}
            className="w-full"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}