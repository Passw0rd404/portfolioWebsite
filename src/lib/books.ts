import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { BookMeta } from "@/data/books";

const BOOKS_DIR = path.join(process.cwd(), "content", "books");

function parseFile(slug: string) {
  const raw = fs.readFileSync(path.join(BOOKS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).length;
  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date ?? "");

  const meta: BookMeta = {
    slug,
    title: data.title ?? slug,
    author: data.author ?? "",
    summary: data.summary ?? "",
    date,
    cover: data.cover,
    tags: data.tags ?? [],
    rating: typeof data.rating === "number" ? data.rating : undefined,
    published: data.published !== false,
    readTime: `${Math.max(1, Math.round(words / 200))} min read`,
  };
  return { meta, content };
}

export function getAllBooks(): BookMeta[] {
  if (!fs.existsSync(BOOKS_DIR)) return [];
  return fs
    .readdirSync(BOOKS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parseFile(f.replace(/\.md$/, "")).meta)
    .filter((b) => b.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBook(slug: string) {
  const file = path.join(BOOKS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { meta, content } = parseFile(slug);
  if (!meta.published) return null;
  return { ...meta, html: marked.parse(content, { async: false }) as string };
}
