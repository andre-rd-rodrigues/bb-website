import { useState, useEffect } from "react";

/**
 * A custom hook to determine if the screen size is mobile.
 * @param breakpoint - The max width in pixels to consider as mobile. Default 768.
 * @returns True if the screen width is less than or equal to the breakpoint.
 */
export default function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}
