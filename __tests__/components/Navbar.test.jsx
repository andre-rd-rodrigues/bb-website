import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/Navbar";
import { renderWithMotion } from "../__utils__/test-helpers";

const mockNavLinks = [
  { href: "/", name: "Home" },
  { href: "/about", name: "About" },
  { href: "/contacts", name: "Contact" }
];

jest.mock("next/router", () => ({
  useRouter: () => ({ pathname: "/", locale: "en", route: "/" })
}));

jest.mock("@/hooks/useTranslation", () => ({
  __esModule: true,
  default: () => ({
    getTranslationsArray: (key) =>
      key === "components.navbar.links" ? mockNavLinks : []
  })
}));

describe("Navbar", () => {
  it("renders without crashing", () => {
    renderWithMotion(<Navbar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders as a header with fixed positioning", () => {
    renderWithMotion(<Navbar />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("fixed");
  });

  it("renders navigation links from translations", () => {
    renderWithMotion(<Navbar />);
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it("renders links with correct hrefs", () => {
    renderWithMotion(<Navbar />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contacts");
  });

  it("renders mobile menu toggle button", () => {
    renderWithMotion(<Navbar />);
    const nav = screen.getByRole("banner").querySelector("nav");
    const toggle = nav.querySelector("button");
    expect(toggle).toBeInTheDocument();
  });

  it("toggles mobile menu on button click", async () => {
    const user = userEvent.setup();
    renderWithMotion(<Navbar />);
    const banner = screen.getByRole("banner");
    const nav = banner.querySelector("nav");
    const toggle = nav.querySelector("button");
    const linksContainer = nav.querySelector(".lg\\:flex");
    expect(linksContainer).toHaveClass("hidden");
    await user.click(toggle);
    expect(linksContainer).toHaveClass("flex");
    await user.click(toggle);
    expect(linksContainer).toHaveClass("hidden");
  });

  it("highlights active link when pathname matches", () => {
    renderWithMotion(<Navbar />);
    const homeLink = screen.getByRole("link", { name: "Home" });
    // Navbar structure: Link wraps li, so the li is a child of the link
    const homeLi = homeLink.querySelector("li");
    expect(homeLi).toBeInTheDocument();
    expect(homeLi).toHaveClass("border-b-2", "border-blue");
  });
});
