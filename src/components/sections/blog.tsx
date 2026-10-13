"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, ChevronDown } from "lucide-react";
import { ANIMATION_VARIANTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LavenderBadge } from "@/components/ui/lavender-badge";
import type { BlogPostMeta } from "@/data/blog";

const PAGE_SIZE = 6;

export function BlogSection({ posts }: { posts: BlogPostMeta[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visiblePosts = posts.slice(0, visibleCount);
  const remaining = posts.length - visibleCount;

  return (
    <section className="py-20 px-4 bg-muted/30 grid-bg glow min-h-[calc(100vh-5rem)]">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={ANIMATION_VARIANTS.fadeUp}
          className="text-center mb-12 w-full"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Latest <span className="gradient-text">Posts</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Write-ups and lessons from the projects I build.
          </p>
        </motion.div>

        {posts.length === 0 && (
          <p className="text-center text-muted-foreground">No posts yet. Stay tuned!</p>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={ANIMATION_VARIANTS.fadeUp}
              transition={{ delay: (index % PAGE_SIZE) * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <Card className="group h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50">
                  {/* Cover */}
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10">
                    {post.cover ? (
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl opacity-20">📝</span>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          timeZone: "UTC",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </CardHeader>

                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 4).map((tag) => (
                        <LavenderBadge key={tag}>{tag}</LavenderBadge>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-border/50 flex items-center gap-1.5 text-sm font-medium text-primary">
                      Read post
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Show more */}
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
