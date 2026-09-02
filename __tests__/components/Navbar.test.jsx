import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/Navbar";
import { renderWithMotion } from "../__utils__/test-helpers";

const mockNavLinks = [
  { href: "/about", name: "About" },
  { href: "/practice-areas", name: "Practice Areas" },
  { href: "/blog", name: "Blog" },
  { href: "/contacts", name: "Contacts" }
];

jest.mock("next/router", () => ({
  useRouter: () => ({ pathname: "/about", locale: "en", route: "/about" })
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

  it("renders brand name and navigation links from translations", () => {
    renderWithMotion(<Navbar />);
    expect(screen.getAllByText("brandName").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "About" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Practice Areas" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Blog" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Contacts" }).length).toBeGreaterThan(0);
  });

  it("renders links with correct hrefs", () => {
    renderWithMotion(<Navbar />);
    expect(screen.getAllByRole("link", { name: "About" })[0]).toHaveAttribute(
      "href",
      "/about"
    );
    expect(screen.getAllByRole("link", { name: "Practice Areas" })[0]).toHaveAttribute(
      "href",
      "/practice-areas"
    );
    expect(screen.getAllByRole("link", { name: "Blog" })[0]).toHaveAttribute(
      "href",
      "/blog"
    );
    expect(screen.getAllByRole("link", { name: "Contacts" })[0]).toHaveAttribute(
      "href",
      "/contacts"
    );
  });

  it("renders a WhatsApp contact call-to-action", () => {
    renderWithMotion(<Navbar />);
    const ctas = screen.getAllByRole("link", { name: "contact" });
    expect(ctas.length).toBeGreaterThan(0);
    expect(ctas[0]).toHaveAttribute("href", "https://wa.me/916690609");
    expect(ctas[0]).toHaveAttribute("target", "_blank");
  });

  it("renders mobile menu toggle button", () => {
    renderWithMotion(<Navbar />);
    expect(screen.getByRole("button", { name: "openMenu" })).toBeInTheDocument();
  });

  it("toggles mobile menu on button click", async () => {
    const user = userEvent.setup();
    renderWithMotion(<Navbar />);

    const toggle = screen.getByRole("button", { name: "openMenu" });
    const mobileNav = document.getElementById("mobile-navigation");

    expect(mobileNav).not.toHaveClass("mobileOverlayOpen");
    await user.click(toggle);
    expect(mobileNav).toHaveClass("mobileOverlayOpen");
    expect(screen.getByRole("button", { name: "closeMenu" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "closeMenu" }));
    expect(mobileNav).not.toHaveClass("mobileOverlayOpen");
  });

  it("highlights the active route link", () => {
    renderWithMotion(<Navbar />);
    const aboutLinks = screen.getAllByRole("link", { name: "About" });
    expect(aboutLinks[0].className).toMatch(/navLinkActive/);

    const blogLinks = screen.getAllByRole("link", { name: "Blog" });
    expect(blogLinks[0].className).not.toMatch(/navLinkActive/);
  });
});
