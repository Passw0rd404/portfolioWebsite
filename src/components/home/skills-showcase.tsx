"use client";

import { motion } from "framer-motion";
import { GradientText } from "@/components/animations";
import { SkillsGrid } from "@/components/common/skills-grid";

export function SkillsShowcase() {
  return (
    <section className="py-20 bg-muted/50 grid-bg glow divider-top">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <GradientText>Skills</GradientText>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cloud-native tooling for infrastructure, delivery, and observability
          </p>
        </motion.div>

        <SkillsGrid />

        <p className="text-center text-muted-foreground mt-12">
          Currently deepening advanced Kubernetes patterns and cloud-native security
        </p>
      </div>
    </section>
  );
}
