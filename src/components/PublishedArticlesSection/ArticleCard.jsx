import React from "react";
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";

const ArticleCard = ({ imageUrl, title, description, href }) => {
  return (
    <div className="mb-16 w-full flex flex-col lg:flex-row gap-10 justify-center">
      {/* Left Section (Image) */}
      <div className="lg:w-1/2 relative mx-auto w-full h-96">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
      </div>

      {/* Right Section (Title, Description, Button) */}
      <div className="lg:w-1/2">
        <h6 className="text-3xl text-blue">{title}</h6>
        <div className="border-b border-blue my-6"></div>
        <p className="mb-5">{description}</p>
        <Link href={href} className="flex justify-end sm:block">
          <Button label="read more" variant />
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
