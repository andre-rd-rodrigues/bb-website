import { dm_sans, ivy_presto } from "@/styles/fonts";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const PostCard = ({
  slug,
  title,
  description,
  image,
  date,
  categoryLabel,
  readingTime,
  readingTimeLabel
}) => {
  const { locale } = useRouter();

  const formattedDate = date
    ? new Date(date).toLocaleDateString(locale === "en" ? "en-GB" : "pt-PT", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
    : "";

  return (
    <Link
      href={`/blog/${slug}`}
      className="group w-full lg:w-96 h-full flex flex-col justify-between overflow-hidden shadow-lg bg-white transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1.5 hover:shadow-2xl"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
        />
        {categoryLabel && (
          <span
            className={`absolute top-4 left-4 bg-gold text-white text-xs tracking-wider uppercase px-3 py-1 ${dm_sans.className}`}
          >
            {categoryLabel}
          </span>
        )}
      </div>
      <div className="px-7 py-6 flex flex-col flex-1">
        <div
          className={`flex items-center gap-3 text-xs text-gold uppercase tracking-wider mb-3 ${dm_sans.className}`}
        >
          {formattedDate && <span>{formattedDate}</span>}
          {formattedDate && readingTime && <span aria-hidden="true">&middot;</span>}
          {readingTime && (
            <span>
              {readingTime} {readingTimeLabel}
            </span>
          )}
        </div>
        <h6 className={`font-bold text-2xl text-blue ${ivy_presto.className}`}>
          {title}
        </h6>
        <p className={`text-gray-700 mt-4 text-base ${dm_sans.className}`}>
          {description}
        </p>
      </div>
    </Link>
  );
};

export default PostCard;
