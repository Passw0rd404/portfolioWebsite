<div align="center">

# Abdullah Sameh — DevOps Portfolio

A fast, responsive portfolio with dark and light themes, built with Next.js and deployed automatically to GitHub Pages.

### 🌐 [abdullahsameh.tech](https://abdullahsameh.tech)

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Deployed_on-GitHub_Pages-222222?logo=github)

</div>

---

## Live site

**https://abdullahsameh.tech**

## Features

- Pages: Home, About, Experience, Projects (with category filter), Blog (coming soon), and Contact
- Dark and light theme that follows the system setting, with a manual toggle
- Responsive layout with a mobile menu
- Animated 3D starfield hero (React Three Fiber) and Framer Motion animations
- Engineering-style grid backgrounds on key sections
- On-page CV section with a downloadable PDF
- Contact form that works without a backend (Web3Forms), with an email fallback
- SEO basics: metadata, Open Graph, `sitemap.xml`, `robots.txt`, and JSON-LD
- Fully static export, hosted free on GitHub Pages and deployed by GitHub Actions on every push

## Tech stack

| Area | Tools |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui (Radix UI), tw-animate-css |
| Animation and 3D | Framer Motion, React Three Fiber, drei |
| Theming | next-themes |
| Contact form | Web3Forms |
| Hosting and CI/CD | GitHub Pages, GitHub Actions |
| DNS | Cloudflare |

## Getting started

You need **Node.js 20 or newer** and npm.

```bash
git clone https://github.com/Passw0rd404/portfolioWebsite.git
cd portfolioWebsite
npm ci
npm run dev
```

Open http://localhost:3000. The page reloads when you save a file.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the dev server with hot reload |
| `npm run build` | Builds and exports the static site to the `out/` folder |
| `npm run lint` | Runs ESLint |
| `npm run type-check` | Runs the TypeScript compiler without emitting files |
| `npm run format` | Formats the code with Prettier |

### Preview the production build

The site is a static export, so `npm start` (`next start`) does not work. Preview the built site like this:

```bash
npm run build
npx serve out
```

### Docker (optional)

```bash
docker build -t portfolio-website .
docker run --rm -p 3000:3000 portfolio-website
```

This builds the static site and serves the `out/` folder on port 3000.

## Project structure

```
.
├── .github/workflows/         # GitHub Pages deploy workflow
├── public/                    # Static files
│   └── images/                # Profile photo, logos, project pictures, skill icons
├── src/
│   ├── app/                   # Routes, layout, SEO files, icon, global CSS
│   ├── components/
│   │   ├── 3d/                # Starfield background
│   │   ├── animations/        # Reusable animation components
│   │   ├── common/            # Shared pieces (profile frame, skills grid, ...)
│   │   ├── home/              # Home page sections (skills, CV, certifications, ...)
│   │   ├── layout/            # Navbar, footer, page wrapper
│   │   ├── sections/          # Page sections (about, experience, projects, contact, ...)
│   │   ├── seo/               # JSON-LD
│   │   └── ui/                # Base UI components
│   ├── data/                  # Projects, experience, skills and blog content
│   ├── hooks/
│   ├── lib/constants.ts       # Site name, links, contact form key
│   └── types/
├── next.config.ts             # Static export settings
└── Dockerfile                 # Optional local preview
```

## Make it your own

Want to use this as a template? Fork the repo, then replace the personal content below.

| What to change | Where |
|---|---|
| Name, title, description, site URL, social links | `src/lib/constants.ts` |
| **Contact form key (required)** | `formKey` in `src/lib/constants.ts` |
| Projects | `src/data/projects.ts`, pictures in `public/images/projects/` |
| Work experience and services | `src/data/experience.ts` |
| Skills | `src/data/skills.ts`, icons in `public/images/skills/` |
| Blog posts | `src/data/blog.ts` |
| About text | `src/components/sections/about.tsx` |
| Profile photo | `public/images/abdullah.jpg` |
| Education and certifications | `src/components/home/education-certs.tsx`, logos in `public/images/logos/` |
| CV text on the page | `src/components/home/cv-section.tsx` |
| Downloadable CV (PDF) | `public/final.pdf` |
| Social preview image | add `public/images/og-image.png` (1200 × 630 px) |
| Browser tab icon | `src/app/icon.svg` |
| Theme colors | CSS variables at the top of `src/app/globals.css` |

> **Important:** the Web3Forms key in this repo sends messages to my inbox. Get your own free access key at [web3forms.com](https://web3forms.com) and put it in `formKey`, otherwise your visitors' messages will come to me. If `formKey` is left as a placeholder starting with `PASTE`, the form opens the visitor's email app instead.

## Deploy to GitHub Pages

1. Push the code to your GitHub repo on the `main` branch.
2. In the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/` installs dependencies, runs `npm run build`, and publishes the `out/` folder.

The site is built to live at the **root** of a domain, so use one of these:

- **Name the repo `<your-username>.github.io`.** The site will be at `https://<your-username>.github.io`.
- **Use a custom domain.** In **Settings → Pages → Custom domain**, enter your domain. At your DNS provider, add four `A` records for the root domain (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and a `CNAME` record for `www` pointing to `<your-username>.github.io`. When the DNS check passes, tick **Enforce HTTPS**.

A project site at `https://<your-username>.github.io/<repo-name>/` needs extra `basePath` setup and is not supported out of the box.

After deploying, set `url` in `src/lib/constants.ts` to your real address (no trailing slash). The sitemap and robots files use it.

### Static export notes

Because the site is exported as plain files, it cannot use API routes, server-side rendering, or custom headers or rewrites. Images are served as uploaded (not resized), so compress them before adding them to `public/images/`.

## License

The code is released under the [MIT License](LICENSE). The personal content (name, photo, CV, and project texts) belongs to me, so please replace it with your own when you reuse the template.

## Author

**Abdullah Sameh** — DevOps Engineer, open to internships, full-time roles, and freelance work.

- Website: [abdullahsameh.tech](https://abdullahsameh.tech)
- LinkedIn: [abdullah-sameh](https://linkedin.com/in/abdullah-sameh-0a3063366)
- GitHub: [Passw0rd404](https://github.com/Passw0rd404)
- Contact: [abdullahsameh.tech/contact](https://abdullahsameh.tech/contact)
