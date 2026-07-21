import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const DEFAULT_LOCALE = "pt";
const WORDS_PER_MINUTE = 200;

function getLocaleDir(locale) {
  const dir = path.join(BLOG_DIR, locale);
  if (fs.existsSync(dir)) {
    return dir;
  }
  return path.join(BLOG_DIR, DEFAULT_LOCALE);
}

function estimateReadingTime(content) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function getPostSlugs(locale = DEFAULT_LOCALE) {
  const dir = getLocaleDir(locale);
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getPostBySlug(locale = DEFAULT_LOCALE, slug) {
  const dir = getLocaleDir(locale);
  const fullPath = path.join(dir, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    date: data.date ? String(data.date) : "",
    category: data.category || "",
    image: data.image || "",
    author: data.author || "",
    readingTime: estimateReadingTime(content),
    content
  };
}

export function getAllPosts(locale = DEFAULT_LOCALE) {
  return getPostSlugs(locale)
    .map((slug) => {
      const post = getPostBySlug(locale, slug);
      if (!post) return null;
      // Metadata only for listings; drop the body to keep props light.
      const { content, ...meta } = post;
      return meta;
    })
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getUsedCategories(locale = DEFAULT_LOCALE) {
  const categories = getAllPosts(locale).map((post) => post.category);
  return [...new Set(categories.filter(Boolean))];
}
