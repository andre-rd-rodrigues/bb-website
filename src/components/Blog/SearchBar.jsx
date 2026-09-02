import { dm_sans } from "@/styles/fonts";
import { Icon } from "@iconify/react";
import React from "react";

const SearchBar = ({ value, onChange, placeholder, label }) => {
  return (
    <label
      className="group flex items-center border-b-2 border-gray-200 bg-white p-3 w-full transition-colors duration-300 focus-within:border-gold"
    >
      <Icon
        className="text-gold transition-transform duration-200 group-focus-within:scale-110"
        icon="mdi:magnify"
        fontSize={24}
      />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`border-none w-full text-blue py-1 px-2 leading-tight focus:outline-hidden ${dm_sans.className}`}
        style={{ background: "transparent" }}
        type="text"
        placeholder={placeholder}
        aria-label={label || placeholder}
      />
    </label>
  );
};

export default SearchBar;
