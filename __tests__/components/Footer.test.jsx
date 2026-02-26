import React from "react";
import { screen } from "@testing-library/react";
import Footer from "@/components/Footer";
import { renderWithMotion } from "../__utils__/test-helpers";
import { SOCIAL_MEDIA } from "@/constants";

jest.mock("@/components/Footer/FooterSection", () => {
  return function MockFooterSection({ title, sectionHref, subLinks }) {
    return (
      <div data-testid="footer-section">
        <h2>{title}</h2>
        {subLinks?.map(({ name, href }, i) => (
          <a key={i} href={href}>{name}</a>
        ))}
      </div>
    );
  };
});

const mockFooterLinks = [
  {
    name: "Practice Areas",
    href: "/practice-areas",
    subLinks: [
      { name: "Area 1", href: "/practice-areas/1" },
      { name: "Area 2", href: "/practice-areas/2" }
    ]
  },
  {
    name: "Contact",
    href: "/contacts",
    subLinks: [
      { name: "Email", href: "mailto:test@test.com", icon: "ic:email" },
      { name: "Phone", href: "tel:+351123", icon: "ic:phone" }
    ]
  }
];

jest.mock("@/hooks/useTranslation", () => ({
  __esModule: true,
  default: () => ({
    getTranslationsArray: (key) =>
      key === "components.footer.links" ? mockFooterLinks : []
  })
}));

jest.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: (namespace) => (key) => {
    if (namespace === "components" && key === "footer.description") {
      return "Footer description text";
    }
    return key;
  }
}));

describe("Footer", () => {
  it("renders without crashing", () => {
    renderWithMotion(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders footer with bg-blue class", () => {
    renderWithMotion(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("bg-blue");
  });

  it("renders description from translations", () => {
    renderWithMotion(<Footer />);
    expect(screen.getByText("Footer description text")).toBeInTheDocument();
  });

  it("renders section titles from footer links", () => {
    renderWithMotion(<Footer />);
    expect(screen.getByText("Practice Areas")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders sublinks for sections", () => {
    renderWithMotion(<Footer />);
    expect(screen.getByRole("link", { name: /Area 1/ })).toHaveAttribute(
      "href",
      "/practice-areas/1"
    );
    expect(screen.getByRole("link", { name: /Area 2/ })).toHaveAttribute(
      "href",
      "/practice-areas/2"
    );
  });

  it("renders home link with logo", () => {
    renderWithMotion(<Footer />);
    const homeLinks = screen.getAllByRole("link").filter((l) => l.getAttribute("href") === "/");
    expect(homeLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders social media links", () => {
    renderWithMotion(<Footer />);
    SOCIAL_MEDIA.forEach(({ href }) => {
      const links = screen.getAllByRole("link", { href });
      expect(links.length).toBeGreaterThanOrEqual(0);
    });
    const socialLinks = screen.getAllByRole("link").filter((l) =>
      SOCIAL_MEDIA.some((s) => l.getAttribute("href") === s.href)
    );
    expect(socialLinks.length).toBe(SOCIAL_MEDIA.length);
  });

  it("renders copyright with author link", () => {
    renderWithMotion(<Footer />);
    expect(screen.getByText(/© 2024/)).toBeInTheDocument();
    const authorLink = screen.getByRole("link", { name: "André Rodrigo" });
    expect(authorLink).toHaveAttribute("href", "https://andrerodrigo.com");
    expect(authorLink).toHaveAttribute("target", "_blank");
  });
});
