import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersMotion } from "@/lib/gsap";

// "From" states per reveal type. autoAlpha handles opacity + visibility together.
const FROM_BY_TYPE = {
  fade: { autoAlpha: 0 },
  slide: { autoAlpha: 0, y: -24 },
  "slide-up": { autoAlpha: 0, y: 24 },
  "slide-in-left": { autoAlpha: 0, x: -28 },
  "slide-in-right": { autoAlpha: 0, x: 28 },
  "scale-up": { autoAlpha: 0, scale: 0.92 }
};

/**
 * Scroll-triggered reveal. GSAP-backed replacement for the previous
 * react-spring implementation, keeping the same public API
 * (`type`, `delay`, `config`, `className`) plus an optional `stagger`.
 *
 * When `stagger` is set, the wrapper's direct children are revealed in
 * sequence; otherwise the wrapper itself is revealed as one element.
 */
const Animated = ({
  delay = 0,
  type = "fade",
  children,
  config,
  className,
  stagger
}) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      // Reduced motion: leave content in its natural, fully-visible state.
      if (!prefersMotion()) return;

      const el = ref.current;
      if (!el) return;

      const from = FROM_BY_TYPE[type] || FROM_BY_TYPE.fade;
      const targets = stagger ? el.children : el;

      gsap.from(targets, {
        ...from,
        delay: delay / 1000,
        ...(stagger ? { stagger } : {}),
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true
        },
        ...config
      });
    },
    { scope: ref, dependencies: [type, delay, stagger] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default Animated;
