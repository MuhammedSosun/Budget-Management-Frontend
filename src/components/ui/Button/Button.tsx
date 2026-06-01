import type React from "react";
import "./Button.scss";

interface ButtonProps {
  children: React.ReactNode;
  variant: "primary" | "success" | "danger" | "link";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

function Button({
  children,
  variant,
  onClick,
  type = "button",
  disabled = false,
  isLoading = false,
  loadingText = "Loading...",
}: ButtonProps) {
  const className = `my-custom-button my-custom-button--${variant}`;

  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}

export default Button;
