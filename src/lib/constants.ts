export const SITE_CONFIG = {
  name: "Abdullah Sameh",
  title: "DevOps Engineer",
  description: "DevOps Engineer focused on Kubernetes, GitOps, and Cloud Automation. Open to internships, full-time, and freelance roles.",
  url: "https://abdullahsameh.tech",
  ogImage: "/images/og-image.png",
  formKey: "7cf01b40-af05-46f6-a7d6-0ae4f82d5151",
  links: {
    email: "abdullah.sameh40404@gmail.com",
    github: "https://github.com/Passw0rd404",
    linkedin: "https://linkedin.com/in/abdullah-sameh-0a3063366"
  }
};

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Books", href: "/books" },
  { label: "Contact", href: "/contact" }
];

export const ANIMATION_VARIANTS = {
  fadeUp: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  fadeDown: { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } },
  fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  scaleIn: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }
};
