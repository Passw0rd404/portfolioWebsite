"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Mail } from "lucide-react";
import { experienceData, servicesData } from "@/data/experience";
import { ANIMATION_VARIANTS } from "@/lib/constants";
import { GradientText } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const reveal = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.3 },
  variants: ANIMATION_VARIANTS.fadeUp,
} as const;

export function Experience() {
  return (
    <section className="py-20 px-4 grid-bg">
      <div className="container mx-auto max-w-5xl">
        <motion.div {...reveal} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Work <GradientText>Experience</GradientText>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Open to any DevOps or cloud job: internships, full-time, or freelance.
          </p>
        </motion.div>

        {experienceData.map((exp) => (
          <motion.div key={exp.id} {...reveal} className="mb-20">
            <Card className="mx-auto max-w-3xl border-primary/30">
              <CardContent className="p-6 md:p-8">
                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>
                  Current · Open for any job
                </div>
                <h3 className="text-2xl font-semibold">{exp.role}</h3>
                <p className="mt-1 flex items-center gap-1 font-medium text-primary">
                  <Briefcase className="h-4 w-4" />
                  {exp.company}
                </p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {exp.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {exp.location}
                  </span>
                </div>
                <p className="mt-4 text-muted-foreground">{exp.description}</p>
                <ul className="mt-4 space-y-2">
                  {exp.achievements.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 text-primary">•</span>
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.technologies.map((t) => (
                    <span key={t} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <Button asChild>
                    <Link href="/contact">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact me
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <motion.div {...reveal} className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-3">
            What I Can Do <GradientText>For You</GradientText>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pricing depends on the job, so let&apos;s talk about yours.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-3 text-4xl">{s.icon}</div>
                  <h4 className="mb-2 text-lg font-semibold">{s.title}</h4>
                  <p className="mb-4 text-sm text-muted-foreground">{s.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary">
                        {t}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div {...reveal} className="mt-16 rounded-2xl border bg-muted/40 p-8 text-center">
          <h3 className="mb-2 text-2xl font-semibold">Have a job in mind?</h3>
          <p className="mb-6 text-muted-foreground">
            Anything DevOps or cloud is welcome, big or small.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" />
                Send a message
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
