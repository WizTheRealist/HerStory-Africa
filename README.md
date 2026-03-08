# HerStory Africa

> **The women history forgot to teach you.**

HerStory Africa is an open-source educational archive documenting African women who fought for equality, rights, and social change across history. Built for students, teenagers, and young adults who want to understand the real, full story of African history — told through the women who shaped it.

---

## What It Is

A fast, static, searchable digital archive and learning platform. No fluff. No paywalls. Just history that deserves to be told.

Users can:

- Search for specific historical figures by name, country, or cause
- Browse women by region (West, East, Southern, Central Africa)
- Filter by era (Pre-Colonial, Colonial, Independence, Modern)
- Explore a timeline teaser of key moments in African women's history
- Read educational articles providing context for younger audiences
- Toggle between light and dark mode

---

## Tech Stack

| Tool                                       | Purpose                              |
| ------------------------------------------ | ------------------------------------ |
| [Nuxt 4](https://nuxt.com)                | Framework (Vue 3, file-based routing)|
| [Nuxt Content v3](https://content.nuxt.com)| Markdown-based content layer         |
| [@nuxt/image](https://image.nuxt.com)     | Optimised image handling             |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first CSS + custom tokens    |
| [Lucide Icons](https://lucide.dev)         | Icon library                         |
| [VueUse](https://vueuse.org)              | Composables (dark mode, focus trap)  |
| [@nuxtjs/sitemap](https://sitemap.nuxt.com)| Auto-generated sitemap              |
| [Vercel](https://vercel.com)              | Hosting & deployment                 |

Static site generation. No backend. No database. Content lives in Markdown files.

---

## Project Structure

```
herstory-africa/
├── app/
│   ├── assets/
│   │   ├── css/main.css            # Theme tokens, base styles, helpers
│   │   └── fonts/                  # Playfair Display font files
│   ├── components/
│   │   ├── Home/
│   │   │   ├── Hero.vue            # Tagline, search bar, live results
│   │   │   ├── FeaturedWomen.vue   # 6 featured profile cards
│   │   │   ├── BrowseByRegion.vue  # Region grid with counts
│   │   │   ├── BrowseByCause.vue   # Cause tag pills
│   │   │   ├── TimelineTeaser.vue  # 4-event vertical timeline
│   │   │   ├── LatestAdditions.vue # Recent women + articles
│   │   │   └── SearchResults.vue   # Live search dropdown
│   │   ├── ArticleCard.vue
│   │   ├── BackToTop.vue
│   │   ├── FilterBy.vue
│   │   ├── Footer.vue
│   │   ├── Logo.vue                # Inline SVG, theme-reactive
│   │   ├── Navbar.vue              # Desktop nav + mobile drawer
│   │   ├── Pagination.vue
│   │   ├── SearchBar.vue
│   │   └── WomanCard.vue
│   ├── content/
│   │   ├── women/                  # One .md file per historical figure
│   │   └── articles/               # Educational explainers
│   ├── layouts/
│   │   └── default.vue             # Navbar, slot, Footer, BackToTop
│   ├── pages/
│   │   ├── index.vue               # Home page
│   │   ├── women/
│   │   │   ├── index.vue           # Listing with search, filters, pagination
│   │   │   └── [name].vue          # Individual profile page
│   │   └── articles/
│   │       ├── index.vue           # Paginated article listing
│   │       └── [id].vue            # Individual article page
│   ├── utils/
│   │   ├── constants/content.ts    # Regions, eras, causes
│   │   ├── types/content.ts        # TypeScript interfaces
│   │   ├── goBack.ts               # Smart back navigation
│   │   └── scrollToTop.ts          # Smooth scroll utility
│   ├── app.vue
│   └── error.vue                   # Branded error page (404/500)
├── content.config.ts               # Nuxt Content collection schemas
├── nuxt.config.ts
├── public/
│   ├── women/                      # Profile images (JPG/PNG)
│   ├── herstory-africa-logo.svg
│   ├── herstory-africa-favicon.svg
│   └── robots.txt
├── package.json
└── tsconfig.json
```

---

## Content Schema

Each woman's profile is a Markdown file with structured frontmatter:

```yaml
---
name: "Funmilayo Ransome-Kuti"
slug: "funmilayo-ransome-kuti"
country: "Nigeria"
region: "West Africa"
born: 1900
died: 1978
era: "Colonial"
causes:
  - "Political rights"
  - "Anti-colonial activism"
  - "Women's education"
  - "Labour rights"
image: "/women/funmilayo-ransome-kuti.png"
imageCredit: "Wikimedia Commons / Public Domain"
featured: true
summary: "Nigerian activist who led the Abeokuta Women's Union..."
---
## Biography
...
## Historical Context
...
## What She Fought For
...
## Major Achievements
...
## Her Impact Today
...
```

Valid values for key fields:

- **region**: West Africa, East Africa, Southern Africa, Central Africa
- **era**: Pre-Colonial, Colonial, Independence, Modern
- **causes**: See `app/utils/constants/content.ts` for the full list

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
git clone https://github.com/IwuchukwuDivine/herstory-africa.git
cd herstory-africa

# Copy environment variables
cp .env.example .env

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Script              | Description                    |
| ------------------- | ------------------------------ |
| `npm run dev`       | Start development server       |
| `npm run build`     | Build for production           |
| `npm run generate`  | Generate static site           |
| `npm run preview`   | Preview production build       |
| `npm run lint`      | Run ESLint                     |
| `npm run typecheck` | Run TypeScript type checking   |

### Build for Production

```bash
npm run generate
```

Outputs a fully static site to `.output/public/` — ready to deploy to Vercel.

---

## Adding a New Profile

1. Create a new file in `app/content/women/[slug].md`
2. Fill in the frontmatter schema (see above)
3. Write the biography sections in Markdown
4. Add a profile image to `public/women/[slug].jpg`
5. If the profile uses a new region or cause, add it to `app/utils/constants/content.ts`
6. Commit and push — Vercel deploys automatically

No code changes required to add new women to the archive.

---

## Contributing

Contributions are welcome — especially from people who know their country's history well.

**How to contribute a profile:**

1. Fork the repo
2. Add a new Markdown file in `app/content/women/`
3. Source your information (Wikipedia, Britannica, BlackPast.org, primary sources preferred)
4. Submit a pull request with your sources listed

Please do not submit profiles without verifiable sources.

**Contributing an article:**
Same process — add a Markdown file to `app/content/articles/` and open a PR.

---

## Image Licensing

All images used in this project are sourced from Wikimedia Commons under Creative Commons or public domain licenses. Image credits are noted in each profile's frontmatter.

If you find a licensing issue, please open an issue immediately.

---

## Roadmap

- [x] Project scaffold
- [x] Initial profiles (17 women)
- [x] Home page with featured women
- [x] Profile pages
- [x] Live search functionality
- [x] Browse by region
- [x] Browse by cause
- [x] Timeline teaser
- [x] Educational articles section
- [x] Mobile-responsive design
- [x] Dark mode
- [x] Pagination
- [x] Navbar & mobile drawer
- [x] SEO & sitemap
- [ ] More profiles (target: 50+)
- [ ] Interactive full timeline page
- [ ] Multilingual support (French, Swahili, Arabic)
- [ ] OG image generation

---

## Why This Exists

African women have been at the forefront of resistance, nation-building, and social change for centuries. Most of their names never made it into school textbooks.

HerStory Africa exists to change that — one profile at a time.

---

## License

MIT License. Free to use, share, and build on.

---

## Built By

[Divine Iwuchukwu](https://deevyn-portfolio.vercel.app/) — Full Stack Developer

---

_HerStory Africa — The women history forgot to teach you._
