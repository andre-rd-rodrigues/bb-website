import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersMotion } from "@/lib/gsap";
import Logo from "./Logo";

/**
 * Full-height intro splash shown on the initial page load. The blue logo
 * fades in and gently pulses (loading cue) on the cream ground, then the whole
 * panel slides up to reveal the site. Mounted once in `_app`, so it plays on a
 * full page load / hard refresh but never replays on internal navigation.
 */
export default function Preloader() {
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      const finish = () => {
        document.body.style.overflow = "";
        setDone(true);
      };

      // Reduced motion: reveal the site immediately, no slide.
      if (!prefersMotion()) {
        finish();
        return;
      }

      document.body.style.overflow = "hidden";

      // Loading phase (logo in + breathing pulse) is ~1.3s, then the icon
      // fades out and the panel slides up to reveal the site.
      const tl = gsap.timeline({ onComplete: finish });
      tl.fromTo(
        logoRef.current,
        { autoAlpha: 0, scale: 0.92 },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      )
        // Gentle breathing pulse to signal "loading" (one full breath).
        .to(logoRef.current, {
          opacity: 0.4,
          duration: 0.4,
          ease: "sine.inOut",
          repeat: 1,
          yoyo: true
        })
        // Icon disappears, then the panel slides away.
        .to(logoRef.current, { autoAlpha: 0, duration: 0.4, ease: "power1.out" })
        .to(overlay, {
          yPercent: -100,
          duration: 0.9,
          ease: "expo.inOut"
        });
    },
    { scope: overlayRef }
  );

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-live="polite"
      aria-label="A carregar"
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div ref={logoRef} style={{ opacity: 0 }}>
        <Logo fill="#1E2E45" width={64} height={82} />
      </div>
    </div>
  );
}
