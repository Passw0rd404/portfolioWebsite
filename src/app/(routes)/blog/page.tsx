import type { Metadata } from "next";
import { BlogSection } from "@/components/sections/blog";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="pt-20 min-h-screen">
      <BlogSection posts={posts} />
    </div>
  );
}
