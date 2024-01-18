import AppHead from "./AppHead";
import Footer from "./Footer";
import Navbar from "./Navbar";
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
      <div className="relative">
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </div>
    </>
  );
}
