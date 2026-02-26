import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/components/Button";
import { renderWithMotion } from "../__utils__/test-helpers";

jest.mock("next-intl", () => ({
  useTranslations: () => (key) => {
    const labels = { "submit": "Submit", "send": "Send", "loading": "Loading" };
    return labels[key] || key;
  }
}));

describe("Button", () => {
  it("renders without crashing", () => {
    renderWithMotion(<Button label="submit" />);
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("renders with translated label", () => {
    renderWithMotion(<Button label="send" />);
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("applies default (gold) variant when variant is falsy", () => {
    renderWithMotion(<Button label="submit" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-gold");
  });

  it("applies blue variant when variant is true", () => {
    renderWithMotion(<Button label="submit" variant />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-blue");
  });

  it("applies custom className", () => {
    renderWithMotion(<Button label="submit" className="custom-class" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    renderWithMotion(<Button label="submit" onClick={onClick} />);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    renderWithMotion(<Button label="submit" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows loading state when loading is true", () => {
    renderWithMotion(<Button label="submit" loading />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    // When loading, button does not show the label text
    expect(button).not.toHaveTextContent("Submit");
  });
});
