# Launch smoke test checklist

Run on **preview** (`https://muuzis.vercel.app`) before DNS cutover, then repeat on **production** (`https://muuz.is`) after T-501.

---

## Routes

- [ ] `/` — hero wordmark `muuz.is`, 3D island loads, 2 featured work panels with covers
- [ ] `/work` — 6 project panels, all links resolve
- [ ] `/work/[slug]` — each slug renders title, role, year, body, outbound URL where set
- [ ] `/music` — 6 release panels with cover art
- [ ] `/music/[slug]` — title, format, year, platform links open in new tab
- [ ] `/about` — Riga line, social links
- [ ] `/sitemap.xml` — lists all static + content routes
- [ ] Unknown slug → 404

## Mobile (375px)

- [ ] Nav fits without horizontal scroll; active route visible
- [ ] Work/music grids single-column
- [ ] Focus ring visible on tab through links
- [ ] Hero readable; no CLS on 3D island load

## Link previews

- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — `og:title`, `og:description`, `og:image` (`/og-default.png`)
- [ ] [Twitter Card Validator](https://cards-dev.twitter.com/validator) or equivalent — `summary_large_image`
- [ ] Per-page titles follow `{title} · muuz.is` pattern

## Social links (open in new tab)

- [ ] SoundCloud → https://soundcloud.com/muuzis
- [ ] Spotify → https://open.spotify.com/artist/6g0aXENYFr0qfxoLxPibhT
- [ ] Bandcamp → https://muuzis.bandcamp.com/
- [ ] Instagram → https://www.instagram.com/_muuzis/
- [ ] YouTube → https://www.youtube.com/@muuzis

## Performance

- [ ] Lighthouse mobile on `/` — target ≥90 performance (T-601 if below)
- [ ] `prefers-reduced-motion: reduce` — hero + section title animations off; panel hover transform off

## DNS cutover (T-501 — user action)

1. Add `muuz.is` apex + `www` in Vercel project domains
2. Point registrar A/AAAA (apex) and CNAME (`www`) per Vercel instructions
3. Wait for SSL provisioning; confirm apex no longer returns 500
4. Re-run this checklist on production URL

## Known gaps (v1)

| Item | Blocker |
| --- | --- |
| Commercial work covers + video embeds | ~~User MP4s~~ done (T-307) |
| `raw-2026` cover (optional) | Figma still — sound project, no video |
| Delta album cover | Release in progress |
| Contact email | Add at cutover |
