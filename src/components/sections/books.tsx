"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, ChevronDown, Star } from "lucide-react";
import { ANIMATION_VARIANTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LavenderBadge } from "@/components/ui/lavender-badge";
import type { BookMeta } from "@/data/books";

const PAGE_SIZE = 6;

export function BooksSection({ books }: { books: BookMeta[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleBooks = books.slice(0, visibleCount);
  const remaining = books.length - visibleCount;

  return (
    <section className="py-20 px-4 bg-muted/30 grid-bg glow min-h-[calc(100vh-5rem)]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={ANIMATION_VARIANTS.fadeUp}
          className="text-center mb-12 w-full"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Books <span className="gradient-text">I Read</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My notes and takeaways from the books I read.
          </p>
        </motion.div>

        {books.length === 0 && (
          <p className="text-center text-muted-foreground">No books yet. Stay tuned!</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {visibleBooks.map((book, index) => (
            <motion.div
              key={book.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={ANIMATION_VARIANTS.fadeUp}
              transition={{ delay: (index % 2) * 0.1 }}
            >
              <Link href={`/books/${book.slug}`} className="block h-full">
                <Card className="group h-full flex flex-row gap-0 overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50">
                  {/* Cover (left) */}
                  <div className="w-32 sm:w-40 shrink-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10">
                    <div className="relative aspect-[2/3] w-full overflow-hidden">
                      {book.cover ? (
                        <Image
                          src={book.cover}
                          alt={book.title}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 128px, 160px"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-5xl opacity-20">📚</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details (right) */}
                  <div className="flex flex-col flex-1 min-w-0 p-4 sm:p-5">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] sm:text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(book.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          timeZone: "UTC",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {book.readTime}
                      </span>
                      {book.rating !== undefined && (
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5" />
                          {book.rating}/5
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-xl font-bold line-clamp-2 break-words group-hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                    {book.author && (
                      <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                    )}

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3">
                      {book.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {book.tags.slice(0, 3).map((tag) => (
                        <LavenderBadge key={tag}>{tag}</LavenderBadge>
                      ))}
                    </div>

                    <div className="mt-auto pt-3 border-t border-border/50 flex items-center gap-1.5 text-sm font-medium text-primary">
                      See notes
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {remaining > 0 && (
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
            >
              Show more
              <span className="text-muted-foreground text-xs">({remaining} left)</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
