export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  logo?: string;
  type?: "internship" | "part-time" | "full-time" | "freelance";
}

export const experienceData: Experience[] = [
  {
    id: "upwork-freelance",
    company: "Upwork",
    role: "Freelance DevOps Engineer",
    duration: "Oct 2026 - Present",
    location: "Remote",
    description:
      "Freelancing on Upwork and open to any DevOps or cloud job, from a quick pipeline fix to a full infrastructure build.",
    achievements: [
      "Taking on DevOps and cloud infrastructure work end to end: design, automation, deployment, and monitoring",
      "Applying the same practices used in my own Kubernetes and AWS projects: infrastructure as code, GitOps, CI/CD, and observability"
    ],
    technologies: ["Kubernetes", "AWS", "CI/CD", "IaC", "GitOps", "Observability"],
    type: "freelance"
  }
];

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

export const servicesData: Service[] = [
  {
    id: "cicd",
    icon: "🔄",
    title: "CI/CD Pipelines",
    description: "Automated build, test, and deploy pipelines, with GitOps delivery for Kubernetes.",
    tags: ["GitHub Actions", "ArgoCD", "GitOps"]
  },
  {
    id: "cloud",
    icon: "☁️",
    title: "Cloud Infrastructure",
    description: "Production-ready AWS architectures built as code: networking, compute, scaling, and secure deployments.",
    tags: ["AWS", "Terraform", "Packer"]
  },
  {
    id: "k8s",
    icon: "☸️",
    title: "Kubernetes & GitOps",
    description: "Cluster deployments with Helm, autoscaling, high availability, and ArgoCD-driven delivery.",
    tags: ["Kubernetes", "Helm", "ArgoCD"]
  },
  {
    id: "containers",
    icon: "🐳",
    title: "Containerization",
    description: "Dockerize your apps and orchestrate multi-service setups for development and production.",
    tags: ["Docker", "Docker Compose"]
  },
  {
    id: "observability",
    icon: "📊",
    title: "Monitoring & Observability",
    description: "Metrics, logs, and traces with the Grafana LGTM stack, Prometheus, and OpenTelemetry, plus alerting.",
    tags: ["LGTM", "Prometheus", "OpenTelemetry"]
  },
  {
    id: "automation",
    icon: "⚙️",
    title: "Automation & Scripting",
    description: "Bash and Python automation to replace repetitive manual operations.",
    tags: ["Bash", "Python"]
  }
];
