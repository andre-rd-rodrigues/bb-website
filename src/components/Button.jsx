import { dm_serif } from "@/styles/fonts";
import { useTranslations } from "next-intl";
import React from "react";

function Button({ className, onClick, label, variant }) {
  const t = useTranslations("components.buttons");

  return (
    <button
      className={`${
        variant ? "bg-blue" : "bg-gold"
      } py-2 px-10 tracking-wider transition duration-200 text-white hover:opacity-85 ${className} ${
        dm_serif.className
      }`}
      onClick={onClick}
    >
      {t(label)}
    </button>
  );
}

export default Button;
