const FilterSection = ({ title, options, selected = [], onSelect }) => {
  console.log('FilterSection rendering:', { title, options, selected });

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2 capitalize">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onSelect(option)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;