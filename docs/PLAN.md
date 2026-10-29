# muuz.is — build plan & agent task queue

**Updated:** 2026-10-28  
**Deadline:** Ship before **2026-07-05** (Cursor sub); soft target **2026-07-04** (MG Bootcamp event)  
**Preview:** https://muuzis.vercel.app  
**Repo:** https://github.com/muzikants/muuz.is

---

## Status dashboard

| Phase | Name | Status |
| --- | --- | --- |
| 0 | Plan & brief | ✅ done |
| 1 | Scaffold + Vercel | ✅ done |
| 2 | Design shell | ✅ done |
| 3 | Content collections | ✅ done |
| 4 | SEO + meta | ✅ done (migration) |
| 5 | DNS cutover | ✅ done |
| 6 | Polish buffer | 🟡 in progress |

**Current focus:** Phase 6 polish — T-601 Lighthouse pass is next; content depth (real case-study copy) needs user input.

---

## Stack migration (2026-07-02)

Astro 6 → **Next.js 15** (App Router, static export). Content moved to `content/`; routes in `src/app/`; loader in `src/lib/content.ts`. Build emits 20 static routes (incl. sitemap, detail pages).

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
- **Status:** `done`
- **Handoff:** `src/components/Footer.tsx` wired in `src/app/layout.tsx` — mono wordmark, year, compact social links.
- **Deps:** none
- **Scope:** `src/components/Footer.tsx`, `src/app/layout.tsx`
- **Acceptance:** Minimal footer — `muuz.is` mono, year, social icons or text links; matches B&W tokens; mobile-safe
- **Prompt:** _Add a minimal Footer per docs/BRIEF.md and include it in Layout.astro._

#### T-202 — Mobile + a11y pass (shell)
- **Status:** `done`
- **Handoff:** Focus-visible on links; mobile single-column grid; nav gap tightened at 375px in `Nav.tsx` + `globals.css`.
- **Deps:** T-201 (optional)
- **Scope:** `src/app/globals.css`, `src/components/Nav.tsx`, grid pages
- **Acceptance:** Nav usable at 375px; focus visible on links; no horizontal scroll; `prefers-reduced-motion` respected (already partial)
- **Prompt:** _Mobile responsive pass on nav and work-grid. Visible focus states on all interactive elements._

---

### Phase 3 — content

#### T-301 — Work content collection entries
- **Status:** `done`
- **Handoff:** 6 work entries in `src/content/work/` from CONTENT.md; placeholders removed.
- **Deps:** none
- **Scope:** `src/content/work/*.md`, remove `_placeholder.md`
- **Acceptance:** 6 entries per `docs/CONTENT.md`; valid frontmatter (`title`, `year`, `role`, `featured`, `gridSpan`, `url` where known); `npm run build` passes
- **Prompt:** _Create work collection markdown files from docs/CONTENT.md. Delete _placeholder.md._

#### T-302 — Music content collection entries
- **Status:** `done`
- **Handoff:** 5 music entries in `src/content/music/` (4 v1 grid + SEA12 remix); Bandcamp-only entries deferred until year known.
- **Deps:** none
- **Scope:** `src/content/music/*.md`, remove `_placeholder.md`
- **Acceptance:** ≥4 releases from CONTENT.md; Spotify/Bandcamp URLs in frontmatter where known
- **Prompt:** _Create music collection markdown files from docs/CONTENT.md._

#### T-303 — Dynamic grid from collections
- **Status:** `done`
- **Handoff:** Home, `/work`, and `/music` render panels from `getCollection()`; added `format` to music schema for panel meta.
- **Deps:** T-301, T-302
- **Scope:** `src/pages/work/index.astro`, `src/pages/music/index.astro`, `src/pages/index.astro`
- **Acceptance:** Index pages render `Panel` from `getCollection()`; featured filter on home; no hardcoded panel arrays
- **Prompt:** _Replace hardcoded Panel lists with Astro content collection queries. Home shows featured work only._

#### T-304 — Work detail route
- **Status:** `done`
- **Handoff:** `src/pages/work/[...slug].astro` — title, role, year, tags, outbound URL, body.
- **Deps:** T-301
- **Scope:** `src/pages/work/[...slug].astro`, optional `src/layouts/CaseStudy.astro`
- **Acceptance:** Each work slug renders title, role, year, outbound URL or embed placeholder; 404 for unknown slugs
- **Prompt:** _Add work/[...slug].astro case study layout. Minimal template — expand in T-306._

#### T-305 — Music detail route
- **Status:** `done`
- **Handoff:** `src/pages/music/[...slug].astro` — title, format, year, platform links, optional cover.
- **Deps:** T-302
- **Scope:** `src/pages/music/[...slug].astro`
- **Acceptance:** Title, year, links to Spotify/Bandcamp; cover image if `cover` set
- **Prompt:** _Add music/[...slug].astro with outbound platform links._

#### T-306 — Cover images + public assets
- **Status:** `done`
- **Handoff:** `Panel.tsx` renders optional `cover` via `next/image`; music covers from Spotify art in `public/covers/music/`; work covers for mg-bootcamp + 4 commercials. `raw-2026` has no video — optional Figma still for panel only.
- **Deps:** T-301, T-302
- **Blocker:** ~~User assets~~ — `raw-2026` panel still optional
- **Scope:** `public/covers/**`, update frontmatter `cover` fields, `Panel.astro` to show images
- **Acceptance:** Panels show cover art; images optimized (WebP preferred); alt text set
- **Prompt:** _Wire cover images into Panel and content entries once assets are in public/covers/._

#### T-307 — Commercial video embeds
- **Status:** `done`
- **Handoff:** 4 reels compressed to `public/video/` (22 MB total); poster WebPs in `public/covers/work/`; `WorkVideo.tsx` on work detail pages (`preload="none"`, poster from cover).
- **Deps:** T-304, T-306
- **Blocker:** ~~PORTFOLIO MP4s need compress + host~~
- **Scope:** work detail pages for commercial slugs
- **Acceptance:** HTML5 video or hosted embed on case study pages; lazy load
- **Prompt:** _Embed commercial reels on work detail pages from public/video/._

---

### Phase 4 — signature & SEO

#### T-401 — Three.js hero island
- **Status:** `done`
- **Handoff:** `src/components/Hero3D.tsx` — `@react-three/fiber` wireframe icosahedron, lazy via client component, reduced-motion fallback.
- **Deps:** none (can parallel Phase 3)
- **Scope:** `src/components/Hero3D.tsx`, `src/app/page.tsx`
- **Acceptance:** Client island `client:visible`; monochrome placeholder mesh or glTF if available; no CLS; hero load = motion moment 1
- **Note:** v1 can ship Form A (stealth silhouette) only; morph = v1.1
- **Prompt:** _Add a Three.js client island to the home hero. Monochrome, lazy-loaded, placeholder geometry OK._

#### T-402 — OG meta + favicon polish
- **Status:** `done`
- **Handoff:** `src/lib/metadata.ts` — `metadataBase`, Open Graph + Twitter on all routes; `public/og-default.png`.
- **Deps:** none
- **Scope:** `src/app/layout.tsx`, `public/og-default.png`, per-page metadata
- **Acceptance:** `og:title`, `og:description`, `og:image`, `twitter:card` on all routes; favicon already exists
- **Prompt:** _Add Open Graph and Twitter meta tags. Create or placeholder og-default.png 1200×630._

#### T-403 — Sitemap
- **Status:** `done`
- **Handoff:** `src/app/sitemap.ts` — static routes + all work/music slugs at build time.
- **Deps:** T-304, T-305
- **Scope:** `src/app/sitemap.ts`
- **Acceptance:** `/sitemap-index.xml` generated on build; `site` in astro.config correct
- **Prompt:** _Add @astrojs/sitemap for static routes and content pages._

---

### Phase 5 — launch

#### T-501 — DNS cutover muuz.is → Vercel
- **Status:** `done`
- **Handoff:** Apex `muuz.is` → 308 to `www.muuz.is`; www serves site over HTTPS (Vercel). Confirmed 2026-07-03.
- **Deps:** T-303, T-402, smoke test on preview
- **Blocker:** ~~User action at registrar + Vercel domain settings~~
- **Scope:** Vercel dashboard + DNS (not code)
- **Acceptance:** Apex + www resolve; SSL valid; old 500 gone
- **Prompt:** _Document DNS steps in docs/LAUNCH.md after user confirms registrar access._

#### T-502 — Launch smoke test checklist
- **Status:** `done`
- **Handoff:** `docs/LAUNCH.md` — route, mobile, OG, social, Lighthouse, DNS steps; preview + production sections.
- **Deps:** T-501
- **Scope:** `docs/LAUNCH.md`
- **Acceptance:** Checklist: all routes, mobile, OG debugger, Lighthouse, social links open
- **Prompt:** _Write docs/LAUNCH.md smoke test checklist from BRIEF success criteria._

---

### Phase 6 — polish (post-MVP)

#### T-603 — Hero 3D + case study layout polish
- **Status:** `done`
- **Handoff:** Enhanced `Hero3D` — stealth wireframe silhouette, MGS codec grid, lazy-loaded canvas (`Hero3DCanvas.tsx`), hero load animations. New `CaseStudy` layout for work detail pages with per-project accent colors, meta rail, media slot. `raw-2026` waveform SVG cover added.
- **Deps:** T-401, T-304
- **Scope:** `Hero3D.tsx`, `Hero3DCanvas.tsx`, `CaseStudy.tsx`, `work/[slug]/page.tsx`, `globals.css`, work frontmatter accents
- **Acceptance:** Hero is full-viewport with animated 3D island; case studies use structured layout; build passes; home First Load JS reduced via dynamic import

#### T-605 — Design iteration: hero + editorial layout
- **Status:** `done`
- **Handoff:** Hero: form enlarged and moved off-centre (right on desktop), glowing vertex particles over a dim wireframe, background dust field, pointer parallax; wordmark is now a huge bottom-left lockup with tagline + scroll cue; codec HUD (coords, live form/morph readout). Layout: borderless panels with `01`–`NN` index captions; fixed 7+5 / 5+7 row rhythm in CSS (`.work-grid` nth-child) — content `gridSpan` no longer drives layout; new `SectionHead` (oversized titles + entry count) on home, work, music, about.
- **Deps:** T-602, T-604

#### T-601 — Lighthouse performance pass
- **Status:** `deferred`
- **Deps:** T-401, T-306
- **Acceptance:** Landing ≥90 performance mobile

#### T-602 — 3D morph animation (v1.1)
- **Status:** `done`
- **Handoff:** Procedural instead of Blender glTF — `Hero3DCanvas.tsx` builds one icosahedron with Form A (faceted swept stealth wing) as base and Form B (noise-displaced organic mass) as a morph target. Idle cycle drifts A→B→A; scrolling out of the hero commits to B. Canvas stops rendering when off-screen. Swap in a glTF later if the Blender forms land.
- **Deps:** T-401
- **Acceptance:** Form A → Form B morph on scroll or idle

#### T-604 — Release pages, grid packing, 404, SEO depth
- **Status:** `done`
- **Handoff:** New `Release.tsx` layout for `/music/[slug]` (sticky large cover, Spotify embed, platform link list, MusicAlbum JSON-LD). `EntryPager.tsx` prev/next on music + work detail. Grid uses `dense` flow and alternates large panels (`src/lib/layout.ts`) — no more holes. Coverless panels render a typographic placeholder. Fixed RAW 26 cover (invalid UTF-8 byte broke the SVG). Custom `not-found.tsx`. Per-page OG image = entry cover, descriptions from body, canonical URLs, MusicGroup JSON-LD in layout. `og-default.png` resized to true 1200×630 (1.1 MB → 325 KB).
- **Deps:** T-305, T-306

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
| 2026-10-29 | T-605: hero particles/parallax/HUD + bottom-left wordmark; borderless indexed panels; fixed editorial grid rhythm; SectionHead. |
| 2026-10-28 | T-602 procedural stealth→organic morph hero. T-604 release pages + Spotify embeds, prev/next pager, dense grid, 404, per-page OG/JSON-LD, RAW 26 cover fix. |
| 2026-07-03 | T-603: Enhanced 3D hero (stealth silhouette, codec grid, lazy load), CaseStudy layout with per-project accents, raw-2026 waveform cover. |
| 2026-07-03 | T-307: Commercial reels from `~/Documents/MZ/PORTFOLIO/` → `public/video/`, panel posters, `WorkVideo` embeds on case studies. |
| 2026-07-03 | T-306 partial: Panel cover images, 5 music + mg-bootcamp WebP covers, album Spotify URLs. T-502: `docs/LAUNCH.md` smoke checklist. |
| 2026-07-02 | **Stack migration:** Astro → Next.js 15 static export. T-201, T-202, T-401, T-402, T-403 done on new stack. Build → 20 static routes. |
| 2026-06-22 | Phase 3 content: T-301–T-305 done. 6 work + 5 music entries; dynamic grids; detail routes. Build → 15 pages. |
| 2026-06-22 | Plan created. Phase 2 marked done (tokens, 4 routes, Panel grid). Pushed `f60be39` to main → Vercel deploy. |
