import React from 'react';

export interface OptionSelector {
  value: string;
  label: string;
}

interface SelectorProps {
  id: string;
  name: string;
  label: string;
  options: OptionSelector[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const Selector: React.FC<SelectorProps> = ({ id, name, label, options, value, onChange }) => {
    return (
        <>
        <label htmlFor={id}>{label} *</label>
        <select
            className="form-select"
            name={name}
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {options.map((option, index) => (
            <option key={index} value={option.value}>
                {option.label}
            </option>
            ))}
        </select>
        </>
    );
};

export default Selector;
