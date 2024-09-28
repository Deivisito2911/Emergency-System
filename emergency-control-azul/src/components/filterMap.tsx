import React, { useState } from 'react';

interface FilterPanelProps {
  types: string[];
  selectedTypes: Set<string>;
  onFilterChange: (type: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ types, selectedTypes, onFilterChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleFilterChange = (type: string) => {
    onFilterChange(type);
  };

  return (
    <div className="dropdown" style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        aria-expanded={isDropdownOpen}
        onClick={toggleDropdown}
      >
        Filtros
      </button>
      <div
        className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
        aria-labelledby="dropdownMenuButton"
        style={{
          position: 'absolute',
          width: '200px',
          top: '100%',
          right: 0,
          maxHeight: '300px',
          minWidth: '150px',
          overflowY: 'auto',
          padding: '16px',
          zIndex: 3 
        }}
      >
        {types.map((type) => (
          <div key={type} className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id={`filter-${type}`}
              checked={selectedTypes.has(type)}
              onChange={() => handleFilterChange(type)}
            />
            <label className="form-check-label" htmlFor={`filter-${type}`}>
              {type}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
