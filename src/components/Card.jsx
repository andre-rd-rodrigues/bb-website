import { ivy_presto } from "@/styles/fonts";
import Image from "next/image";
import React from "react";

const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="group w-full lg:w-96 h-full flex flex-col justify-between overflow-hidden shadow-lg bg-white transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1.5 hover:shadow-2xl">
      <div className="px-7 py-6">
        <h6 className={`font-bold text-2xl text-blue ${ivy_presto.className}`}>
          {title}
        </h6>
        <p className="text-gray-700 my-5 text-base">{description}</p>
      </div>
      <div className="relative h-40 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Card;
