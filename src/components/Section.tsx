import React, { ReactNode } from "react";
import Container from "./Container";

interface SectionProps {
  children: ReactNode;
  containerClassName?: string;
  sectionClassName?: string;
}

function Section({
  children,
  containerClassName = "",
  sectionClassName = ""
}: SectionProps) {
  return (
    <section className={`${containerClassName} py-10 w-full`}>
      <Container className={`${sectionClassName} py-6`}>{children}</Container>
    </section>
  );
}

export default Section;
