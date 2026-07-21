import {
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
  getUsedCategories
} from "@/lib/posts";

describe("blog posts loader", () => {
  it("lists the seeded Portuguese slugs", () => {
    const slugs = getPostSlugs("pt");
    expect(slugs).toContain("nacionalidade-portuguesa-barreiro");
    expect(slugs.length).toBeGreaterThanOrEqual(4);
  });

  it("returns all posts sorted by date descending", () => {
    const posts = getAllPosts("pt");
    expect(posts.length).toBeGreaterThanOrEqual(4);

    const dates = posts.map((p) => p.date);
    const sorted = [...dates].sort((a, b) => (a < b ? 1 : -1));
    expect(dates).toEqual(sorted);
  });

  it("excludes the markdown body from list metadata", () => {
    const posts = getAllPosts("pt");
    posts.forEach((post) => {
      expect(post).not.toHaveProperty("content");
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
    });
  });

  it("loads a single post with frontmatter, body and reading time", () => {
    const post = getPostBySlug("pt", "nacionalidade-portuguesa-barreiro");
    expect(post).not.toBeNull();
    expect(post.category).toBe("nationality");
    expect(post.content).toContain("nacionalidade portuguesa");
    expect(post.readingTime).toBeGreaterThan(0);
  });

  it("returns null for an unknown slug", () => {
    expect(getPostBySlug("pt", "does-not-exist")).toBeNull();
  });

  it("falls back to the default locale when a locale folder is missing", () => {
    const slugs = getPostSlugs("fr");
    expect(slugs).toContain("nacionalidade-portuguesa-barreiro");
  });

  it("derives the unique set of used categories", () => {
    const categories = getUsedCategories("en");
    expect(categories).toEqual(expect.arrayContaining(["nationality"]));
    expect(new Set(categories).size).toBe(categories.length);
  });
});
