import { dm_sans } from "@/styles/fonts";
import React from "react";

const ALL = "all";

const CategoryFilter = ({
  categories,
  active,
  onChange,
  allLabel,
  className
}) => {
  const options = [{ key: ALL, label: allLabel }, ...categories];

  return (
    <div
      className={`flex flex-wrap gap-3 ${className ?? "justify-end"}`}
      role="group"
      aria-label={allLabel}
    >
      {options.map(({ key, label }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            aria-pressed={isActive}
            className={`${dm_sans.className} px-5 py-2 text-sm tracking-wider transition-colors duration-300 border ${
              isActive
                ? "bg-blue text-white border-blue"
                : "bg-transparent text-blue border-blue/20 hover:border-gold/60"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export { ALL };
export default CategoryFilter;
