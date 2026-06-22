# AGENTS.md — muuz.is build workspace

**This repo is the single source of truth for building and shipping the site.**  
Do not switch to the Brain vault for implementation work. Planning lives here.

## Start here

1. Read **`docs/PLAN.md`** — current status, task queue, dependencies.
2. Read **`docs/BRIEF.md`** — locked design decisions (do not contradict).
3. Pick **one** task from PLAN (status `ready`). Mark it `in_progress` in PLAN when you start.
4. Run `npm run build` before finishing. Fix failures in scope.
5. Mark task `done` in PLAN and note what changed in your handoff.

## Workspace rules

| Rule | Why |
| --- | --- |
| Stay in `~/Documents/MZ/muuz.is` | Avoids split context with Brain/Obsidian |
| One task per agent session | Keeps diffs reviewable |
| `npm run build` must pass | Static Astro site; no broken deploys |
| No site-wide accent colors | B&W shell per BRIEF |
| Max 3 motion moments in v1 | Hero load · scroll titles · panel hover |
| Hero = `muuz.is` wordmark only | No personal name in hero |
| No contact form backend in v1 | Social links + email at cutover only |
| Commit when task is done | User or orchestrator pushes to deploy |

## Stack (locked)

- Astro 6, static output, Tailwind v4 via Vite plugin
- IBM Plex Sans Condensed + IBM Plex Mono (`@fontsource`)
- Content Collections for `music` and `work`
- Vercel auto-deploy on push to `main`
- Preview: https://muuzis.vercel.app
- Target domain: `muuz.is` (apex currently 500 — DNS task)

## Key paths

```
src/pages/           Routes
src/components/      UI primitives (Nav, Panel, …)
src/layouts/         Layout.astro
src/content/         Markdown entries (music/, work/)
src/styles/global.css Design tokens + component classes
docs/PLAN.md         Task queue for agents
docs/BRIEF.md        Creative brief (locked)
docs/CONTENT.md      Launch content inventory
```

## Orchestrator pattern

A **planning agent** maintains `docs/PLAN.md` (status, priorities, blockers).  
**Worker agents** claim one `T-###` task each, implement, update PLAN, commit.

Suggested dispatch prompt for workers:

> Open `~/Documents/MZ/muuz.is`. Read AGENTS.md and docs/PLAN.md. Execute task **T-###** only. Run `npm run build`. Update PLAN task status. Commit with message referencing task ID.

## Brain vault (reference only)

Creative brief origin + learn track history live in Obsidian (`MZ_Documents/Brain`).  
Harvest wiki notes **after** launch, not during build sprints.  
If BRIEF and Brain disagree, **BRIEF in this repo wins**.
