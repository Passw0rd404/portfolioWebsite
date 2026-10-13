import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <section className="glow flex min-h-[70vh] items-center justify-center px-4 pt-32 pb-20">
      <div className="max-w-xl text-center">
        <h1 className="font-display text-4xl font-bold mb-4">Blog</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Write-ups and video walkthroughs for each of my projects are coming soon.
        </p>
        <Link
          href="/projects"
          className="hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all inline-flex items-center rounded-md border px-6 py-3 text-sm font-medium"
        >
          View projects
        </Link>
      </div>
    </section>
  );
}
