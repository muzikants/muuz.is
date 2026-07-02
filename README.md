# muuz.is

Personal portfolio — Next.js 15, Tailwind v4, Vercel.

**Preview:** https://muuzis.vercel.app  
**Target:** https://muuz.is

## For humans

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → out/
```

## For agents

1. Read **`AGENTS.md`**
2. Pick a task from **`docs/PLAN.md`**
3. Design constraints in **`docs/BRIEF.md`**
4. Content list in **`docs/CONTENT.md`**

This repo is self-contained. Do not switch to the Brain/Obsidian vault for implementation.

## Structure

```
src/app/          Routes (App Router)
src/components/   UI
src/lib/          Content loader + schemas
content/          Music + work markdown
docs/             Plan, brief, content inventory
```
