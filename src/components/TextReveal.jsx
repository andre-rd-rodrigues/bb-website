import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, prefersMotion } from "@/lib/gsap";

/**
 * Masked, word-by-word heading reveal built on SplitText.
 * Each word rises from behind a mask for a refined, editorial feel.
 *
 * Props:
 *  - as: element tag (default "h1")
 *  - delay: ms before the reveal starts
 *  - stagger: seconds between words
 *  - start: ScrollTrigger start position (default "top 85%")
 *  - className / style: forwarded to the element
 */
const TextReveal = ({
  as: Tag = "h1",
  children,
  className,
  style,
  delay = 0,
  stagger = 0.08,
  start = "top 85%"
}) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // Reduced motion: leave content in its natural, visible state.
      if (!prefersMotion()) return;

      // Hide synchronously (useGSAP runs in a layout effect) to avoid FOUC.
      gsap.set(el, { autoAlpha: 0 });

      let split;

      const run = () => {
        split = SplitText.create(el, { type: "words", mask: "words" });
        gsap.set(el, { autoAlpha: 1 });
        gsap.from(split.words, {
          yPercent: 120,
          autoAlpha: 0,
          duration: 1,
          ease: "power4.out",
          stagger,
          delay: delay / 1000,
          scrollTrigger: { trigger: el, start, once: true }
        });
      };

      // Wait for fonts so line/word boxes are measured correctly.
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(run);
      } else {
        run();
      }

      return () => split && split.revert();
    },
    { scope: ref, dependencies: [delay, stagger, start] }
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
};

export default TextReveal;
