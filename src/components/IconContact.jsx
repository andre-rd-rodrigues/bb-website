import { Icon } from "@iconify/react";
import React from "react";

function ContactLabel({ city, contact }) {
  if (!city) {
    return <p className="font-extralight">{contact}</p>;
  }

  return (
    <p className="font-extralight">
      <span className="font-semibold">{city}</span>
      {` - ${contact}`}
    </p>
  );
}

function IconContact({ icon, contact, city, className, href }) {
  return href ? (
    <a
      href={href}
      target="_blank"
      className={`${className} group inline-flex gap-2 justify-center items-center transition-opacity duration-200 hover:opacity-70`}
    >
      <Icon fontSize={20} icon={icon} className="text-gold transition-transform duration-200 group-hover:scale-110" />
      <ContactLabel city={city} contact={contact} />
    </a>
  ) : (
    <div
      className={`${className} inline-flex gap-2 justify-center items-center`}
    >
      <Icon fontSize={20} icon={icon} className="text-gold" />
      <ContactLabel city={city} contact={contact} />
    </div>
  );
}

export default IconContact;
