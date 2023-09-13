import { PropsWithChildren } from "react";
import "./Button.css";

interface ButtonProps extends PropsWithChildren {
  className?: string;
  actionOnClick: () => void;
  text: string;
}

const Button = ({
  className,
  actionOnClick,
  text,
  children,
}: ButtonProps): React.ReactElement => {
  return (
    <button
      type="button"
      className={`button ${className}`}
      onClick={actionOnClick}
    >
      {children}
      {text}
    </button>
  );
};

export default Button;
