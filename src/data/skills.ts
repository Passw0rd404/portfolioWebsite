export interface Skill {
  name: string;
  level?: number;
  icon?: string; // devicon path ("docker/docker-original.svg") or local path starting with "/"
}

export interface SkillCategory {
  title: string;
  icon: string;
  note?: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Cloud",
    icon: "☁️",
    note: "EC2 · S3 · IAM · VPC · EKS · CloudFront · CodeDeploy",
    skills: [{ name: "AWS", icon: "amazonwebservices/amazonwebservices-original-wordmark.svg" }]
  },
  {
    title: "Containers & Orchestration",
    icon: "🐳",
    skills: [
      { name: "Docker", icon: "docker/docker-original.svg" },
      { name: "Kubernetes", icon: "kubernetes/kubernetes-original.svg" },
      { name: "Helm", icon: "helm/helm-original.svg" },
      { name: "Kustomize", icon: "/images/skills/kustomize.svg" }
    ]
  },
  {
    title: "Infrastructure as Code",
    icon: "🏗️",
    skills: [
      { name: "Terraform", icon: "terraform/terraform-original.svg" },
      { name: "Packer", icon: "packer/packer-original.svg" }
    ]
  },
  {
    title: "CI/CD & GitOps",
    icon: "🔄",
    skills: [
      { name: "GitHub Actions", icon: "githubactions/githubactions-original.svg" },
      { name: "ArgoCD", icon: "argocd/argocd-original.svg" }
    ]
  },
  {
    title: "Observability",
    icon: "📊",
    note: "Full Grafana LGTM stack: Loki · Grafana · Tempo · Mimir, plus Alloy",
    skills: [
      { name: "Prometheus", icon: "prometheus/prometheus-original.svg" },
      { name: "Grafana", icon: "grafana/grafana-original.svg" },
      { name: "Loki", icon: "/images/skills/loki.svg" },
      { name: "Tempo", icon: "/images/skills/tempo.svg" },
      { name: "OpenTelemetry", icon: "opentelemetry/opentelemetry-original.svg" }
    ]
  },
  {
    title: "Scripting",
    icon: "💻",
    skills: [
      { name: "Python", icon: "python/python-original.svg" },
      { name: "Bash", icon: "bash/bash-original.svg" }
    ]
  }
];
