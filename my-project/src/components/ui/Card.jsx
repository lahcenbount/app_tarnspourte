import React from "react";

export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`
        bg-white rounded-2xl shadow-sm border border-gray-200 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div className={`px-6 pt-6 pb-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }) {
  return (
    <h3
      className={`text-xl font-semibold text-gray-800 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`px-6 pb-6 pt-2 ${className}`} {...props}>
      {children}
    </div>
  );
}
