import React from "react";

export const Input = React.forwardRef(
  ({ type = "text", name, id, value, onChange, placeholder = "", className = "", disabled = false, ...props }, ref) => {
    return (
      <input
        type={type}
        name={name}
        id={id || name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        ref={ref}
        className={`
          w-full px-4 py-2 border rounded-xl
          text-sm text-gray-900
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed
          transition duration-150 ease-in-out
          ${className}
        `}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

