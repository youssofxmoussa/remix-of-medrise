# Rebrand to BioVision + Major SEO/GEO Upgrade

## 1. Rename MedRise → BioVision everywhere

Every occurrence across all 18 files that mention it: page titles, meta descriptions, JSON-LD, UI copy, footer line, login screen, notifications, streak, privacy, about, FAQ, courses, subject pages, and helper libraries (`activity.ts`, `demo-session.ts`, `appearance.ts`). Asset pointer files are renamed to `biovision-logo.png.asset.json` and `biovision-og.png.asset.json`, with imports updated. Storage keys that embed the old name get migrated so existing local sessions/settings keep working.

replace hsein in login with ossama

## 2. Logo, favicon, OG image

- Reuse the transparent logo asset already uploaded to the project (the Removebg mark) as the single brand source.
- Site icon: generate a square 64x64 PNG from that logo, save as `public/favicon.png`, and point the root route's `<link rel="icon">` at it.
- Login page: logo displayed larger with a soft glow/backdrop treatment so it reads as the brand hero.
- New OG image: a 1200x630 share card built from the same logo — deep biotech gradient background, subtle molecular/DNA motif, the logo mark, "BioVision" wordmark, and a short tagline. Uploaded as a CDN asset and wired into `og:image` / `twitter:image` on every public route (home, about, FAQ), with `twitter:card` upgraded to `summary_large_image`.

## 3. SEO + GEO upgrade (large, ~500+ lines of new/changed code)

**Shared SEO layer (new `src/lib/seo.ts`)**

- One `SITE` config: brand name, tagline, canonical base, locale, social handles, logo/OG URLs.
- `buildMeta()` helper emitting title, description, keywords, canonical, `og:*` (title, description, type, url, site_name, image + dimensions + alt, locale), full `twitter:*`, `robots`/`googlebot` with `max-image-preview:large`, `max-snippet:-1`, and author/publisher tags.
- Schema builders: Organization, WebSite (+ SearchAction), EducationalOrganization, Course, ItemList of courses, FAQPage, BreadcrumbList, Article, WebPage/AboutPage, and speakable markup.

**Per-route head upgrades**

- `__root.tsx`: sitewide defaults, favicon, theme-color, Organization + WebSite JSON-LD, hreflang/alternate links, dns-prefetch/preconnect.
- `index.tsx`: rich home metadata, EducationalOrganization + WebSite + ItemList of courses JSON-LD, self-referencing canonical and og:url.
- `about.tsx`: AboutPage + Organization + BreadcrumbList.
- `faq.tsx`: expanded FAQPage schema covering every rendered Q&A.
- `subject.$courseId.tsx`: per-course Course + BreadcrumbList schema built from loader data, unique title/description per course.
- Private app routes (`me`, `streak`, `learning`, `notifications`, `appearance`, `privacy`, `login`) keep `noindex, nofollow` but get correct titles.

**GEO (generative-engine optimization)**

- A crawlable, AI-answerable content layer: concise question-and-answer sections with direct one-sentence answers, definition blocks, and factual summary lists on the public pages so LLM crawlers can quote them.
- `speakable` + `mainEntity` schema so answer engines know which text to lift.
- `llms.txt` in `public/` describing the site, its sections, and canonical links for AI crawlers.
- `robots.txt` extended with explicit allows for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Applebot-Extended, plus a sitemap pointer.
- `public/sitemap.xml` listing every public route with lastmod/priority (relative-safe; base URL filled once the project has a public URL — otherwise the sitemap is deferred and I'll note it).
- Semantic HTML pass on public pages: proper single H1, sectioned H2/H3, `<time>`, descriptive alt text on all subject images, and internal cross-links between home/about/FAQ/courses.

## 4. Remove Lovable references

Deleted or renamed: `src/lib/lovable-error-reporting.ts` → a neutral `src/lib/error-reporting.ts` with all identifiers renamed, plus its import in `__root.tsx`; the Lovable block in `AGENTS.md` and any mention in `README.md`.

Note: `vite.config.ts`, `package.json`, and `bunfig.toml` reference the `@lovable.dev/vite-tanstack-config` build package. That is the platform build toolchain — removing it breaks the build, so those three stay. Nothing user-visible in the app or its HTML will mention Lovable.

&nbsp;

I DONT FROM U TO USE IMG JSON , I WANT IT AS AN IMG OR AS A LINK OF IMG UNDERSTAND?? NO JSON IMGS !!

## Technical notes

- No backend changes; all work is in routes, `src/lib`, `src/components/seo`, and `public/`.
- Head metadata uses the TanStack `head()` route option (no helmet).
- Canonical/og:url stay self-referencing and relative until a public domain exists.