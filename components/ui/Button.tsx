import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "outline" | "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = ({
  className = "",
  loading,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) => {
  console.log(">>> BUTTON COMPONENT ACTIVE");
  console.log("Button props:", props);

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
    icon: "p-2",
  };

  return (
    <button
      {...props} // Spread props FIRST
      className={`rounded ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} // ClassName LAST
      disabled={loading || props.disabled}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export { Button };
