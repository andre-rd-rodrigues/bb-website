import { useState, useEffect } from "react";

/**
 * A custom hook to determine if the screen size is mobile.
 * @param {number} breakpoint - The max width in pixels to consider as mobile.
 * @returns {boolean} - True if the screen width is less than or equal to the breakpoint.
 */
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Set initial value
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
