import AppHead from "./AppHead";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SmoothScroll from "./SmoothScroll";
import { init, trackPages } from "insights-js";
import { useEffect } from "react";

export default function Layout({ children }) {
  useEffect(() => {
    init(process.env.NEXT_PUBLIC_METRICS_ID);
    trackPages();
  }, []);

  return (
    <>
      <AppHead />
      {/* Navbar is fixed and must stay OUTSIDE the ScrollSmoother wrapper */}
      <Navbar />
      <SmoothScroll>
        <div className="min-h-screen">{children}</div>
        <Footer />
      </SmoothScroll>
    </>
  );
}
