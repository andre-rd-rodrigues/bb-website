import { GoogleAnalytics } from "@next/third-parties/google";
import ClickTracker from "./ClickTracker";

const Analytics = () => {
  return (
    <>
      <GoogleAnalytics gaId="G-RPRJWVDP43" />
      <ClickTracker />
    </>
  );
};

export default Analytics;
