import { dm_serif } from "@/styles/fonts";
import Image from "next/image";
import React from "react";

const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="w-full lg:w-96 h-full flex flex-col justify-between overflow-hidden shadow-lg bg-white">
      <div className="px-7 py-6">
        <h6 className={`font-bold text-2xl text-blue ${dm_serif.className}`}>
          {title}
        </h6>
        <p className="text-gray-700 my-5 text-base">{description}</p>
      </div>
      <div className="relative h-40">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};

export default Card;
