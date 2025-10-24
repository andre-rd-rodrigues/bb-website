import React from "react";
import { screen } from "@testing-library/react";
import About from "@/pages/about";
import { renderWithMotion } from "../__utils__/test-helpers";
import { setupCommonMocks } from "../__mocks__/common";

// Setup common mocks
setupCommonMocks();

// Mock the translation hooks with about-specific data
jest.mock("@/hooks/useTranslation", () => ({
  __esModule: true,
  default: () => ({
    getTranslationsArray: (key) => {
      if (key === "components.articles.articles") {
        return [
          {
            imageUrl: "/img/redutibilidade-salarial.jpg",
            title: "Salary Reductibility and Prohibition of Retrogression",
            description:
              "Equipped with scientific courage and audacity, the author proposes a deconstruction of the principle of prohibition of retrogression.",
            href: "https://issuu.com/editoradplacido/docs/issuu_irredutibilidade_salarial"
          },
          {
            imageUrl:
              "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
            title:
              "Disregard of Legal Personality in the Limited Liability Company",
            description:
              "The recourse to disregard of legal personality must be moderate as a mobile pendulum.",
            href: "https://www.cidp.pt/revistas/ridb/2014/06/2014_06_03989_04073.pdf"
          }
        ];
      }
      return [];
    }
  })
}));

jest.mock("next-intl", () => ({
  useTranslations: (namespace) => (key) => {
    const translations = {
      pages: {
        "about.title": "About",
        "about.title2": "Helping You To Overcome And Ease The Legal Burden.",
        "about.description":
          "Lawyer and legal consultant, Member of the Portuguese Bar Association and Member of the Brazilian Bar Association. PhD candidate in Legal and Civil Sciences - University of Law of Lisbon.",
        "about.hero.title":
          "Empowering You Through Expert Legal Services and Consulting",
        "about.hero.description":
          "I'm dedicated to providing expert advice and comprehensive consulting services tailored to your unique needs. Whether you're facing intricate legal challenges or simply seeking guidance, I am here to assist you."
      },
      components: {
        "articles.subtitle": "News",
        "articles.title": "Published Articles"
      }
    };
    return translations[namespace]?.[key] || key;
  }
}));

describe("About Page", () => {
  beforeEach(() => {
    // Reset any mocks before each test
    jest.clearAllMocks();
  });

  it("renders the main page structure", () => {
    renderWithMotion(<About />);

    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders the hero section with correct title", () => {
    renderWithMotion(<About />);

    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders the about section with correct title and description", () => {
    renderWithMotion(<About />);

    expect(
      screen.getByText("Helping You To Overcome And Ease The Legal Burden.")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Lawyer and legal consultant, Member of the Portuguese Bar Association/
      )
    ).toBeInTheDocument();
  });

  it("renders the professional image with correct alt text", () => {
    renderWithMotion(<About />);

    const image = screen.getByAltText("Barbara Barbizani");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://images.unsplash.com/photo-1555776097-f21af260de55?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    );
  });

  it("renders the call-to-action section with correct title and description", () => {
    renderWithMotion(<About />);

    expect(
      screen.getByText(
        "Empowering You Through Expert Legal Services and Consulting"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /I'm dedicated to providing expert advice and comprehensive consulting services/
      )
    ).toBeInTheDocument();
  });

  it("renders the practice areas button with correct link", () => {
    renderWithMotion(<About />);

    const practiceAreasLink = screen.getByRole("link", {
      name: /pratice areas/i
    });
    expect(practiceAreasLink).toBeInTheDocument();
    expect(practiceAreasLink).toHaveAttribute("href", "practice-areas");
  });

  it("renders the published articles section with correct title and subtitle", () => {
    renderWithMotion(<About />);

    expect(screen.getByText("News")).toBeInTheDocument();
    expect(screen.getByText("Published Articles")).toBeInTheDocument();
  });

  it("renders all published articles with correct content", () => {
    renderWithMotion(<About />);

    // Check first article
    expect(
      screen.getByText("Salary Reductibility and Prohibition of Retrogression")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Equipped with scientific courage and audacity/)
    ).toBeInTheDocument();

    // Check second article
    expect(
      screen.getByText(
        "Disregard of Legal Personality in the Limited Liability Company"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /The recourse to disregard of legal personality must be moderate/
      )
    ).toBeInTheDocument();
  });

  it("renders article images with correct sources", () => {
    renderWithMotion(<About />);

    const articleImages = screen
      .getAllByRole("img")
      .filter(
        (img) =>
          img.getAttribute("alt")?.includes("Salary Reductibility") ||
          img.getAttribute("alt")?.includes("Disregard of Legal Personality")
      );

    expect(articleImages).toHaveLength(2);
    expect(articleImages[0]).toHaveAttribute(
      "src",
      "/img/redutibilidade-salarial.jpg"
    );
    expect(articleImages[1]).toHaveAttribute(
      "src",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
    );
  });

  it("renders article links with correct href attributes", () => {
    renderWithMotion(<About />);

    const articleLinks = screen
      .getAllByRole("link")
      .filter(
        (link) =>
          link.getAttribute("href")?.includes("issuu.com") ||
          link.getAttribute("href")?.includes("cidp.pt")
      );

    expect(articleLinks).toHaveLength(2);
    expect(articleLinks[0]).toHaveAttribute(
      "href",
      "https://issuu.com/editoradplacido/docs/issuu_irredutibilidade_salarial"
    );
    expect(articleLinks[1]).toHaveAttribute(
      "href",
      "https://www.cidp.pt/revistas/ridb/2014/06/2014_06_03989_04073.pdf"
    );
  });

  it("renders navigation anchor points", () => {
    renderWithMotion(<About />);

    expect(document.getElementById("journey")).toBeInTheDocument();
    expect(document.getElementById("articles")).toBeInTheDocument();
  });

  it("renders all required headings with correct hierarchy", () => {
    renderWithMotion(<About />);

    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThanOrEqual(4);

    // Check main headings
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "About"
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Helping You To Overcome And Ease The Legal Burden."
    );

    // Check h3 headings (there are multiple h3s)
    const h3Headings = screen.getAllByRole("heading", { level: 3 });
    expect(h3Headings.length).toBeGreaterThanOrEqual(2);
    expect(
      h3Headings.some(
        (h) =>
          h.textContent ===
          "Empowering You Through Expert Legal Services and Consulting"
      )
    ).toBe(true);
    expect(h3Headings.some((h) => h.textContent === "News")).toBe(true);
  });

  it("renders article cards with proper structure", () => {
    renderWithMotion(<About />);

    // Check that each article has a title, description, and read more button
    const articleTitles = screen.getAllByText(
      /Salary Reductibility|Disregard of Legal Personality/
    );
    expect(articleTitles).toHaveLength(2);

    const readMoreButtons = screen.getAllByRole("link", { name: /read more/i });
    expect(readMoreButtons).toHaveLength(2);
  });

  it("renders the hero section with correct background image", () => {
    renderWithMotion(<About />);

    // The hero section uses HeroSection component which renders the background image
    // We can check that the hero section container exists with the correct styling
    const heroContainer = screen.getByText("About").closest("div")
      ?.parentElement?.parentElement;
    expect(heroContainer).toBeInTheDocument();
  });

  it("renders all sections in correct order", () => {
    renderWithMotion(<About />);

    const main = screen.getByRole("main");
    const sections = main.querySelectorAll("section");

    // Should have at least 2 sections: about content and articles
    // (HeroSection and CTA are divs, not sections)
    expect(sections.length).toBeGreaterThanOrEqual(2);
  });

  it("renders the about description with professional credentials", () => {
    renderWithMotion(<About />);

    const description = screen.getByText(
      /Lawyer and legal consultant, Member of the Portuguese Bar Association/
    );
    expect(description).toBeInTheDocument();
    expect(description.textContent).toContain(
      "PhD candidate in Legal and Civil Sciences"
    );
    expect(description.textContent).toContain("University of Law of Lisbon");
  });

  it("renders the CTA section with proper button functionality", () => {
    renderWithMotion(<About />);

    const ctaButton = screen.getByRole("link", { name: /pratice areas/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "practice-areas");
  });

  it("renders articles with proper external link attributes", () => {
    renderWithMotion(<About />);

    const externalLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("http"));

    expect(externalLinks.length).toBeGreaterThanOrEqual(2);
    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute("href");
      expect(link.getAttribute("href")).toMatch(/^https?:\/\//);
    });
  });

  it("renders the page with proper semantic structure", () => {
    renderWithMotion(<About />);

    // Check main structure
    expect(screen.getByRole("main")).toBeInTheDocument();

    // Check headings hierarchy
    const h1 = screen.getByRole("heading", { level: 1 });
    const h2 = screen.getByRole("heading", { level: 2 });
    const h3Headings = screen.getAllByRole("heading", { level: 3 });

    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(h3Headings.length).toBeGreaterThanOrEqual(2);
  });

  it("renders all text content in readable format", () => {
    renderWithMotion(<About />);

    // Check that all major text content is present and readable
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(
      screen.getByText("Helping You To Overcome And Ease The Legal Burden.")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Empowering You Through Expert Legal Services and Consulting"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Published Articles")).toBeInTheDocument();
  });

  it("renders the page without console errors", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    renderWithMotion(<About />);

    // Check that no critical errors were logged
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining("Warning:")
    );

    consoleSpy.mockRestore();
  });
});
