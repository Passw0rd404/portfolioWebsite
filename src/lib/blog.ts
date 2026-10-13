import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { BlogPostMeta } from "@/data/blog";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function parseFile(slug: string) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
    const words = content.trim().split(/\s+/).length;
    const date =
    data.date instanceof Date
          ? data.date.toISOString().slice(0, 10)
      : String(data.date ?? "");

    const meta: BlogPostMeta = {
      slug,
      title: data.title ?? slug,
      summary: data.summary ?? "",
      date,
      cover: data.cover,
      tags: data.tags ?? [],
      published: data.published !== false,
      readTime: `${Math.max(1, Math.round(words / 200))} min read`,
    };
    return { meta, content };
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parseFile(f.replace(/\.md$/, "")).meta)
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { meta, content } = parseFile(slug);
    if (!meta.published) return null;
  return { ...meta, html: marked.parse(content, { async: false }) as string };
}
