# Creative brief (locked v1)

_Status: locked 2026-06-21. Do not reopen without explicit user approval._

## One line

Monochrome creative studio site — luxury in restraint, tactical in type, cool in 3D and motion. Music, sound, and web as one practice.

## Feeling

Rick Owens showroom × MGS codec UI × Locomotive grid discipline. Considered space, not a resume.

## Locked decisions

| Area | Choice |
| --- | --- |
| Palette | Pure B&W shell (`#0a0a0a` bg, `#141414` surface, `#e8e8e8` text, `#737373` muted) |
| Accent | None site-wide; per-project color only inside case studies |
| Fonts | IBM Plex Sans Condensed (display/body) + IBM Plex Mono (meta/labels) |
| Hero | `muuz.is` wordmark only — no personal name |
| 3D | MGS stealth hardware → Arca organic morph (Blender → glTF → Three.js island) |
| Motion (v1) | **3 moments only:** hero load · scroll section titles · panel hover lift |
| About | Socials + Riga — no bio paragraph |
| Layout | Floating asymmetric project panels (not a vertical list) |

## What it is not

- Single-skill dev portfolio
- Generic template / bootcamp plant-shop aesthetic
- Copy of Locomotive, Elva, or digitalists layouts

## Routes (v1)

```
/                 Hero + 2 featured work panels
/work             Project grid
/work/[slug]      Case study
/music            Release grid
/music/[slug]     Optional detail + outbound links
/about            Social links
```

## Social URLs (locked)

| Platform | URL |
| --- | --- |
| SoundCloud | https://soundcloud.com/muuzis |
| Spotify | https://open.spotify.com/artist/6g0aXENYFr0qfxoLxPibhT |
| Bandcamp | https://muuzis.bandcamp.com/ |
| Instagram | https://www.instagram.com/_muuzis/ |
| YouTube | https://www.youtube.com/@muuzis |

## Success criteria (launch)

- [ ] `muuz.is` resolves to Vercel (no 500)
- [ ] All 5 routes live with real content where specified
- [ ] ≥2 music + ≥2 work case studies with real media/links
- [ ] Mobile-responsive, dark theme, readable type
- [ ] OG meta + favicon for link previews
- [ ] Lighthouse 90+ performance on landing

## Out of v1

Blog, CMS, contact form backend, Temporless microsite, complex 3D morph (v1.1 if time slips).
