"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Route, ScrollText, type LucideIcon } from "lucide-react";
import { skillsData, type Skill } from "@/data/skills";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const FALLBACK: Record<string, LucideIcon> = { Loki: ScrollText, Tempo: Route };

const iconUrl = (icon: string) =>
  icon.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${icon}` : `${CDN}/${icon}`;

function SkillTile({ skill, index }: { skill: Skill; index: number }) {
  const [failed, setFailed] = useState(false);
  const Fallback = FALLBACK[skill.name];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group flex w-24 flex-col items-center gap-2"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border/60 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-md">
        {skill.icon && !failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={iconUrl(skill.icon)}
            alt=""
            loading="lazy"
            className="h-9 w-9 object-contain"
            ref={(el) => {
              if (el?.complete && el.naturalWidth === 0) setFailed(true);
            }}
            onError={() => setFailed(true)}
          />
        ) : Fallback ? (
          <Fallback className="h-8 w-8 text-primary" />
        ) : (
          <span className="text-xl font-bold text-primary">{skill.name.charAt(0)}</span>
        )}
      </div>
      <span className="text-center text-xs font-medium text-muted-foreground">{skill.name}</span>
    </motion.div>
  );
}

const flat = Array.from(
  new Map(skillsData.flatMap((c) => c.skills).map((s) => [s.name, s])).values()
);

export function SkillsGrid({ grouped = false }: { grouped?: boolean }) {
  if (!grouped) {
    return (
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-4 gap-y-6">
        {flat.map((s, i) => (
          <SkillTile key={s.name} skill={s} index={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      {skillsData.map((cat) => (
        <div key={cat.title}>
          <h3 className="text-center text-lg font-semibold">
            {cat.icon} {cat.title}
          </h3>
          {cat.note && <p className="text-center text-sm text-muted-foreground">{cat.note}</p>}
          <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-6">
            {cat.skills.map((s, i) => (
              <SkillTile key={s.name} skill={s} index={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
