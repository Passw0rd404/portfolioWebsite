"use client";

import { ProfileFrame } from "@/components/common/profile-frame";
import Link from "next/link";
import { motion } from "framer-motion";
import { ANIMATION_VARIANTS } from "@/lib/constants";
import { ScrollReveal, GradientText } from "@/components/animations";

export function About() {
  return (
    <section className="py-20 px-4 glow">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal delay={0.1}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={ANIMATION_VARIANTS.fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              About <GradientText>Me</GradientText>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A DevOps engineer who turns fragile, manual setups into automated, repeatable infrastructure.
            </p>
          </motion.div>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={ANIMATION_VARIANTS.fadeUp}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-4">
            <p className="text-lg leading-relaxed">
              Hi! I&apos;m Abdullah Sameh, a DevOps engineer and Computer Science student at
              Minoufia University in Egypt. I like turning fragile, manual setups into automated
              systems that anyone can run, repeat, and fix.
            </p>
            <p className="text-lg leading-relaxed">
              My projects are my experience. I deployed Mastodon, a federated social network, on
              Kubernetes with autoscaling, a highly available self-hosted data layer, and GitOps
              through ArgoCD. I also built a 3-tier AWS architecture for a MERN e-commerce app with
              Terraform, Packer, and CodeDeploy, and wired up Grafana Cloud over AWS PrivateLink
              for monitoring.
            </p>
            <p className="text-lg leading-relaxed">
              I&apos;m comfortable with the full Grafana LGTM stack (Loki, Grafana, Tempo, Mimir),
              I hold the AWS Solutions Architect Associate and Cloud Practitioner certifications,
              and I focus on cloud-agnostic, maintainable infrastructure with an automation-first
              mindset.
            </p>
            <p className="text-lg leading-relaxed">
              I&apos;m open to internships and full-time roles (remote, hybrid, or on-site), and I
              also take freelance work. You can reach me through the{" "}
              <Link href="/contact" className="text-primary underline underline-offset-4">
                contact page
              </Link>
              .
            </p>
          </div>

          <ProfileFrame />
        </motion.div>
      </div>
    </section>
  );
}
