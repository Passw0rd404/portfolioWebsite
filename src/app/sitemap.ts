import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";
import { getAllBooks } from "@/lib/books";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/experience", "/projects", "/blog", "/books", "/contact"].map((path) => ({
    url: `${SITE_CONFIG.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const posts = getAllPosts().map((post) => ({
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const books = getAllBooks().map((book) => ({
    url: `${SITE_CONFIG.url}/books/${book.slug}`,
    lastModified: new Date(book.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...posts, ...books];
}
