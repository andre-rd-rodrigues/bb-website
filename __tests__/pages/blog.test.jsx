import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "@/pages/blog";
import { renderWithMotion } from "../__utils__/test-helpers";
import { setupCommonMocks } from "../__mocks__/common";

setupCommonMocks();

jest.mock("next/router", () => ({
  useRouter: () => ({ locale: "en", pathname: "/blog" })
}));

const mockPosts = [
  {
    slug: "nationality-guide",
    title: "Nationality Guide",
    description: "How to apply.",
    image: "/img/a.jpg",
    date: "2026-06-28",
    category: "nationality",
    readingTime: 3
  },
  {
    slug: "tenant-rights",
    title: "Tenant Rights",
    description: "Know your rights.",
    image: "/img/b.jpg",
    date: "2026-06-10",
    category: "housing",
    readingTime: 4
  }
];

const mockCategories = ["nationality", "housing"];

describe("Blog index page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the main structure and all posts by default", () => {
    renderWithMotion(<Blog posts={mockPosts} categories={mockCategories} />);
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByText("Nationality Guide")).toBeInTheDocument();
    expect(screen.getByText("Tenant Rights")).toBeInTheDocument();
  });

  it("renders a filter button per used category plus an 'all' option", () => {
    renderWithMotion(<Blog posts={mockPosts} categories={mockCategories} />);
    expect(screen.getByRole("button", { name: "all" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "nationality" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "housing" })).toBeInTheDocument();
  });

  it("narrows the visible posts when a category is selected", async () => {
    const user = userEvent.setup();
    renderWithMotion(<Blog posts={mockPosts} categories={mockCategories} />);

    await user.click(screen.getByRole("button", { name: "housing" }));

    expect(screen.getByText("Tenant Rights")).toBeInTheDocument();
    expect(screen.queryByText("Nationality Guide")).not.toBeInTheDocument();
  });

  it("filters posts by a free-text search query", async () => {
    const user = userEvent.setup();
    renderWithMotion(<Blog posts={mockPosts} categories={mockCategories} />);

    await user.type(screen.getByRole("textbox"), "tenant");

    expect(screen.getByText("Tenant Rights")).toBeInTheDocument();
    expect(screen.queryByText("Nationality Guide")).not.toBeInTheDocument();
  });

  it("shows the empty state when nothing matches the search", async () => {
    const user = userEvent.setup();
    renderWithMotion(<Blog posts={mockPosts} categories={mockCategories} />);

    await user.type(screen.getByRole("textbox"), "zzzzz");

    expect(screen.queryByText("Tenant Rights")).not.toBeInTheDocument();
    expect(screen.queryByText("Nationality Guide")).not.toBeInTheDocument();
    expect(screen.getByText("empty")).toBeInTheDocument();
  });
});
