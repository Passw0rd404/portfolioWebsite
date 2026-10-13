"use client";

import { motion } from "framer-motion";
import { ANIMATION_VARIANTS } from "@/lib/constants";
import { GradientText } from "@/components/animations";
import { SkillsGrid } from "@/components/common/skills-grid";

export function Skills() {
  return (
    <section className="py-20 px-4 bg-muted/30 grid-bg glow divider-top">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={ANIMATION_VARIANTS.fadeUp}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Technical <GradientText>Skills</GradientText>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            The tools I use to build, ship, and observe cloud-native systems.
          </p>
        </motion.div>

        <SkillsGrid grouped />
      </div>
    </section>
  );
}
