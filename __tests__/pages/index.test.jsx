import React from "react";
import { screen } from "@testing-library/react";
import Home from "@/pages/index";
import { renderWithMotion } from "../__utils__/test-helpers";
import { setupCommonMocks } from "../__mocks__/common";

setupCommonMocks();

const practiceAreasWithPreview = [
  {
    title: "Private International Law",
    description: "Specialization in emigration processes, Golden Visas in Portugal.",
    imageUrl: "https://images.unsplash.com/photo-1614107151491-6876eecbff89",
    type: "Citizens",
    showPreview: true
  },
  {
    title: "Civil Law",
    description: "Specialization in drafting and understanding contracts.",
    imageUrl: "https://images.unsplash.com/photo-1530469525856-cf37954301f7",
    type: "Citizens",
    showPreview: true
  }
];

const aboutExtraInfo = [
  { title: "Experience", value: 10 },
  { title: "Cases", value: 100 },
  { title: "Clients", value: 128 }
];

const articles = [
  {
    imageUrl: "/img/redutibilidade-salarial.jpg",
    title: "Salary Reductibility and Prohibition of Retrogression",
    description: "Equipped with scientific courage and audacity.",
    href: "https://issuu.com/editoradplacido/docs/issuu_irredutibilidade_salarial"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    title: "Disregard of Legal Personality in the Limited Liability Company",
    description: "The recourse to disregard of legal personality must be moderate.",
    href: "https://www.cidp.pt/revistas/ridb/2014/06/2014_06_03989_04073.pdf"
  }
];

const testimonialsFeedback = [
  {
    author: "Sofia Pimenta",
    feedback: "From the very first moment I met Bárbara Barbizani.",
    imageUrl: "/img/testimonials/sofia.jpg"
  }
];

jest.mock("@/hooks/useTranslation", () => ({
  __esModule: true,
  default: () => ({
    getTranslationsArray: (key) => {
      if (key === "components.practiceAreas") return practiceAreasWithPreview;
      if (key === "pages.homepage.about.extraInfo") return aboutExtraInfo;
      if (key === "components.articles.articles") return articles;
      if (key === "components.testimonials.feedback") return testimonialsFeedback;
      return [];
    }
  })
}));

jest.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: (namespace) => (key) => {
    const pages = {
      "homepage.subtitle": "Law Practice & Legal Consulting",
      "homepage.about.subtitle": "About me",
      "homepage.about.title": "Helping to overcome and ease the legal burden.",
      "homepage.about.description":
        "My name is Bárbara Barbizani de Carvalho, I have a client-oriented approach.",
      "homepage.practice.title": "Practice Areas",
      "homepage.practice.subtitle":
        "My practice revolves around trust, ethics, and commitment.",
      "homepage.hero1.title": "A Careful, Committed, and Dignified Approach to Law.",
      "homepage.hero1.description":
        "I'm here to help. As your legal partner, I provide personalized solutions.",
      "homepage.contacts.subtitle": "Contacts",
      "homepage.contacts.title": "Get in Touch for Expert Advice",
      "homepage.contacts.description":
        "Whether you're navigating complex legal issues or simply seeking guidance."
    };
    const components = {
      "articles.title": "Published Articles",
      "articles.subtitle": "News",
      "testimonials.title": "What My Clients Experienced",
      "testimonials.subtitle": "Testimonials"
    };
    if (namespace === "pages") return pages[key] || key;
    if (namespace === "components") return components[key] || key;
    return key;
  }
}));

jest.mock("react-intersection-observer", () => ({
  useInView: () => [jest.fn(), true]
}));

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the main page structure", () => {
    renderWithMotion(<Home />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders the hero with name and subtitle", () => {
    renderWithMotion(<Home />);
    expect(screen.getByRole("heading", { level: 1, name: "Bárbara Barbizani" })).toBeInTheDocument();
    expect(screen.getByText("Law Practice & Legal Consulting")).toBeInTheDocument();
  });

  it("renders hero contact button linking to /contacts", () => {
    renderWithMotion(<Home />);
    const contactLinks = screen.getAllByRole("link", { name: /contact/i });
    const heroContact = contactLinks.find((link) => link.getAttribute("href") === "/contacts");
    expect(heroContact).toBeInTheDocument();
  });

  it("renders the about section with subtitle, title and description", () => {
    renderWithMotion(<Home />);
    expect(screen.getByText("About me")).toBeInTheDocument();
    expect(screen.getByText("Helping to overcome and ease the legal burden.")).toBeInTheDocument();
    expect(screen.getByText(/My name is Bárbara Barbizani de Carvalho/)).toBeInTheDocument();
  });

  it("renders about extra info counters (Experience, Cases, Clients)", () => {
    renderWithMotion(<Home />);
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Cases")).toBeInTheDocument();
    expect(screen.getByText("Clients")).toBeInTheDocument();
  });

  it("renders about see more button linking to /about", () => {
    renderWithMotion(<Home />);
    const seeMoreLinks = screen.getAllByRole("link", { name: /see more/i });
    const aboutSeeMore = seeMoreLinks.find((link) => link.getAttribute("href") === "/about");
    expect(aboutSeeMore).toBeInTheDocument();
  });

  it("renders about section image with correct alt", () => {
    renderWithMotion(<Home />);
    const images = screen.getAllByRole("img", { name: /Barbara Barbizani/i });
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders practice areas section with title and subtitle", () => {
    renderWithMotion(<Home />);
    expect(screen.getByRole("heading", { name: "Practice Areas" })).toBeInTheDocument();
    expect(screen.getByText(/My practice revolves around trust, ethics, and commitment/)).toBeInTheDocument();
  });

  it("renders practice area cards from translation data", () => {
    renderWithMotion(<Home />);
    expect(screen.getByText("Private International Law")).toBeInTheDocument();
    expect(screen.getByText("Civil Law")).toBeInTheDocument();
  });

  it("renders practice areas see more link to /practice-areas", () => {
    renderWithMotion(<Home />);
    const seeMoreLinks = screen.getAllByRole("link", { name: /see more/i });
    const practiceSeeMore = seeMoreLinks.find(
      (link) => link.getAttribute("href") === "/practice-areas"
    );
    expect(practiceSeeMore).toBeInTheDocument();
  });

  it("renders testimonials section", () => {
    renderWithMotion(<Home />);
    expect(screen.getByText("Testimonials")).toBeInTheDocument();
    expect(screen.getByText("What My Clients Experienced")).toBeInTheDocument();
  });

  it("renders hero CTA with title and description", () => {
    renderWithMotion(<Home />);
    expect(
      screen.getByText("A Careful, Committed, and Dignified Approach to Law.")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/I'm here to help. As your legal partner, I provide personalized solutions/)
    ).toBeInTheDocument();
  });

  it("renders published articles section with article titles", () => {
    renderWithMotion(<Home />);
    expect(screen.getByText("Published Articles")).toBeInTheDocument();
    expect(screen.getByText("News")).toBeInTheDocument();
    expect(screen.getByText("Salary Reductibility and Prohibition of Retrogression")).toBeInTheDocument();
    expect(
      screen.getByText("Disregard of Legal Personality in the Limited Liability Company")
    ).toBeInTheDocument();
  });

  it("renders articles see more link to /about#see-more", () => {
    renderWithMotion(<Home />);
    const seeMoreLinks = screen.getAllByRole("link", { name: /see more/i });
    const articlesSeeMore = seeMoreLinks.find(
      (link) => link.getAttribute("href") === "/about#see-more"
    );
    expect(articlesSeeMore).toBeInTheDocument();
  });

  it("renders contacts section with subtitle, title and description", () => {
    renderWithMotion(<Home />);
    expect(screen.getByText("Get in Touch for Expert Advice")).toBeInTheDocument();
    expect(
      screen.getByText(/Whether you're navigating complex legal issues or simply seeking guidance/)
    ).toBeInTheDocument();
  });

  it("renders contacts section contact button linking to /contacts", () => {
    renderWithMotion(<Home />);
    const contactLinks = screen.getAllByRole("link", { name: /contact/i });
    const contactsSectionLink = contactLinks.find(
      (link) => link.getAttribute("href") === "/contacts"
    );
    expect(contactsSectionLink).toBeInTheDocument();
  });
});
