import React from 'react';

const TextField = ({
  label,
  id,
  type = "text",
  errors,
  register,
  required = false,
  message = "This field is required",
  className = "",
  min,
  value,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className={`font-semibold text-md ${className}`}>
        {label}
      </label>

      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...register(id, {
          required: required
            ? { value: true, message }
            : false,
          minLength: min
            ? { value: min, message: `Minimum ${min} characters required` }
            : undefined,
          pattern:
            type === "email"
              ? { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" }
              : type === "url"
              ? { value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/, message: "Please enter a valid URL" }
              : undefined,
        })}
      />

      {errors[id]?.message && (
        <p className="text-sm font-semibold text-red-500 mt-0">
          {errors[id]?.message}*
        </p>
      )}
    </div>
  );
};

export default TextField;
