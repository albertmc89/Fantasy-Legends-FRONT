import { ButtonHTMLAttributes } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  actionOnClick?: () => void;
  text: string;
}

const Button = ({
  className,
  actionOnClick,
  text,
  children,
  disabled,
}: ButtonProps): React.ReactElement => {
  return (
    <button
      className={`button ${className}`}
      onClick={actionOnClick}
      disabled={disabled}
    >
      {children}
      {text}
    </button>
  );
};

export default Button;
