import { FormHTMLAttributes } from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

export interface InputFieldProps extends FormHTMLAttributes<InputFieldProps> {
  type: string;
  placeholder: string;
  name: string;
  label: string;
  errors?: FieldError;
  register: UseFormRegister<any>;
}

export function InputField({
  register,
  name,
  type,
  placeholder,
  label,
  errors,
  ...props
}: InputFieldProps) {
  const id = 'input-id-' + name;
  return (
    <>
      <label
        className="block text-slate-200 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        placeholder={placeholder}
        {...register(name, {})}
      />
      {errors && <p className="error-message text-red-400 pt-1">{errors.message}</p>}
    </>
  );
}
