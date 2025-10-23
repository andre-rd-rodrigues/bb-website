"use client";

import { useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Hotjar from "@hotjar/browser";

const Analytics = () => {
  return (
    <>
      <GoogleAnalytics gaId="YOUR_GA_ID" />
    </>
  );
};

export default Analytics;
