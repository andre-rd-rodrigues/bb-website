import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

function Container({ children, className = "" }: ContainerProps) {
  return <div className={`max-w-7xl m-auto px-6 ${className}`}>{children}</div>;
}

export default Container;
