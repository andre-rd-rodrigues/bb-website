import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { SplitText } from "gsap/dist/SplitText";
import { Flip } from "gsap/dist/Flip";

// Register once. Safe to import from anywhere; registration is idempotent.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, Flip);

  // Global luxury feel: smooth deceleration easing, no bounce/elastic.
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
}

/**
 * True when the user has not requested reduced motion.
 * Guarded for SSR (returns false on the server so nothing animates pre-hydration).
 */
export const prefersMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, Flip };
