export type Category = "devops" | "cloud" | "kubernetes" | "ai";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  category: Category[];
}

export const projects: Project[] = [
  {
    id: "mastodon-k8s",
    title: "Mastodon — Production Kubernetes Deployment",
    description: "Cloud-agnostic Kubernetes deployment of a federated social platform with autoscaling, a fully self-hosted data layer, and GitOps.",
    longDescription: "A Kubernetes deployment of Mastodon designed to run on any cloud cluster, with autoscaling for web, streaming, and Sidekiq, a self-hosted highly available data layer, and two ArgoCD-synced CI/CD pipelines.",
    technologies: ["Kubernetes", "GitOps", "CI/CD", "Observability", "High Availability", "Autoscaling"],
    features: [
      "Autoscaling for web, streaming, and Sidekiq on any cloud cluster",
      "Self-hosted HA data layer: PostgreSQL (CloudNativePG), Redis (Sentinel + HAProxy), Elasticsearch (ECK)",
      "Spot nodes for the stateless tier, On-Demand nodes for stateful services",
      "Self-hosted LGTM observability stack plus basic ChatOps",
      "Separate app and infra GitHub Actions pipelines synced through ArgoCD",
      "TLS via cert-manager, secrets via Sealed Secrets"
    ],
    image: "/images/projects/mastodon-k8s.png",
    githubUrl: "https://github.com/Passw0rd404/mastodon-SRE",
    category: ["kubernetes", "devops"]
  },
  {
    id: "mern-aws",
    title: "MERN E-Commerce — AWS 3-Tier Architecture",
    description: "Production-grade AWS deployment with CloudFront, NLB, and Auto Scaling, built as code and monitored through Grafana Cloud.",
    longDescription: "A full-stack MERN app on a 3-tier AWS architecture with separate frontend and backend pipelines, infrastructure as code, private-network observability, and security scanning built into CI.",
    technologies: ["Cloud", "IaC", "CI/CD", "Observability", "Security Scanning"],
    features: [
      "CloudFront → NLB → EC2 Auto Scaling Group in a private subnet, with ElastiCache and MongoDB Atlas via PrivateLink",
      "Frontend via S3 + CloudFront invalidation, backend deployed in-place one instance at a time with CodeDeploy",
      "Grafana Cloud over AWS PrivateLink, with Grafana Alloy on each instance forwarding telemetry",
      "MongoDB Atlas managed with Terraform; OIDC auth, IaC scanning (TFLint, Terrascan, Checkov), and quality gates (ESLint, Semgrep, OpenSSF Scorecard)"
    ],
    image: "/images/projects/mern-aws.png",
    githubUrl: "https://github.com/Passw0rd404/mern-ecommerce-DevOps-version",
    category: ["cloud", "devops"]
  },
  {
    id: "hivebox",
    title: "HiveBox — IoT Temperature API",
    description: "FastAPI service built from scratch that aggregates real-time sensor data, with Valkey caching and a full local observability stack.",
    longDescription: "A FastAPI application aggregating real-time temperature data from global IoT sensors, containerized and deployed on kind with caching and monitoring.",
    technologies: ["Kubernetes", "Containerization", "Observability", "Caching", "REST API"],
    features: [
      "Real-time temperature data from global IoT sensors (OpenSenseMap API)",
      "Valkey caching, Prometheus metrics, and a Grafana dashboard",
      "Full observability stack running locally, no cloud dependency"
    ],
    image: "/images/projects/hivebox.png",
    githubUrl: "https://github.com/Passw0rd404/HiveBox",
    category: ["kubernetes", "devops"]
  },
  {
    id: "healthai-labs",
    title: "HealthAI Labs — AI-Powered Health Platform",
    description: "AI health application built from scratch, integrating LLM APIs and containerized with Docker Compose.",
    longDescription: "My first end-to-end shipped AI-integrated service, built as a team project with Git branching and pull request workflows.",
    technologies: ["Containerization", "AI", "LLM Integration", "Team Collaboration"],
    features: [
      "Integrates 4 AI models, including the Gemini API",
      "Multi-service orchestration and environment variable management",
      "Team workflow with Git branching and pull requests"
    ],
    image: "/images/projects/healthai.png",
    githubUrl: "https://github.com/co-op-projects-to-boost-my-experience/HealthAI-Labs",
    category: ["ai"]
  }
];
