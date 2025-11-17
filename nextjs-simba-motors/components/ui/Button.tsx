import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function Button({ className, loading, ...props }: ButtonProps) {
  return (
    <button
      {...props} // <-- ESSENTIAL
      className={`px-4 py-2 rounded ${className}`}
    >
      {loading ? "Loading..." : props.children}
    </button>
  );
}
