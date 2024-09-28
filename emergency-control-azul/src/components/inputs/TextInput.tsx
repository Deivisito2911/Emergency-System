import React from 'react';

interface TextInputProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  readOnly?: boolean;
  ariaDescribedBy?: string;
}

const TextInput: React.FC<TextInputProps> = ({ id, name, label, placeholder, value, onChange, required, readOnly, ariaDescribedBy }) => {
  return (
    <div className="col-auto">
      <label htmlFor={id}>{label} *</label>
      <input
        className="form-control"
        type="text"
        name={name}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        aria-describedby={ariaDescribedBy}
      />
    </div>
  );
};

export default TextInput;
