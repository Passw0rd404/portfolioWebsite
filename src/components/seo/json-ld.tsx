import { SITE_CONFIG } from "@/lib/constants";

export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.links.email,
    jobTitle: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    sameAs: [SITE_CONFIG.links.github, SITE_CONFIG.links.linkedin],
    alumniOf: { "@type": "EducationalOrganization", name: "Minoufia University" },
    knowsAbout: ["DevOps", "Kubernetes", "GitOps", "ArgoCD", "AWS", "Terraform", "Docker", "CI/CD", "Observability"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
