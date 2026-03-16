import { dm_serif } from "@/styles/fonts";
import { useTranslations } from "next-intl";
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

interface ButtonProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  variant?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

function Button({
  className = "",
  onClick,
  label,
  variant,
  disabled,
  loading
}: ButtonProps) {
  const t = useTranslations("components.buttons");

  return (
    <button
      className={`${
        variant ? "bg-blue" : "bg-gold"
      } py-2 px-10 tracking-wider transition duration-200 text-white hover:opacity-85 ${className} ${
        dm_serif.className
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? <PulseLoader color="white" size={10} /> : t(label)}
    </button>
  );
}

export default Button;
