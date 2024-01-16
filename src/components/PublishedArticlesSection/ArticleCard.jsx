import React from "react";
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";

const ArticleCard = ({ imageUrl, title, description, href }) => {
  return (
    <div className="my-8 max-w-xl">
      <div className="md:flex">
        {/* Left Section (Image) */}
        <div className="md:w-64">
          <div
            className="relative"
            style={{
              width: "250px",
              height: "350px"
            }}
          >
            <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
          </div>
        </div>

        {/* Right Section (Title, Description, Button) */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h6 className="text-3xl text-blue">{title}</h6>
          <div className="border-b border-blue my-6"></div>
          <p className="mb-5">{description}</p>
          <Link href={href}>
            <Button label="read more" variant />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
