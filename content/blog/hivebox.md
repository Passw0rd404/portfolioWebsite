---
title: "The DevOps Roadmap That Changed How I Build: My HiveBox Journey"
date: "2026-10-13"
summary: "How I followed the Dynamic DevOps Roadmap, built HiveBox as my first DevOps project, and turned a learning path into a foundation for my own ideas."
cover: "/images/blog/hivebox/hivebox.png"
tags: ["DevOps", "Docker", "FastAPI", "CI/CD", "Kubernetes"]
published: true
---

## 1. The beginning: learning DevOps by building

I wanted to learn DevOps properly, not by collecting tool names or copying disconnected tutorials. I was looking for a path that explained the ideas behind the tools and gave me a reason to use them.

That is how I found the [Dynamic DevOps Roadmap](https://devopsroadmap.io/). It became more than a list of technologies for me. It gave me a way to move from software fundamentals to delivery, infrastructure, observability, security, and continuous improvement in a logical order.

The project that made the roadmap real was [HiveBox](https://github.com/Passw0rd404/HiveBox), an incremental hands-on project built around a small temperature-monitoring API. HiveBox was my first DevOps project, and it taught me something that no isolated command could: DevOps is the complete system around delivering and improving software.

I followed the roadmap through its sixth module, completed the HiveBox work through Phase 5, and studied the Phase 6 direction and practices. By the end, I had learned much more than how to run a container. I had a stronger mental model, a real project to show for it, and ideas for projects of my own.

## 2. Why this roadmap stood out

The roadmap describes itself as a free, pragmatic DevOps learning path for the cloud-native era. What made it stand out to me was its experience-driven, iterative approach. It does not pretend that DevOps is a straight line from one tool to the next.

Its structure moves through foundations and progressively more complete delivery capabilities:

1. **Welcome to the DevOps World** — understand software production, DevOps, DevSecOps, Agile, and the role of the delivery lifecycle.
2. **Basics - DevOps Core** — build confidence with Python, Git, Linux, Bash, Docker, and containers.
3. **Start - Laying the Foundation** — define goals, improve code quality, add testing, and create a first continuous-integration workflow.
4. **Expand - Constructing a Shell** — apply the Twelve-Factor approach, design REST APIs, introduce Kubernetes, observability, continuous delivery, and cloud concepts.
5. **Transform - Finishing the Structure** — connect external systems, add integration testing, use Infrastructure as Code, and work with Terraform, Helm, and Kustomize.
6. **Optimize - Keep Improving** — reflect on the work, improve performance, secure the software supply chain, support multiple environments, centralize logs, and explore GitOps with Argo CD.

This progression helped me understand why each topic mattered. Testing is not separate from delivery. Containers are not the whole of DevOps. Infrastructure is code, but it also needs security, observability, repeatability, and a feedback loop.

## 3. HiveBox: my first real DevOps project

HiveBox is a containerized FastAPI application for temperature monitoring and version information. The application itself is intentionally small:

- FastAPI provides the HTTP API.
- Temperature and version functionality are separated into endpoint modules.
- Type hints make the Python code easier to reason about.
- Swagger UI and ReDoc provide interactive API documentation.
- Docker and Docker Compose make the application reproducible to run.

The small application was a strength rather than a limitation. Because the business logic was easy to understand, I could focus on the engineering around it: how to package it, validate it, secure it, deliver it, and improve it.

The repository is available on [GitHub](https://github.com/Passw0rd404/HiveBox). It also includes an [OpenSSF Scorecard report](https://scorecard.dev/viewer/?uri=github.com/Passw0rd404/HiveBox), which reflects the project's focus on open-source security practices.

## 4. What I learned phase by phase

### Phase 1: understanding the why

The first phase gave the project context. Before writing a Dockerfile or a workflow, I had to understand the relationship between development, operations, Agile, DevOps, and the software development lifecycle.

That changed my starting question. Instead of asking, “Which tool should I install?”, I started asking:

- What problem am I trying to solve?
- Who needs this change?
- How will I know that it works?
- How will another person run it?
- What happens when it fails?

Those questions stayed relevant through every later phase.

### Phase 2: building a reliable base

The second phase covered the everyday foundations: Python, Git, Linux, Bash, Docker, and containers. HiveBox gave me an immediate place to apply them.

I created a modular FastAPI service, packaged it in a Docker image, and made it possible to run the project with Docker Compose. I learned the difference between “it runs on my machine” and “another developer can start it with clear, repeatable steps.”

This phase also made container concepts practical. A Dockerfile is not just a recipe for starting a process. It is part of the delivery artifact, and its choices affect reproducibility, security, image size, and how confidently the application can move between environments.

### Phase 3: planning, testing, and continuous integration

The third phase connected planning with quality. I learned to define a smaller goal, break it into useful work, and treat tests and quality checks as part of the development workflow rather than a final inspection.

The important lesson was that CI is a feedback system. A workflow that runs tests, validates the project, and reports failures early gives the team a faster and safer development loop. It also turns the repository into a source of truth for how the project is expected to behave.

### Phase 4: expanding toward a platform

The fourth phase widened the view from the application to its operating environment. The Twelve-Factor App principles, REST API practices, Kubernetes, observability, continuous delivery, and cloud concepts all showed how an application becomes operable.

I began thinking about configuration, logs, health, scaling, and deployment as first-class concerns. A service is not finished when its endpoint returns a response. It also needs to be understandable and supportable when it is running somewhere else.

### Phase 5: integrating the pieces

Phase 5 was where the ideas started to feel like a complete DevOps system. Integration testing, external systems, Terraform, Helm, Kustomize, and continuous-delivery practices all reinforced the value of automation and repeatability.

Infrastructure as Code especially changed my perspective. Infrastructure stopped looking like a collection of manual settings and started looking like a versioned, reviewable part of the product. The same principle applied to deployment configuration: if a process matters, it should be explicit enough to inspect, reproduce, and improve.

### Phase 6: improving instead of stopping

The Phase 6 material pushed the project mindset further. It focuses on retrospectives, performance, software supply-chain security, multiple environments, log aggregation, release automation, continuous deployment, and GitOps with Argo CD.

This phase was a reminder that “deployed” is not the finish line. A DevOps system should create a loop:

1. Make a change.
2. Validate it automatically.
3. Release it in a controlled way.
4. Observe what happened.
5. Learn from the result.
6. Improve the system.

I studied and applied the ideas from this phase as part of my learning journey, while the HiveBox implementation I completed reached Phase 5. Being clear about that distinction matters: learning a practice and implementing every part of it are different milestones.

## 5. The tools mattered, but the connections mattered more

The project introduced me to technologies that are common in DevOps work:

- **Git and GitHub** for version control and collaboration
- **Python and FastAPI** for a typed, documented service
- **Linux and Bash** for working close to the operating system
- **Docker and Docker Compose** for reproducible packaging and local environments
- **Testing and GitHub Actions** for automated feedback
- **Kubernetes** for orchestration concepts
- **Terraform** for Infrastructure as Code
- **Helm and Kustomize** for Kubernetes configuration
- **Observability and log aggregation** for understanding running systems
- **Supply-chain security and OpenSSF Scorecard** for improving trust in the delivery process
- **GitOps and Argo CD** for declarative continuous delivery concepts

The biggest lesson was not memorizing these names. It was understanding how they fit together. Git stores the desired change, CI checks it, an artifact packages it, delivery promotes it, infrastructure provides its environment, and observability shows whether the result is healthy.

## 6. The challenges that taught me the most

### Starting without trying to learn everything at once

DevOps has a huge surface area. It is easy to feel behind when every new topic appears to require another tool. The roadmap helped me narrow the next step and learn in layers instead of trying to master the entire ecosystem immediately.

### Turning concepts into working behavior

Reading about containers or CI is very different from writing a Dockerfile, running the service, debugging a failure, and making the workflow repeatable. HiveBox forced me to close that gap.

### Treating security as part of delivery

Security was not presented as a final checklist. Secure defaults, dependency hygiene, supply-chain checks, and project health belong in the same workflow as tests and releases. The OpenSSF Scorecard work made that idea concrete.

### Knowing when a project is ready to evolve

HiveBox gave me a manageable first project, but the roadmap also showed me where it could go next: richer environments, better observability, stronger release automation, and GitOps. The goal was not to add complexity for its own sake. The goal was to introduce the next capability when it solves a real problem.

## 7. What I would tell someone starting today

Start with a project small enough to understand end to end. Then improve the way it is built and delivered one step at a time.

Do not wait until you know every tool before you build something. Do not confuse a long list of technologies with DevOps experience. Learn the reason behind each practice, make it visible in a repository, and keep a record of what failed and how you fixed it.

The most valuable moments in my journey were not the commands that worked immediately. They were the points where I had to investigate a broken build, rethink a workflow, or connect two concepts that I had previously learned separately.

## 8. Thank you and what comes next

The [Dynamic DevOps Roadmap](https://devopsroadmap.io/) is, in my experience, one of the best practical DevOps learning resources available. It is the GOAT of DevOps roadmaps because it connects fundamentals, hands-on work, and continuous improvement instead of treating them as separate subjects.

Huge thanks to [Ahmed AbouZaid](https://www.linkedin.com/in/aabouzaid/), the creator of the roadmap, for building and sharing such a thoughtful learning path. HiveBox was my first DevOps project, but it will not be my last.

I finished this journey with more than a completed repository. I left with a better way to think about software delivery and ideas for projects I want to build myself. That is what a great roadmap should do: give you structure at the beginning, then give you enough understanding to choose your own direction.

