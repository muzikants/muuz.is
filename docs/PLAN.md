# muuz.is — build plan & agent task queue

**Updated:** 2026-06-22  
**Deadline:** Ship before **2026-07-05** (Cursor sub); soft target **2026-07-04** (MG Bootcamp event)  
**Preview:** https://muuzis.vercel.app  
**Repo:** https://github.com/muzikants/muuz.is

---

## Status dashboard

| Phase | Name | Status |
| --- | --- | --- |
| 0 | Plan & brief | ✅ done |
| 1 | Scaffold + Vercel | ✅ done |
| 2 | Design shell | ✅ done (Lesson 4) |
| 3 | Content collections | 🔲 not started |
| 4 | SEO + meta | 🔲 not started |
| 5 | DNS cutover | 🔲 blocked on content smoke test |
| 6 | Polish buffer | 🔲 |

**Current focus:** Phase 3 — real content in collections + detail routes.

---

## How to use this file

- **Planning agent:** Keep dashboard accurate; set next `ready` tasks; note blockers.
- **Worker agent:** Claim one `T-###` with status `ready` → set `in_progress` → implement → `done` + commit.
- **Dependencies:** Do not start a task until its deps are `done`.

Status values: `ready` | `in_progress` | `done` | `blocked` | `deferred`

---

## Task queue

### Phase 2 — shell (remaining)

#### T-201 — Footer component
- **Status:** `ready`
- **Deps:** none
- **Scope:** `src/components/Footer.astro`, wire into `Layout.astro`
- **Acceptance:** Minimal footer — `muuz.is` mono, year, social icons or text links; matches B&W tokens; mobile-safe
- **Prompt:** _Add a minimal Footer per docs/BRIEF.md and include it in Layout.astro._

#### T-202 — Mobile + a11y pass (shell)
- **Status:** `ready`
- **Deps:** T-201 (optional)
- **Scope:** `global.css`, `Nav.astro`, grid pages
- **Acceptance:** Nav usable at 375px; focus visible on links; no horizontal scroll; `prefers-reduced-motion` respected (already partial)
- **Prompt:** _Mobile responsive pass on nav and work-grid. Visible focus states on all interactive elements._

---

### Phase 3 — content

#### T-301 — Work content collection entries
- **Status:** `ready`
- **Deps:** none
- **Scope:** `src/content/work/*.md`, remove `_placeholder.md`
- **Acceptance:** 6 entries per `docs/CONTENT.md`; valid frontmatter (`title`, `year`, `role`, `featured`, `gridSpan`, `url` where known); `npm run build` passes
- **Prompt:** _Create work collection markdown files from docs/CONTENT.md. Delete _placeholder.md._

#### T-302 — Music content collection entries
- **Status:** `ready`
- **Deps:** none
- **Scope:** `src/content/music/*.md`, remove `_placeholder.md`
- **Acceptance:** ≥4 releases from CONTENT.md; Spotify/Bandcamp URLs in frontmatter where known
- **Prompt:** _Create music collection markdown files from docs/CONTENT.md._

#### T-303 — Dynamic grid from collections
- **Status:** `ready`
- **Deps:** T-301, T-302
- **Scope:** `src/pages/work/index.astro`, `src/pages/music/index.astro`, `src/pages/index.astro`
- **Acceptance:** Index pages render `Panel` from `getCollection()`; featured filter on home; no hardcoded panel arrays
- **Prompt:** _Replace hardcoded Panel lists with Astro content collection queries. Home shows featured work only._

#### T-304 — Work detail route
- **Status:** `ready`
- **Deps:** T-301
- **Scope:** `src/pages/work/[...slug].astro`, optional `src/layouts/CaseStudy.astro`
- **Acceptance:** Each work slug renders title, role, year, outbound URL or embed placeholder; 404 for unknown slugs
- **Prompt:** _Add work/[...slug].astro case study layout. Minimal template — expand in T-306._

#### T-305 — Music detail route
- **Status:** `ready`
- **Deps:** T-302
- **Scope:** `src/pages/music/[...slug].astro`
- **Acceptance:** Title, year, links to Spotify/Bandcamp; cover image if `cover` set
- **Prompt:** _Add music/[...slug].astro with outbound platform links._

#### T-306 — Cover images + public assets
- **Status:** `blocked`
- **Deps:** T-301, T-302
- **Blocker:** User assets — see CONTENT.md "User assets needed"
- **Scope:** `public/covers/**`, update frontmatter `cover` fields, `Panel.astro` to show images
- **Acceptance:** Panels show cover art; images optimized (WebP preferred); alt text set
- **Prompt:** _Wire cover images into Panel and content entries once assets are in public/covers/._

#### T-307 — Commercial video embeds
- **Status:** `blocked`
- **Deps:** T-304, T-306
- **Blocker:** PORTFOLIO MP4s need compress + host
- **Scope:** work detail pages for commercial slugs
- **Acceptance:** HTML5 video or hosted embed on case study pages; lazy load
- **Prompt:** _Embed commercial reels on work detail pages from public/video/._

---

### Phase 4 — signature & SEO

#### T-401 — Three.js hero island
- **Status:** `ready`
- **Deps:** none (can parallel Phase 3)
- **Scope:** `src/components/Hero3D.tsx` or `.astro` island, `src/pages/index.astro`
- **Acceptance:** Client island `client:visible`; monochrome placeholder mesh or glTF if available; no CLS; hero load = motion moment 1
- **Note:** v1 can ship Form A (stealth silhouette) only; morph = v1.1
- **Prompt:** _Add a Three.js client island to the home hero. Monochrome, lazy-loaded, placeholder geometry OK._

#### T-402 — OG meta + favicon polish
- **Status:** `ready`
- **Deps:** none
- **Scope:** `Layout.astro`, `public/og-default.png`, per-page titles
- **Acceptance:** `og:title`, `og:description`, `og:image`, `twitter:card` on all routes; favicon already exists
- **Prompt:** _Add Open Graph and Twitter meta tags. Create or placeholder og-default.png 1200×630._

#### T-403 — Sitemap
- **Status:** `ready`
- **Deps:** T-304, T-305
- **Scope:** `@astrojs/sitemap` integration
- **Acceptance:** `/sitemap-index.xml` generated on build; `site` in astro.config correct
- **Prompt:** _Add @astrojs/sitemap for static routes and content pages._

---

### Phase 5 — launch

#### T-501 — DNS cutover muuz.is → Vercel
- **Status:** `blocked`
- **Deps:** T-303, T-402, smoke test on preview
- **Blocker:** User action at registrar + Vercel domain settings
- **Scope:** Vercel dashboard + DNS (not code)
- **Acceptance:** Apex + www resolve; SSL valid; old 500 gone
- **Prompt:** _Document DNS steps in docs/LAUNCH.md after user confirms registrar access._

#### T-502 — Launch smoke test checklist
- **Status:** `ready`
- **Deps:** T-501
- **Scope:** `docs/LAUNCH.md`
- **Acceptance:** Checklist: all routes, mobile, OG debugger, Lighthouse, social links open
- **Prompt:** _Write docs/LAUNCH.md smoke test checklist from BRIEF success criteria._

---

### Phase 6 — polish (post-MVP)

#### T-601 — Lighthouse performance pass
- **Status:** `deferred`
- **Deps:** T-401, T-306
- **Acceptance:** Landing ≥90 performance mobile

#### T-602 — 3D morph animation (v1.1)
- **Status:** `deferred`
- **Deps:** T-401, Blender glTF
- **Acceptance:** Form A → Form B morph on scroll or idle

---

## Suggested agent dispatch order

```
Wave 1 (parallel):  T-301 + T-302 + T-401 + T-402
Wave 2:             T-303 → T-304 + T-305
Wave 3:             T-201 + T-202
Wave 4 (user assets): T-306 → T-307
Wave 5:             T-403 → T-501 → T-502
```

---

## Timeline (reference)

| Dates | Target |
| --- | --- |
| Jun 22 | ✅ Phase 2 shell (Lesson 4) |
| Jun 23–25 | Phase 3 content + grids |
| Jun 26–27 | T-401 3D hero + T-402 SEO |
| Jun 28–30 | Assets, DNS prep |
| Jul 1–4 | Polish + event-ready |
| Jul 5 | Buffer / v1.1 |

---

## Changelog

| Date | Change |
| --- | --- |
| 2026-06-22 | Plan created. Phase 2 marked done (tokens, 4 routes, Panel grid). |
