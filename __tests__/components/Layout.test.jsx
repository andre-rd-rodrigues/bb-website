import React from "react";
import { screen } from "@testing-library/react";
import Layout from "@/components/Layout";
import { renderWithMotion } from "../__utils__/test-helpers";

jest.mock("next/router", () => ({
  useRouter: () => ({ pathname: "/", locale: "en", route: "/" })
}));

jest.mock("insights-js", () => ({
  init: jest.fn(),
  trackPages: jest.fn()
}));

describe("Layout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    renderWithMotion(
      <Layout>
        <main>Page content</main>
      </Layout>
    );
    expect(screen.getByText("Page content")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders children inside the layout", () => {
    renderWithMotion(
      <Layout>
        <div data-testid="child-content">Child content</div>
      </Layout>
    );
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("renders the main wrapper with min-h-screen class", () => {
    const { container } = renderWithMotion(
      <Layout>
        <span>Content</span>
      </Layout>
    );
    const minHeightDiv = container.querySelector(".min-h-screen");
    expect(minHeightDiv).toBeInTheDocument();
    expect(minHeightDiv).toHaveTextContent("Content");
  });

  it("renders Navbar (header)", () => {
    renderWithMotion(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders Footer", () => {
    renderWithMotion(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
