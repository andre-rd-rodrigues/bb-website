import AppHead from "./AppHead";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { init, trackPages } from "insights-js";
import { useEffect, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
