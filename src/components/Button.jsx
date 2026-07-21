import { dm_sans } from "@/styles/fonts";
import { useTranslations } from "next-intl";
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

function Button({ className, onClick, label, variant, disabled, loading }) {
  const t = useTranslations("components.buttons");

  return (
    <button
      className={`group relative overflow-hidden ${
        variant ? "bg-blue" : "bg-gold"
      } py-3 px-9 text-xs font-light uppercase tracking-[0.2em] text-white transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-px hover:opacity-95 ${className} ${
        dm_sans.className
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Restrained gold/light sheen sweep on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-full motion-reduce:hidden"
      />
      <span className="relative z-10">
        {loading ? <PulseLoader color="white" size={10} /> : t(label)}
      </span>
    </button>
  );
}

export default Button;
