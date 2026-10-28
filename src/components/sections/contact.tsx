"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2, FileText, Github, Linkedin, Loader2, Mail, MapPin, Send,
} from "lucide-react";
import { ANIMATION_VARIANTS, SITE_CONFIG } from "@/lib/constants";
import { GradientText } from "@/components/animations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Status = "idle" | "sending" | "success" | "error";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const field =
  "w-full rounded-md border bg-background px-3 py-2 text-base sm:text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";
const chip = "rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary";
const card =
  "flex items-center gap-4 rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md";

const openTo = ["Internships", "Full-time", "Part-time", "Freelance", "Remote", "Hybrid", "On-site"];
const roles = ["DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer", "Platform Engineer"];

const channels = [
  { icon: Mail, label: "Email", value: SITE_CONFIG.links.email, href: `mailto:${SITE_CONFIG.links.email}` },
  { icon: Linkedin, label: "LinkedIn", value: "abdullah-sameh", href: SITE_CONFIG.links.linkedin },
  { icon: Github, label: "GitHub", value: "Passw0rd404", href: SITE_CONFIG.links.github },
  { icon: FileText, label: "Resume", value: "Download my CV (PDF)", href: `${base}/final.pdf` },
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const configured = !SITE_CONFIG.formKey.startsWith("PASTE");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return;

    const name = String(data.get("name"));
    const email = String(data.get("email"));
    const message = String(data.get("message"));

    if (!configured) {
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${SITE_CONFIG.links.email}?subject=${encodeURIComponent(
        `Portfolio message from ${name}`
      )}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: SITE_CONFIG.formKey,
          subject: `New portfolio message from ${name}`,
          from_name: "Portfolio Contact Form",
          name,
          email,
          message,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-20 px-4 grid-bg">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={ANIMATION_VARIANTS.fadeUp}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Get In <GradientText>Touch</GradientText>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Looking for a DevOps engineer? Let&apos;s talk: internship, full-time, or freelance,
            remote, hybrid, or on-site.
          </p>
        </motion.div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-lavender/10 p-6 text-center"
        >
          <p className="mb-4 flex items-center justify-center gap-2 font-semibold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            Open to new opportunities
          </p>
          <div className="mb-3 flex flex-wrap justify-center gap-2">
            {openTo.map((t) => (
              <span key={t} className={chip}>{t}</span>
            ))}
          </div>
          <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Roles I&apos;m looking for</p>
          <div className="flex flex-wrap justify-center gap-2">
            {roles.map((r) => (
              <span key={r} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">{r}</span>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {channels.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={card}
              >
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">{c.label}</p>
                  <p className="truncate font-medium">{c.value}</p>
                </div>
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: channels.length * 0.08 }}
              className={card}
            >
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Based in</p>
                <p className="font-medium">Cairo, Egypt</p>
              </div>
            </motion.div>
          </div>

          <Card className="lg:col-span-3">
            <CardContent className="p-6 md:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <CheckCircle2 className="mb-4 h-12 w-12 text-green-500" />
                  <h3 className="mb-2 text-xl font-semibold">Message sent!</h3>
                  <p className="mb-6 text-muted-foreground">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <Button variant="outline" onClick={() => setStatus("idle")}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <h3 className="text-xl font-semibold">Send me a message</h3>
                  <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <input id="name" name="name" required className={field} placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <input id="email" name="email" type="email" required className={field} placeholder="you@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className={`${field} resize-none`}
                      placeholder="Tell me about the role or project..."
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-sm text-destructive">
                      Something went wrong. Please email me directly at{" "}
                      <a className="underline" href={`mailto:${SITE_CONFIG.links.email}`}>
                        {SITE_CONFIG.links.email}
                      </a>
                      .
                    </p>
                  )}
                  <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
