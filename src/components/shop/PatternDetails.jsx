import React from 'react';

export default function PatternDetails({ title, price, previousPrice }) {
  return (
    <div>
      <h3 className="text-lg font-semibold truncate" title={title}>{title}</h3>
      <div className="flex items-center gap-2 mt-1">
        <p className="text-primary font-bold">
          {price?.toFixed(2) || '0.00'}€
        </p>
        {previousPrice && parseFloat(previousPrice) > parseFloat(price) && (
          <p className="text-gray-400 text-sm line-through">
            {parseFloat(previousPrice).toFixed(2)}€
          </p>
        )}
      </div>
    </div>
  );
}