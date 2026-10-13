"use client";

import { GradientText } from "@/components/animations";
import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Cloud, ExternalLink, GraduationCap, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

interface Item {
  title: string;
  issuer: string;
  meta: string;
  logo: string;
  icon: LucideIcon;
  href?: string;
}

const education: Item = {
  title: "Bachelor's in Computer Science, Faculty of Artificial Intelligence",
  issuer: "Minoufia University, Egypt",
  meta: "GPA 3.0 · Expected 2028",
  logo: "/images/logos/minoufia.png",
  icon: GraduationCap,
};

const certs: Item[] = [
  {
    title: "AWS Solutions Architect Associate",
    issuer: "Amazon Web Services",
    meta: "Issued 2026",
    logo: "/images/logos/aws-saa.png",
    icon: Cloud,
    href: "https://www.linkedin.com/posts/abdullah-sameh-0a3063366_aws-cloudcomputing-devops-ugcPost-7456233957702074368-vhk8",
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    meta: "Issued 2026",
    logo: "/images/logos/aws-ccp.png",
    icon: Cloud,
    href: "https://www.linkedin.com/posts/abdullah-sameh-0a3063366_aws-cloudcomputing-devops-ugcPost-7456233957702074368-vhk8",
  },
  {
    title: "AWS DevOps — 90%",
    issuer: "Cloud Native Base Camp",
    meta: "Issued 2025",
    logo: "/images/logos/cloud-native-basecamp.png",
    icon: Award,
    href: "https://www.linkedin.com/posts/abdullah-sameh-0a3063366_aws-devops-cloud-activity-7423716260628066304-7wOa",
  },
  {
    title: "McKinsey Forward Program",
    issuer: "McKinsey & Company",
    meta: "2024",
    logo: "/images/logos/mckinsey.png",
    icon: Award,
    href: "https://www.linkedin.com/posts/abdullah-sameh-0a3063366_im-happy-to-share-that-ive-obtained-a-new-activity-7347939496702742528-uBTr",
  },
];

function Logo({ src, Icon }: { src: string; Icon: LucideIcon }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white/10">
      {failed ? (
        <Icon className="h-7 w-7 text-primary" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${base}${src}`}
          alt=""
          className="h-full w-full object-cover"
          ref={(el) => {
            if (el?.complete && el.naturalWidth === 0) setFailed(true);
          }}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function ItemCard({ item, index = 0 }: { item: Item; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full">
        <CardContent className="flex h-full flex-col gap-4 pt-6">
          <div className="flex items-start gap-4">
            <Logo src={item.logo} Icon={item.icon} />
            <div>
              <h3 className="font-semibold leading-snug">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.issuer}</p>
              <p className="text-xs text-muted-foreground">{item.meta}</p>
            </div>
          </div>
          {item.href && (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all mt-auto mt-auto inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              View credential
            </a>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function EducationCerts() {
  return (
    <section className="py-20 bg-background glow divider-top">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education &amp; <GradientText>Certifications</GradientText></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Formal studies and verified cloud credentials
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-10">
          <ItemCard item={education} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {certs.map((c, i) => (
            <ItemCard key={c.title} item={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

