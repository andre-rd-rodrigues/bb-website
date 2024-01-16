import { dm_serif } from "@/styles/fonts";
import Image from "next/image";
import React from "react";

const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="w-64 flex flex-col justify-between overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <h6
          className={`font-bold text-xl mb-2 text-blue ${dm_serif.className}`}
        >
          {title}
        </h6>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="relative h-40">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};

export default Card;
