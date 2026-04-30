import "./Button.scss";

interface ButtonProps {
  children: React.ReactNode;
  variant: "primary" | "success" | "danger" | "link";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
}

function Button({
  children,
  variant,
  onClick,
  type = "button",
  disabled,
  isLoading,
}: ButtonProps) {
  const className = `my-custom-button ${variant} ${isLoading || disabled ? "disabled" : ""}`;
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}

export default Button;
