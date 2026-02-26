import React from "react";
import { screen } from "@testing-library/react";
import HeroSection from "@/components/HeroSection/HeroSection";
import { renderWithMotion } from "../__utils__/test-helpers";

jest.mock("@/components/Container", () => {
  return function MockContainer({ children, className }) {
    return (
      <div data-testid="container" className={className}>
        {children}
      </div>
    );
  };
});

describe("HeroSection", () => {
  it("renders without crashing", () => {
    renderWithMotion(<HeroSection>Content</HeroSection>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders children inside Container", () => {
    renderWithMotion(
      <HeroSection>
        <h1>Hero Title</h1>
      </HeroSection>
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Hero Title");
  });

  it("applies custom className", () => {
    const { container } = renderWithMotion(
      <HeroSection className="custom-hero">Content</HeroSection>
    );
    const hero = container.firstChild;
    expect(hero).toHaveClass("custom-hero");
  });

  it("applies background image when imageSrc is provided", () => {
    const { container } = renderWithMotion(
      <HeroSection imageSrc="/hero.jpg">Content</HeroSection>
    );
    const hero = container.firstChild;
    expect(hero).toHaveStyle({ background: expect.stringContaining("/hero.jpg") });
  });

  it("applies custom style when provided", () => {
    const customStyle = { minHeight: "400px" };
    const { container } = renderWithMotion(
      <HeroSection style={customStyle}>Content</HeroSection>
    );
    const hero = container.firstChild;
    expect(hero.style.minHeight).toBe("400px");
  });

  it("renders overlay div", () => {
    const { container } = renderWithMotion(<HeroSection>Content</HeroSection>);
    const overlay = container.querySelector('[class*="overlay"]');
    expect(overlay).toBeInTheDocument();
  });

  it("uses default overlayStyle when not provided", () => {
    const { container } = renderWithMotion(<HeroSection>Content</HeroSection>);
    const overlay = container.querySelector('[class*="overlay"]');
    expect(overlay).toBeInTheDocument();
    expect(overlay.style.opacity).toBe("0.75");
    // backgroundColor can be serialized as rgb or hex
    expect(
      overlay.style.backgroundColor === "rgb(30, 46, 69)" ||
        overlay.style.backgroundColor === "#1e2e45"
    ).toBe(true);
  });

  it("uses custom overlayStyle when provided", () => {
    const overlayStyle = { backgroundColor: "red", opacity: 0.5 };
    const { container } = renderWithMotion(
      <HeroSection overlayStyle={overlayStyle}>Content</HeroSection>
    );
    const overlay = container.querySelector('[class*="overlay"]');
    expect(overlay).toBeInTheDocument();
    expect(overlay.style.backgroundColor).toBe("red");
    expect(overlay.style.opacity).toBe("0.5");
  });
});
