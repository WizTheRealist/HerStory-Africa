# HerStory Africa

> **The women history forgot to teach you.**

HerStory Africa is an open-source educational archive documenting African women who fought for equality, rights, and social change across history. Built for students, teenagers, and young adults who want to understand the real, full story of African history — told through the women who shaped it.

---

## What It Is

A fast, static, searchable digital archive and learning platform. No fluff. No paywalls. Just history that deserves to be told.

Users can:
- Search for specific historical figures by name
- Browse women by country or region
- Filter by cause — political rights, education, peace, anti-colonial activism, and more
- Explore an interactive timeline of African women's rights movements
- Read educational articles providing context for younger audiences

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Nuxt 3](https://nuxt.com) | Framework |
| [Nuxt Content](https://content.nuxt.com) | Markdown-based content layer |
| [@nuxt/image](https://image.nuxt.com) | Optimized image handling |
| [Vercel](https://vercel.com) | Hosting & deployment |

Static site generation. No backend. No database. Content lives in Markdown files.

---

## Project Structure

```
herstory-africa/
├── content/
│   ├── women/                  # One .md file per historical figure
│   │   ├── funmilayo-ransome-kuti.md
│   │   ├── wangari-maathai.md
│   │   └── ...
│   └── articles/               # Educational explainers
│       ├── what-is-feminism.md
│       └── women-in-independence-movements.md
├── pages/
│   ├── index.vue               # Home page
│   ├── women/
│   │   └── [slug].vue          # Individual profile pages
│   ├── timeline.vue            # Interactive timeline
│   ├── browse/
│   │   ├── country.vue         # Browse by country
│   │   └── cause.vue           # Browse by cause
│   └── articles/
│       └── [slug].vue          # Article pages
├── components/
│   ├── WomanCard.vue
│   ├── SearchBar.vue
│   ├── TimelineEvent.vue
│   └── ...
├── public/
│   └── women/                  # Optimized WebP profile images
├── assets/
│   └── css/
│       └── main.css
└── nuxt.config.ts
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
era: "Colonial"          # Pre-Colonial | Colonial | Independence | Modern
causes:
  - "Political rights"
  - "Anti-colonial activism"
  - "Women's education"
image: "/women/funmilayo-ransome-kuti.webp"
featured: true
summary: "Nigerian activist who led the Abeokuta Women's Union and fought against colonial taxation and the exclusion of women from politics."
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

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repo
git clone https://github.com/IwuchukwuDivine/herstory-africa.git
cd herstory-africa

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run generate
```

Outputs a fully static site to `.output/public/` — ready to deploy to Vercel.

---

## Adding a New Profile

1. Create a new file in `content/women/[slug].md`
2. Fill in the frontmatter schema (see above)
3. Write the biography sections in Markdown
4. Add an optimized WebP image to `public/women/[slug].webp`
5. Commit and push — Vercel deploys automatically

That's it. No code changes required to add new women to the archive.

---

## Contributing

Contributions are welcome — especially from people who know their country's history well.

**How to contribute a profile:**
1. Fork the repo
2. Add a new Markdown file in `content/women/`
3. Source your information (Wikipedia, Britannica, BlackPast.org, primary sources preferred)
4. Submit a pull request with your sources listed

Please do not submit profiles without verifiable sources.

**Contributing an article:**
Same process — add a Markdown file to `content/articles/` and open a PR.

---

## Image Licensing

All images used in this project are sourced from Wikimedia Commons under Creative Commons or public domain licenses. Image credits are noted in each profile's frontmatter.

If you find a licensing issue, please open an issue immediately.

---

## Roadmap

- [x] Project scaffold
- [ ] Initial 20 profiles
- [ ] Home page with featured women
- [ ] Profile pages
- [ ] Search functionality
- [ ] Browse by country
- [ ] Browse by cause
- [ ] Interactive timeline
- [ ] Educational articles section
- [ ] Mobile-responsive design
- [ ] Dark mode
- [ ] Multilingual support (French, Swahili, Arabic)

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

*HerStory Africa — The women history forgot to teach you.*
