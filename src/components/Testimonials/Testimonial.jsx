import { dm_serif } from "@/styles/fonts";
import Image from "next/image";
import React from "react";
import Stars from "./Stars";
import Animated from "../Animated";

function Testimonial({ author, imageUrl, feedback }) {
  return (
    <div className="px-10 pb-10 gap-11 flex flex-col md:flex-row items-center m-auto sm:mt-8">
      <div
        className="relative overflow-hidden rounded-full"
        style={{
          height: "150px",
          width: "150px",
          flex: "0 0 150px"
        }}
      >
        <Animated delay={100}>
          <Image
            src={imageUrl}
            alt={`${author} Testimonial`}
            objectFit="cover"
            layout="fill"
          />
        </Animated>
      </div>
      <Animated delay={200}>
        <div className="relative overflow-visible text-left mt-4 sm:mt-0 max-w-4xl z-0">
          <p>{feedback}</p>
          <div className="flex gap-2 align-center  mt-2">
            <p className={`${dm_serif.className} text-blue`}>{author}</p>
            <Stars />
          </div>
          <Image
            alt="Testimonials"
            src="/img/quotes.png"
            style={{
              width: "140px"
            }}
            width={150}
            height={150}
            className="absolute left-1 -top-6 z-10"
          />
        </div>
      </Animated>
    </div>
  );
}

export default Testimonial;
