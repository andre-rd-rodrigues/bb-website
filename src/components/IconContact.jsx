import { Icon } from "@iconify/react";
import React from "react";

function IconContact({ icon, contact, className, href }) {
  return href ? (
    <a
      href={href}
      target="_blank"
      className={`${className} inline-flex gap-2 justify-center items-center`}
    >
      <Icon fontSize={20} icon={icon} className="text-gold" />
      <p className="font-extralight hover:opacity-60">{contact}</p>
    </a>
  ) : (
    <div
      className={`${className} inline-flex gap-2 justify-center items-center `}
    >
      <Icon fontSize={20} icon={icon} className="text-gold" />
      <p className="font-extralight hover:opacity-60">{contact}</p>
    </div>
  );
}

export default IconContact;
