import React from "react";
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";
import Animated from "../Animated";

const ArticleCard = ({ imageUrl, title, description, href }) => {
  return (
    <div className="mb-16 w-full flex flex-col lg:flex-row gap-10 justify-center">
      {/* Left Section (Image) */}
      <Animated
        type="slide-in-left"
        className="lg:w-1/2 relative mx-auto w-full h-96 overflow-hidden"
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-105"
        />
      </Animated>

      {/* Right Section (Title, Description, Button) */}
      <Animated type="slide-in-right" delay={150} className="lg:w-1/2">
        <h6 className="text-3xl text-blue">{title}</h6>
        <div className="border-b border-blue my-6"></div>
        <p className="mb-5">{description}</p>
        <Link href={href} className="flex justify-end sm:block">
          <Button label="read more" variant />
        </Link>
      </Animated>
    </div>
  );
};

export default ArticleCard;
