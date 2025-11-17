import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function Button({
  className = "",
  loading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props} // Spread props FIRST
      className={`px-4 py-2 rounded ${className}`} // ClassName LAST
      disabled={loading || props.disabled}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
