import React from 'react';
import { useCart } from '../../stores/cartStore';
import Button from '../ui/Button';
import PatternImage from './PatternImage';
import PatternDetails from './PatternDetails';
import PatternTags from './PatternTags';
import { useNavigate, Link } from 'react-router-dom';

export default function PatternCard({ pattern }) {
  const { items, addItem } = useCart();
  const isInCart = items.some(item => item.id === pattern.id);

  const { title, price, previous_price, categories, yarn_weight, main_image, images, status, size_tag, slug, description } = pattern;

  // Don't show drafts in shop
  if (status === 'draft') return null;

  const image = main_image || images?.[0] || '';
  const yarnWeight = yarn_weight;

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <Link to={`/shop/${slug}`} className="block overflow-hidden aspect-[4/5]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/shop/${slug}`} className="hover:text-primary transition-colors">
          <PatternDetails title={title} price={price} previousPrice={previous_price} />
        </Link>

        {description && (
          <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        <div className="mt-auto pt-4">
          <PatternTags categories={categories} yarnWeight={yarnWeight} size={size_tag} />
          <div className="mt-4">
            <Button
              onClick={() => addItem(pattern)}
              variant={isInCart ? 'secondary' : 'primary'}
              className="w-full"
              disabled={isInCart}
            >
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}