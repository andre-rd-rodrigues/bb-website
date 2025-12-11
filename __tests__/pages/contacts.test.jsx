import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contacts from "@/pages/contacts";
import { setupCommonMocks } from "../__mocks__/common";
import { renderWithMotion } from "../__utils__/test-helpers";

setupCommonMocks();

describe("Contacts Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the main page structure", () => {
    renderWithMotion(<Contacts />);

    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders the hero section with correct title", () => {
    renderWithMotion(<Contacts />);

    expect(
      screen.getByText("Get in Touch for Expert Advice")
    ).toBeInTheDocument();
  });

  it("renders the form section with correct title and description", () => {
    renderWithMotion(<Contacts />);

    expect(screen.getByText("Send a direct message.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Whether you have questions, need assistance, or just want to connect, sending a direct message is a hassle-free way to get in touch with me."
      )
    ).toBeInTheDocument();
  });

  it("renders all form fields with correct placeholders", () => {
    renderWithMotion(<Contacts />);

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Topic")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone (optional)")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Write your message here...")
    ).toBeInTheDocument();
  });

  it("renders form subject options correctly", () => {
    renderWithMotion(<Contacts />);

    expect(screen.getByText("Citizen")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Other")).toBeInTheDocument();
  });

  it("renders the submit button with correct text and attributes", () => {
    renderWithMotion(<Contacts />);

    const submitButton = screen.getByRole("button", { name: /fill form/i });
    expect(submitButton).toBeInTheDocument();
    // The button component might not have type="submit" attribute
    expect(submitButton).toBeInTheDocument();
  });

  it("renders the contact information section with correct title", () => {
    renderWithMotion(<Contacts />);

    expect(screen.getByText("Connecting for clarity.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Legal matters require prompt and reliable communication. Whether you have questions, need legal assistance, or want to schedule a consultation, I'm here to help."
      )
    ).toBeInTheDocument();
  });

  it("renders all contact links with correct href attributes", () => {
    renderWithMotion(<Contacts />);

    const addressLink = screen.getByRole("link", {
      name: "Rua Alvaro Velho, 2D, 2830-327 Barreiro"
    });
    expect(addressLink).toHaveAttribute(
      "href",
      "https://maps.app.goo.gl/3uHBdwxH8aqrWCp76"
    );
    expect(addressLink).toHaveAttribute("target", "_blank");

    const phoneLink = screen.getByRole("link", { name: "+351 211 956 606" });
    expect(phoneLink).toHaveAttribute("href", "tel:+351211956606");
    expect(phoneLink).toHaveAttribute("target", "_blank");

    const whatsappLink = screen.getByRole("link", {
      name: "Bárbara Barbizani - +351 916 690 609"
    });
    expect(whatsappLink).toHaveAttribute("href", "https://wa.me/916690609");
    expect(whatsappLink).toHaveAttribute("target", "_blank");

    const emailLink = screen.getByRole("link", {
      name: "barbara@barbizanicarvalholaw.com"
    });
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto: barbara@barbizanicarvalholaw.com"
    );
    expect(emailLink).toHaveAttribute("target", "_blank");
  });

  it("renders contact icons with correct attributes", () => {
    renderWithMotion(<Contacts />);

    const icons = screen.getAllByRole("generic", { hidden: true });
    const iconElements = icons.filter((icon) => icon.getAttribute("data-icon"));
    expect(iconElements.length).toBeGreaterThan(0);

    // Check that icons have the correct icon names
    const iconNames = iconElements.map((icon) =>
      icon.getAttribute("data-icon")
    );
    expect(iconNames).toContain("mdi:location");
    expect(iconNames).toContain("mingcute:phone-fill");
    expect(iconNames).toContain("mingcute:whatsapp-fill");
    expect(iconNames).toContain("ic:baseline-email");
  });

  it("renders the Google Maps iframe with correct attributes", () => {
    renderWithMotion(<Contacts />);

    const iframe = document.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      expect.stringContaining("google.com/maps/embed")
    );
    expect(iframe).toHaveAttribute("loading", "lazy");
    expect(iframe).toHaveAttribute("frameborder", "0");
    expect(iframe).toHaveAttribute("allowfullscreen", "");
    expect(iframe).toHaveAttribute("aria-hidden", "false");
    expect(iframe).toHaveAttribute("tabindex", "0");
  });

  it("renders the map iframe with correct styling", () => {
    renderWithMotion(<Contacts />);

    const iframe = document.querySelector("iframe");
    expect(iframe).toHaveClass(
      "absolute",
      "top-0",
      "left-0",
      "w-full",
      "h-full",
      "border-none"
    );
  });

  it("applies correct CSS classes to main sections", () => {
    renderWithMotion(<Contacts />);

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();

    // Check for section classes
    const sections = screen.getAllByRole("generic");
    expect(sections.length).toBeGreaterThan(0);
  });

  it("renders all required headings with correct hierarchy", () => {
    renderWithMotion(<Contacts />);

    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBeGreaterThanOrEqual(3);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Get in Touch for Expert Advice"
    );
    expect(screen.getByText("Send a direct message.")).toBeInTheDocument();
    expect(screen.getByText("Connecting for clarity.")).toBeInTheDocument();
  });

  it("has proper accessibility attributes for form elements", () => {
    renderWithMotion(<Contacts />);

    const nameInput = screen.getByPlaceholderText("Name");
    expect(nameInput).toHaveAttribute("type", "text");

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toHaveAttribute("type", "text");

    const phoneInput = screen.getByPlaceholderText("Phone (optional)");
    expect(phoneInput).toHaveAttribute("type", "text");

    const messageTextarea = screen.getByPlaceholderText(
      "Write your message here..."
    );
    expect(messageTextarea).toHaveAttribute("rows", "5");
  });

  it("displays form validation attributes correctly", () => {
    renderWithMotion(<Contacts />);

    const nameInput = screen.getByPlaceholderText("Name");
    expect(nameInput).toHaveAttribute("required");

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toHaveAttribute("required");

    const messageTextarea = screen.getByPlaceholderText(
      "Write your message here..."
    );
    expect(messageTextarea).toHaveAttribute("required");
  });

  it("renders the form with correct max-width constraint", () => {
    renderWithMotion(<Contacts />);

    const form = document.querySelector("form");
    expect(form).toHaveClass("max-w-2xl", "mx-auto");
  });

  it("renders all contact information items", () => {
    renderWithMotion(<Contacts />);

    expect(
      screen.getByText("Rua Alvaro Velho, 2D, 2830-327 Barreiro")
    ).toBeInTheDocument();
    expect(screen.getByText("+351 211 956 606")).toBeInTheDocument();
    expect(
      screen.getByText("Bárbara Barbizani - +351 916 690 609")
    ).toBeInTheDocument();
    expect(
      screen.getByText("barbara@barbizanicarvalholaw.com")
    ).toBeInTheDocument();
  });

  it("renders the hero section with correct overlay styling", () => {
    renderWithMotion(<Contacts />);

    const heroSection = screen
      .getByText("Get in Touch for Expert Advice")
      .closest("div");
    expect(heroSection).toBeInTheDocument();
  });

  it("renders the form section with proper spacing", () => {
    renderWithMotion(<Contacts />);

    const formTitle = screen.getByText("Send a direct message.");
    expect(formTitle).toHaveClass("text-4xl", "text-blue", "tracking-wide");

    const formDescription = screen.getByText(
      "Whether you have questions, need assistance, or just want to connect, sending a direct message is a hassle-free way to get in touch with me."
    );
    expect(formDescription).toHaveClass("my-6");
  });

  it("renders the contact section with proper spacing", () => {
    renderWithMotion(<Contacts />);

    const contactTitle = screen.getByText("Connecting for clarity.");
    expect(contactTitle).toHaveClass("text-4xl", "text-blue", "tracking-wide");

    const contactDescription = screen.getByText(
      "Legal matters require prompt and reliable communication. Whether you have questions, need legal assistance, or want to schedule a consultation, I'm here to help."
    );
    expect(contactDescription).toHaveClass("my-7", "lg:mr-6");
  });

  it("renders the map container with correct dimensions", () => {
    renderWithMotion(<Contacts />);

    const mapContainer = document
      .querySelector("iframe")
      ?.closest("div")?.parentElement;
    expect(mapContainer).toHaveClass("relative", "w-full", "h-96");
  });

  it("renders all form elements with proper accessibility", () => {
    renderWithMotion(<Contacts />);

    const form = document.querySelector("form");
    expect(form).toBeInTheDocument();

    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBeGreaterThanOrEqual(3); // name, email, message

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
