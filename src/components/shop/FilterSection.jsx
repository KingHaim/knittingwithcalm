import React from 'react';

// FilterSection.jsx
export default function FilterSection({ title, options, selected, onSelect }) {
  const handleOptionClick = (option) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    onSelect(newSelected);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map(option => (
          <label key={option} className="flex items-center">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => handleOptionClick(option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}