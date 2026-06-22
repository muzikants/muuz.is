# Launch content inventory

_Use when filling `src/content/music/` and `src/content/work/` or wiring panel cover images._

## Work panels

| Slug | Title | Meta | URL / media | Featured home |
| --- | --- | --- | --- | --- |
| `mg-bootcamp` | MG Bootcamp | Web · 2025 | https://baltic-squad.magebit.dev/ | ✓ |
| `raw-2026` | RAW 26 | Sound design · 2026 | Figma still / audio snippet | ✓ |
| `bite-gamers` | BITE — Gamers | Commercial · 2024 | PORTFOLIO MP4 | |
| `mezpils-alus` | Mežpils alus | Commercial · 2024 | PORTFOLIO MP4 | |
| `pols` | POLS | Commercial · 2023 | PORTFOLIO MP4 | |
| `saule-un-vejs` | Saule un Vējs | Commercial · 2023 | PORTFOLIO MP4 | |

**Note:** Commercial clips need compress + host in `public/` or embed URL before detail pages ship.

## Music releases (v1 grid — pick 4+)

| Slug | Title | Year | Notes |
| --- | --- | --- | --- |
| `ss24` | SS24 | 2025 | EP |
| `fear-survivor` | Fear Survivor | 2023 | Album |
| `cicada` | cicada | 2022 | Album |
| `water` | Water | 2023 | Single |
| `sea12-remix` | SEA12 (muuzis Remix) | 2024 | |
| `rbd` | ＲＢＤ™ | — | Bandcamp |
| `munch-deconstructed` | munch //\*deconstructed mix | — | Bandcamp |

**Delta album:** full album in progress — optional "coming soon" card later, not a v1 blocker.

## Cover images

- Pull from Spotify/Bandcamp artwork where possible
- Store in `public/covers/music/` and `public/covers/work/`
- Desaturate or keep native color inside panel only (shell stays B&W)

## User assets needed (blockers)

| Asset | For | Status |
| --- | --- | --- |
| Bootcamp screenshot | `mg-bootcamp` cover | User can capture from live URL |
| RAW still / waveform | `raw-2026` cover | User has Figma |
| PORTFOLIO MP4s (×4) | Commercial panels | User has files — need compress + `public/` |
| Blender glTF (optional) | 3D hero | Lesson 5 / v1.1 if timeline slips |
| Email address | About / footer | Add at DNS cutover |
| OG default image | Social previews | Generate or design 1200×630 |
