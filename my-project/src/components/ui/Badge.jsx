import React from "react";

export function Badge({ children, className = "", ...props }) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full px-3 py-1 text-sm font-medium
        bg-gray-100 text-gray-800
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
}
