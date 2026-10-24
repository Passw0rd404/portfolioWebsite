import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, Star } from "lucide-react";
import { LavenderBadge } from "@/components/ui/lavender-badge";
import { getAllBooks, getBook } from "@/lib/books";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBooks().map((b) => ({ slug: b.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  return book ? { title: book.title, description: book.summary } : {};
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  return (
    <div className="pt-20 min-h-screen">
      <section className="py-16 px-4 bg-muted/30 grid-bg glow">
        <div className="container mx-auto max-w-3xl">
          <Link
            href="/books"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            All books
          </Link>

          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">{book.title}</h1>
          {book.author && (
            <p className="text-lg text-muted-foreground mb-4">by {book.author}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(book.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {book.readTime}
            </span>
            {book.rating !== undefined && (
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4" />
                {book.rating}/5
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-8">
            {book.tags.map((tag) => (
              <LavenderBadge key={tag}>{tag}</LavenderBadge>
            ))}
          </div>

          {book.cover && (
            <div className="relative aspect-video mb-10 overflow-hidden rounded-xl border border-border/50">
              <Image src={book.cover} alt={book.title} fill className="object-cover" priority />
            </div>
          )}

          <article
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-display
              prose-a:text-primary
              prose-img:rounded-xl
              prose-code:before:content-none prose-code:after:content-none"
            dangerouslySetInnerHTML={{ __html: book.html }}
          />
        </div>
      </section>
    </div>
  );
}
