import { Icon } from "@iconify/react";
import React from "react";

function IconContact({ icon, contact, className, href }) {
  return href ? (
    <a
      href={href}
      target="_blank"
      className={`${className} group inline-flex gap-2 justify-center items-center transition-opacity duration-200 hover:opacity-70`}
    >
      <Icon fontSize={20} icon={icon} className="text-gold transition-transform duration-200 group-hover:scale-110" />
      <p className="font-extralight">{contact}</p>
    </a>
  ) : (
    <div
      className={`${className} inline-flex gap-2 justify-center items-center`}
    >
      <Icon fontSize={20} icon={icon} className="text-gold" />
      <p className="font-extralight">{contact}</p>
    </div>
  );
}

export default IconContact;
