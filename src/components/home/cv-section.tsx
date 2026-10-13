
"use client";

import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { GradientText } from "@/components/animations";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const CV_CSS = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
.cv-doc { --text:#1a1a1a; --muted:#555; --accent:#1a56db; --border:#d0d0d0; --font:'IBM Plex Sans',sans-serif; --mono:'IBM Plex Mono',monospace; background:#fff; width:794px; flex-shrink:0; padding:26px 44px 24px; box-shadow:0 4px 28px rgba(0,0,0,.18); font-family:var(--font); color:var(--text); font-size:11.4px; line-height:1.4; text-align:left; }
.cv-doc *, .cv-doc *::before, .cv-doc *::after { box-sizing:border-box; margin:0; padding:0; }
.cv-doc a { color:inherit; text-decoration:none; }
.cv-doc ul { list-style:disc; }
.cv-doc strong { font-weight:600; }
.cv-doc header { border-bottom:2px solid var(--text); padding-bottom:8px; margin-bottom:10px; }
.cv-doc header h1 { font-size:22px; font-weight:600; letter-spacing:-0.4px; margin-bottom:2px; }
.cv-doc .role { font-family:var(--mono); font-size:10.5px; font-weight:500; color:var(--accent); letter-spacing:0.8px; text-transform:uppercase; margin-bottom:7px; }
.cv-doc .contacts { display:flex; flex-wrap:wrap; gap:3px 16px; font-size:11px; color:var(--muted); }
.cv-doc .contacts a { color:var(--muted); }
.cv-doc section { margin-bottom:9px; }
.cv-doc .sec-title { font-family:var(--mono); font-size:9.5px; font-weight:600; letter-spacing:1.4px; text-transform:uppercase; color:var(--muted); border-bottom:1px solid var(--border); padding-bottom:2px; margin-bottom:6px; }
.cv-doc .summary p { font-size:11.5px; color:var(--text); }
.cv-doc .skills-grid { display:grid; grid-template-columns:1fr 1fr; gap:4px 28px; }
.cv-doc .sk { display:flex; gap:7px; font-size:11px; align-items:baseline; }
.cv-doc .sk-cat { font-weight:600; min-width:118px; white-space:nowrap; }
.cv-doc .sk-val { color:var(--muted); }
.cv-doc .project { margin-bottom:7px; }
.cv-doc .project:last-child { margin-bottom:0; }
.cv-doc .proj-head { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:3px; }
.cv-doc .proj-name { font-weight:600; font-size:12px; }
.cv-doc .proj-link { font-family:var(--mono); font-size:10px; color:var(--accent); white-space:nowrap; }
.cv-doc .project ul { padding-left:14px; }
.cv-doc .project li { font-size:11px; color:var(--text); margin-bottom:1px; line-height:1.38; }
.cv-doc .project li::marker { color:var(--accent); }
.cv-doc .edu-row { display:flex; justify-content:space-between; align-items:baseline; }
.cv-doc .edu-deg { font-weight:600; font-size:12px; }
.cv-doc .edu-sub { font-size:11px; color:var(--muted); margin-top:1px; }
.cv-doc .edu-date { font-family:var(--mono); font-size:11px; color:var(--muted); }
.cv-doc .cert-row { display:flex; justify-content:space-between; align-items:baseline; font-size:11px; margin-bottom:4px; }
.cv-doc .cert-row:last-child { margin-bottom:0; }
.cv-doc .cert-name { font-weight:500; }
.cv-doc .cert-meta { color:var(--muted); font-size:10.5px; }
.cv-doc .cert-link { color:var(--accent); margin-left:6px; font-family:var(--mono); font-size:10px; }
`;

const CV_HTML = `
<header>
  <h1>Abdullah Sameh</h1>
  <div class="role">DevOps Engineer</div>
  <div class="contacts">
    <span>Cairo, Egypt</span>
    <span>Abdullah.Sameh40404@gmail.com</span>
    <span>+20 155 520 6319</span>
    <span><a href="https://linkedin.com/in/abdullah-sameh-0a3063366">linkedin.com/in/abdullah-sameh</a></span>
    <span><a href="https://github.com/Passw0rd404">github.com/Passw0rd404</a></span>
  </div>
</header>
<section class="summary">
  <div class="sec-title">Summary</div>
  <p>Computer Science student with strong hands-on DevOps experience spanning Kubernetes orchestration, GitOps delivery, cloud infrastructure automation, and full-stack containerization. Built and deployed production-grade systems including a live federated social media platform on Kubernetes. Focused on cloud-agnostic, maintainable architectures and automation-first practices.</p>
</section>
<section>
  <div class="sec-title">Technical Skills</div>
  <div class="skills-grid">
    <div class="sk"><span class="sk-cat">Cloud</span><span class="sk-val">AWS (EC2, S3, IAM, VPC, EKS, CloudFront, CodeDeploy)</span></div>
    <div class="sk"><span class="sk-cat">Observability</span><span class="sk-val">LGTM (Grafana, Loki, Tempo, Mimir), Alloy, Prometheus, OpenTelemetry</span></div>
    <div class="sk"><span class="sk-cat">Containers &amp; Orchestration</span><span class="sk-val">Docker, Kubernetes, Helm, Kustomize</span></div>
    <div class="sk"><span class="sk-cat">IaC</span><span class="sk-val">Terraform, Packer</span></div>
    <div class="sk"><span class="sk-cat">CI/CD &amp; GitOps</span><span class="sk-val">GitHub Actions, ArgoCD, CodeDeploy</span></div>
    <div class="sk"><span class="sk-cat">Scripting</span><span class="sk-val">Bash, Python</span></div>
  </div>
</section>
<section>
  <div class="sec-title">Projects</div>
  <div class="project">
    <div class="proj-head">
      <span class="proj-name">Mastodon — Production Kubernetes Deployment (Federated Social Media Platform)</span>
      <a class="proj-link" href="https://github.com/Passw0rd404/mastodon-SRE" target="_blank" rel="noopener noreferrer">github.com/mastodon-SRE</a>
    </div>
    <ul>
      <li>Building a Kubernetes deployment for a live federated social media platform (<strong>Mastodon</strong>), designed to run on <strong>any online/cloud cluster</strong> — AWS, Civo, or otherwise — with <strong>autoscaling</strong> across web, streaming, and Sidekiq, plus a companion <strong>fediscoverer</strong> service that scales the same way.</li>
      <li>Self-hosted, highly-available data layer: <strong>PostgreSQL via CloudNativePG</strong> (primary + replica), <strong>Redis via DandyDeveloper's redis-ha chart</strong> (Sentinel + HAProxy) for cache and Sidekiq queues, and <strong>Elasticsearch via ECK</strong> — no managed DB, cache, or search service dependency.</li>
      <li>Storage relies on whatever CSI the target cluster provides, and ingress is handled by <strong>Traefik</strong> — keeping the entire repo portable across cloud providers rather than tied to any one vendor's tooling.</li>
      <li>Cost-optimized node architecture: stateless app tier on <strong>Spot instances</strong>; stateful data services (PostgreSQL, Redis, and Elasticsearch) on <strong>On-Demand nodes</strong>.</li>
      <li>Full observability via a self-hosted <strong>LGTM stack</strong> (Grafana, Loki, Tempo, Mimir/Prometheus) running on the cluster, using <strong>Cloudflare R2</strong> for object storage for Mastodon media and LGTM monitoring data, plus a basic <strong>ChatOps</strong> setup for day-to-day operational tasks and alerts.</li>
      <li>Two independent CI/CD pipelines via <strong>GitHub Actions</strong> — one for the app, one for infrastructure — both synced through <strong>ArgoCD</strong> GitOps, with TLS via cert-manager and secrets via Sealed Secrets.</li>
    </ul>
  </div>
  <div class="project">
    <div class="proj-head">
      <span class="proj-name">MERN E-Commerce — AWS 3-Tier Production Architecture</span>
      <a class="proj-link" href="https://github.com/Passw0rd404/mern-ecommerce-DevOps-version" target="_blank" rel="noopener noreferrer">github.com/Passw0rd404/mern-ecommerce-DevOps-version</a>
    </div>
    <ul>
      <li>Deployed a full-stack MERN app on AWS using a 3-tier architecture: <strong>CloudFront → NLB → EC2 Auto Scaling Group</strong> in a private subnet, with <strong>ElastiCache</strong> and <strong>MongoDB Atlas</strong> via PrivateLink.</li>
      <li>Two separate pipelines: frontend via S3 + CloudFront invalidation; backend deployed in-place one instance at a time using <strong>AWS CodeDeploy</strong>. Infrastructure provisioned with <strong>Terraform</strong>, AMIs baked with <strong>Packer</strong>.</li>
      <li>Integrated <strong>Grafana Cloud</strong> over <strong>AWS PrivateLink</strong>: Grafana Cloud collects AWS metrics through its CloudWatch data-source integration, while <strong>Grafana Alloy</strong> on each EC2 instance forwards telemetry through the private connection.</li>
      <li>Managed <strong>MongoDB Atlas with Terraform</strong>, authenticating Terraform with a standard MongoDB Atlas API token; monitored database health using the <strong>Atlas monitoring dashboard</strong>. Secured AWS deployment authentication with OIDC and added IaC scanning (TFLint, Terrascan, Checkov) and code-quality gates (ESLint, Semgrep, OpenSSF Scorecard).</li>
    </ul>
  </div>
  <div class="project">
    <div class="proj-head">
      <span class="proj-name">HiveBox — IoT Temperature API (Built from Scratch)</span>
      <a class="proj-link" href="https://github.com/Passw0rd404/HiveBox" target="_blank" rel="noopener noreferrer">github.com/Passw0rd404/HiveBox</a>
    </div>
    <ul>
      <li>Wrote a <strong>FastAPI</strong> application from scratch aggregating real-time temperature data from global IoT sensors (OpenSenseMap API); containerized and deployed locally on <strong>kind</strong>.</li>
      <li>Integrated <strong>Valkey</strong> caching, Prometheus metrics, and a Grafana dashboard — full local observability stack without any cloud dependency.</li>
    </ul>
  </div>
  <div class="project">
    <div class="proj-head">
      <span class="proj-name">HealthAI Labs — AI-Powered Health Platform (Built from Scratch)</span>
      <a class="proj-link" href="https://github.com/co-op-projects-to-boost-my-experience/HealthAI-Labs" target="_blank" rel="noopener noreferrer">github.com/co-op-projects/HealthAI-Labs</a>
    </div>
    <ul>
      <li>Built an AI health application from scratch integrating LLM APIs; containerized with <strong>Docker Compose</strong> — first experience shipping an AI-integrated service end to end.</li>
      <li>Practiced multi-service orchestration, environment variable management, and team collaboration with Git branching and pull request workflows.</li>
    </ul>
  </div>
</section>
<section>
  <div class="sec-title">Education</div>
  <div class="edu-row">
    <div>
      <div class="edu-deg">Bachelor’s in Computer Science, Faculty of Artificial Intelligence</div>
      <div class="edu-sub">Minoufia University — Egypt &nbsp;·&nbsp; GPA: 3.0</div>
    </div>
    <div class="edu-date">Expected 2028</div>
  </div>
</section>
<section>
  <div class="sec-title">Certifications</div>
  <div class="cert-row">
    <span class="cert-name">AWS Certified Solutions Architect – Associate</span>
    <span class="cert-meta">Amazon Web Services
      <a class="cert-link" href="https://www.linkedin.com/posts/abdullah-sameh-0a3063366_aws-cloudcomputing-devops-ugcPost-7456233957702074368-vhk8" target="_blank" rel="noopener noreferrer">View credential ↗</a>
    </span>
  </div>
  <div class="cert-row">
    <span class="cert-name">AWS Certified Cloud Practitioner</span>
    <span class="cert-meta">Amazon Web Services
      <a class="cert-link" href="https://www.linkedin.com/posts/abdullah-sameh-0a3063366_aws-cloudcomputing-devops-ugcPost-7456233957702074368-vhk8" target="_blank" rel="noopener noreferrer">View credential ↗</a>
    </span>
  </div>
  <div class="cert-row">
    <span class="cert-name">AWS DevOps — 90%</span>
    <span class="cert-meta">Cloud Native Base Camp
      <a class="cert-link" href="https://www.linkedin.com/posts/abdullah-sameh-0a3063366_aws-devops-cloud-activity-7423716260628066304-7wOa" target="_blank" rel="noopener noreferrer">View credential ↗</a>
    </span>
  </div>
  <div class="cert-row">
    <span class="cert-name">McKinsey Forward Program</span>
    <span class="cert-meta">McKinsey &amp; Company
      <a class="cert-link" href="https://www.linkedin.com/posts/abdullah-sameh-0a3063366_im-happy-to-share-that-ive-obtained-a-new-activity-7347939496702742528-uBTr" target="_blank" rel="noopener noreferrer">View credential ↗</a>
    </span>
  </div>
</section>
`;

function ScaledCv() {
  const box = useRef<HTMLDivElement>(null);
  const doc = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const outer = box.current;
    const inner = doc.current;
    if (!outer || !inner) return;
    const fit = () => {
      const s = Math.min(1, outer.clientWidth / 794);
      setScale(s);
      setHeight(inner.offsetHeight * s);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={box}
      className={`mx-auto w-full max-w-[794px] ${scale === null ? "overflow-hidden" : ""}`}
      style={{ height }}
    >
      <div
        ref={doc}
        className="cv-doc"
        style={{
          transform: `scale(${scale ?? 1})`,
          transformOrigin: "top left",
          opacity: scale === null ? 0 : 1,
        }}
        dangerouslySetInnerHTML={{ __html: CV_HTML }}
      />
    </div>
  );
}

export function CvSection() {
  return (
    <section className="py-20 bg-muted/50 grid-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <GradientText>CV</GradientText>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A quick look at my experience, projects, and certifications
          </p>
        </div>

        <style dangerouslySetInnerHTML={{ __html: CV_CSS }} />
        <ScaledCv />

        <div className="mt-8 text-center">
          <a
            href={`${base}/final.pdf`}
            download="Abdullah_Sameh_DevOps_Engineer_CV.pdf"
            className="inline-flex items-center gap-2 rounded-md border bg-background px-6 py-3 text-sm font-medium transition-all hover:bg-primary/10 hover:text-primary hover:border-primary/50"
          >
            <Download className="h-4 w-4" />
            Download CV (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}

