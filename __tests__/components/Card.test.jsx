import React from "react";
import { screen } from "@testing-library/react";
import Card from "@/components/Card";
import { renderWithMotion } from "../__utils__/test-helpers";

describe("Card", () => {
  const defaultProps = {
    title: "Card Title",
    description: "Card description text",
    imageUrl: "/test-image.jpg"
  };

  it("renders without crashing", () => {
    renderWithMotion(<Card {...defaultProps} />);
    expect(screen.getByText("Card Title")).toBeInTheDocument();
  });

  it("renders title", () => {
    renderWithMotion(<Card {...defaultProps} />);
    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent("Card Title");
  });

  it("renders description", () => {
    renderWithMotion(<Card {...defaultProps} />);
    expect(screen.getByText("Card description text")).toBeInTheDocument();
  });

  it("renders image with correct src and alt", () => {
    renderWithMotion(<Card {...defaultProps} />);
    const img = screen.getByRole("img", { name: "Card Title" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/test-image.jpg");
  });

  it("renders with different props", () => {
    renderWithMotion(
      <Card
        title="Another Title"
        description="Another description"
        imageUrl="https://example.com/img.png"
      />
    );
    expect(screen.getByText("Another Title")).toBeInTheDocument();
    expect(screen.getByText("Another description")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Another Title" })).toHaveAttribute(
      "src",
      "https://example.com/img.png"
    );
  });

  it("has card container with expected structure", () => {
    const { container } = renderWithMotion(<Card {...defaultProps} />);
    const card = container.querySelector(".shadow-lg.bg-white");
    expect(card).toBeInTheDocument();
  });
});
