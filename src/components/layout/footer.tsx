import Link from "next/link";
import { Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import { SITE_CONFIG, NAV_ITEMS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const link = "text-muted-foreground hover:text-primary transition-colors";

  return (
    <footer className="mt-auto border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <h3 className="font-display text-lg font-bold gradient-text">{SITE_CONFIG.name}</h3>
            <p className="text-sm text-muted-foreground">
              DevOps Engineer shipping cloud-native infrastructure with Kubernetes, GitOps &amp;
              automation-first pipelines.
            </p>
            <code className="block font-mono text-xs text-muted-foreground">
              <span className="text-primary">$</span> terraform apply --auto-approve
            </code>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Open to new opportunities
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className={`text-sm ${link}`}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Connect</h3>
            <a
              href={`mailto:${SITE_CONFIG.links.email}`}
              className={`flex items-center space-x-2 text-sm ${link}`}
            >
              <Mail className="h-4 w-4" />
              <span>{SITE_CONFIG.links.email}</span>
            </a>
            <div className="flex space-x-4 pt-2">
              <a href={SITE_CONFIG.links.github} target="_blank" rel="noopener noreferrer" className={link} aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href={SITE_CONFIG.links.linkedin} target="_blank" rel="noopener noreferrer" className={link} aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <Link href="/contact" className={link} aria-label="Contact me">
                <MessageSquare className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Built with 💜 using Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
