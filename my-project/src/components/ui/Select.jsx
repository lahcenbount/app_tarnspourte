import React, { useState, useRef, useEffect } from "react";

export function Select({ children, onValueChange }) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const containerRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const onClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const onSelect = (value) => {
    setSelectedValue(value);
    onValueChange && onValueChange(value);
    setOpen(false);
  };

  // Provide context to children (SelectTrigger, SelectContent, SelectItem)
  return (
    <div className="relative inline-block w-full" ref={containerRef}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        if (child.type.displayName === "SelectTrigger") {
          return React.cloneElement(child, {
            open,
            setOpen,
            selectedValue,
          });
        }
        if (child.type.displayName === "SelectContent") {
          return React.cloneElement(child, {
            open,
            onSelect,
            selectedValue,
          });
        }
        return child;
      })}
    </div>
  );
}

export function SelectTrigger({ open, setOpen, selectedValue, className, children }) {
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={
        "w-full border border-gray-300 rounded-md px-3 py-2 text-left text-sm flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 " +
        className
      }
      aria-haspopup="listbox"
      aria-expanded={open}
    >
      {children}
      <span className="ml-2 text-gray-500">&#9662;</span>
    </button>
  );
}
SelectTrigger.displayName = "SelectTrigger";

export function SelectValue({ placeholder }) {
  // We expect SelectTrigger to pass selectedValue as children or via context, but here simplified:
  return <span>{placeholder}</span>;
}
SelectValue.displayName = "SelectValue";

export function SelectContent({ open, onSelect, selectedValue, className, children }) {
  if (!open) return null;

  return (
    <ul
      role="listbox"
      tabIndex={-1}
      className={
        "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white border border-gray-300 py-1 text-sm shadow-lg " +
        className
      }
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        if (child.type.displayName === "SelectItem") {
          return React.cloneElement(child, {
            onSelect,
            isSelected: selectedValue === child.props.value,
          });
        }
        return child;
      })}
    </ul>
  );
}
SelectContent.displayName = "SelectContent";

export function SelectItem({ value, children, onSelect, isSelected, className }) {
  return (
    <li
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      onClick={() => onSelect(value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(value);
        }
      }}
      className={
        `cursor-pointer select-none px-4 py-2 ${
          isSelected ? "bg-blue-600 text-white" : "text-gray-900 hover:bg-blue-100"
        } ` + className
      }
    >
      {children}
    </li>
  );
}
SelectItem.displayName = "SelectItem";
