import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { LavenderBadge } from "@/components/ui/lavender-badge";
import { getAllPosts, getPost } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return post ? { title: post.title, description: post.summary } : {};
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="pt-20 min-h-screen">
      <section className="py-16 px-4 bg-muted/30 grid-bg glow">
        <div className="container mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            All posts
          </Link>

          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-8">
            {post.tags.map((tag) => (
              <LavenderBadge key={tag}>{tag}</LavenderBadge>
            ))}
          </div>

          {post.cover && (
          <div className="relative aspect-video mb-10 overflow-hidden rounded-xl border border-border/50">
              <Image src={post.cover} alt={post.title} fill className="object-cover" priority />
            </div>
          )}

          <article
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-display
              prose-a:text-primary
              prose-img:rounded-xl
              prose-code:before:content-none prose-code:after:content-none"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </section>
    </div>
  );
}
