import React from "react";

export function Button({
  children,
  size = "md",         // sm | md | lg
  variant = "default",  // default | outline | destructive
  className = "",
  ...props
}) {
  // Base styles for the button
  let baseStyles =
    "inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Variant styles
  const variantStyles = {
    default:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
  };

  const combinedClassName = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
    variantStyles[variant] || variantStyles.default
  } ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
