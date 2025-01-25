import React from 'react';
import FilterCheckbox from './FilterCheckbox';

export default function FilterSection({ title, options, selected, onSelect }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 capitalize">{title}</h3>
      <div className="space-y-2">
        {options.map(option => (
          <FilterCheckbox
            key={option}
            label={option}
            checked={selected.includes(option)}
            onChange={() => onSelect(title, option)}
          />
        ))}
      </div>
    </div>
  );
}