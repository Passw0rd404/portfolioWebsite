"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Box, Terminal, Zap } from "lucide-react";

const badges = [
  { Icon: Terminal, pos: "-left-3 top-10 sm:-left-6", delay: 0 },
  { Icon: Box, pos: "-right-3 top-1/3 sm:-right-6", delay: 0.6 },
  { Icon: Zap, pos: "-bottom-4 -right-3 sm:-right-6", delay: 1.2 },
];

export function ProfileFrame() {
  return (
    <div className="px-4 sm:px-8">
      <div
        tabIndex={0}
        className="group relative mx-auto w-full max-w-sm outline-none transition-transform duration-500 hover:scale-105 focus:scale-105"
      >
        {/* Glow */}
        <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-teal via-lavender to-teal opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-80 group-focus:opacity-80" />

        {/* Gradient border frame */}
        <div className="relative rounded-[1.75rem] bg-gradient-to-br from-teal via-lavender to-teal p-1">
          <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-card">
            <Image
              src="/images/abdullah.jpg"
              alt="Abdullah Sameh"
              fill
              priority
              sizes="(max-width: 768px) 80vw, 384px"
              className="object-cover transition-transform duration-700 group-hover:scale-110 group-focus:scale-110"
            />

            {/* Hover reveal */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/90 via-black/70 to-transparent px-5 pb-8 pt-12 text-white transition-transform duration-500 group-hover:translate-y-0 group-focus:translate-y-0">
              <p className="font-display text-xl font-bold">Abdullah Sameh</p>
              <p className="text-sm text-white/80">DevOps Engineer · Kubernetes · GitOps · AWS</p>
              <p className="mt-2 text-xs text-white/70">
                Open to internships, full-time, hybrid, remote &amp; freelance roles
              </p>
            </div>
          </div>
        </div>

        {/* Floating badges */}
        {badges.map(({ Icon, pos, delay }) => (
          <motion.div
            key={pos}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
            className={`absolute ${pos} rounded-xl border bg-card p-3 text-primary shadow-lg`}
          >
            <Icon className="h-5 w-5" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
