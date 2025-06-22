import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={
        "w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " +
        className
      }
      {...props}
    />
  );
}
