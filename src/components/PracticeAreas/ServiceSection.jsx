import Animated from "@/components/Animated";
import { dm_sans, ivy_presto } from "@/styles/fonts";
import Image from "next/image";
import React from "react";

/**
 * Full-width alternating image/text section for a single practice area.
 *
 * Props:
 *  - slug: anchor id for deep links (e.g. "#family-law")
 *  - title / description / imageUrl: content
 *  - typeLabel: translated audience badge (Citizens / Companies)
 *  - imagePosition: "left" | "right" — side the image sits on (lg+)
 *  - variant: "default" (cream ground) | "onDark" (navy ground, light text)
 *  - compact: shorter image height for tighter contexts (homepage preview)
 *  - animate: wrap columns in paired directional reveals (default true).
 *      Set false when a parent orchestrates reveal/reflow (e.g. Flip grid).
 */
const ServiceSection = ({
  slug,
  title,
  description,
  imageUrl,
  typeLabel,
  imagePosition = "left",
  variant = "default",
  compact = false,
  animate = true
}) => {
  const imageOnRight = imagePosition === "right";
  const onDark = variant === "onDark";

  const imageReveal = imageOnRight ? "slide-in-right" : "slide-in-left";
  const textReveal = imageOnRight ? "slide-in-left" : "slide-in-right";

  const imageInner = (
    <div
      className={`relative w-full overflow-hidden ${
        compact ? "h-64 lg:h-80" : "h-72 lg:h-[28rem]"
      }`}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]"
      />
    </div>
  );

  const textInner = (
    <>
      {typeLabel && (
        <span
          className={`${dm_sans.className} block text-gold text-xs font-medium uppercase tracking-[0.2em]`}
        >
          {typeLabel}
        </span>
      )}
      <h3
        className={`${ivy_presto.className} mt-3 text-2xl md:text-3xl ${
          onDark ? "text-white" : "text-blue"
        }`}
      >
        {title}
      </h3>
      <div
        className={`my-6 h-px w-16 ${onDark ? "bg-gold/70" : "bg-gold"}`}
        aria-hidden="true"
      />
      <p
        className={`${dm_sans.className} font-light leading-relaxed ${
          onDark ? "text-white/75" : "text-gray-700"
        }`}
      >
        {description}
      </p>
    </>
  );

  const columnClass = "w-full lg:w-1/2";

  return (
    <article
      id={slug}
      className={`group w-full flex flex-col gap-8 lg:gap-16 lg:items-center scroll-mt-28 ${
        imageOnRight ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      {animate ? (
        <>
          <Animated type={imageReveal} className={columnClass}>
            {imageInner}
          </Animated>
          <Animated type={textReveal} className={columnClass}>
            {textInner}
          </Animated>
        </>
      ) : (
        <>
          <div className={columnClass}>{imageInner}</div>
          <div className={columnClass}>{textInner}</div>
        </>
      )}
    </article>
  );
};

export default ServiceSection;
