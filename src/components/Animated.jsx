import React from "react";
import { useSpring, animated } from "@react-spring/web";

const Animation = ({ delay = 0, type = "fade", children, config }) => {
  const props = useSpring({
    from: {
      opacity: 0,
      transform: type === "slide" ? "translateY(-20px)" : "none"
    },
    to: {
      opacity: 1,
      transform: type === "slide" ? "translateY(0)" : undefined
    },
    config: { tension: 150, friction: 40 },
    delay,
    ...config
  });

  return <animated.div style={props}>{children}</animated.div>;
};

export default Animation;
