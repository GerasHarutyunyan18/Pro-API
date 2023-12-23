import { ButtonTypes } from "@/constants/enums";

interface ButtonProps {
  type: ButtonTypes;
  text: string;
  className?: string;
  onClick?: () => any;
}

export default function Button({
  type,
  text,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.()}
      className={`btn btn-${type} ${className}`}
    >
      {text}
    </button>
  );
}
