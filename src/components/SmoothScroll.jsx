import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger, prefersMotion } from "@/lib/gsap";

/**
 * Wraps page content in the ScrollSmoother structure and creates the smoother
 * once on mount. The fixed navbar must live OUTSIDE this wrapper (see Layout).
 *
 * On the Pages Router the Layout (and this component) persist across route
 * changes while `children` swap, so we reset scroll + refresh triggers on
 * navigation rather than recreating the smoother.
 */
export default function SmoothScroll({ children }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const smootherRef = useRef(null);
  const router = useRouter();

  useGSAP(
    () => {
      // Reduced motion: skip smoothing entirely, keep native scroll.
      if (!prefersMotion()) return;

      smootherRef.current = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.2,
        effects: true, // enables data-speed / data-lag parallax
        smoothTouch: 0, // native scroll on touch for performance
        normalizeScroll: true
      });

      return () => {
        smootherRef.current && smootherRef.current.kill();
        smootherRef.current = null;
      };
    },
    { scope: wrapperRef }
  );

  useEffect(() => {
    if (!router.events) return undefined;

    const handleRouteChange = () => {
      // New page content is in the DOM; recalc heights and jump to top.
      const smoother = smootherRef.current;
      if (smoother) {
        smoother.scrollTo(0, false);
      } else {
        window.scrollTo(0, 0);
      }
      // Wait a frame so images/layout settle before measuring.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
