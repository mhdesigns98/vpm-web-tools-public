# VPM Web Tools — Public

HTML embeds, page components, and digital experiences built for [vpm.org](https://www.vpm.org). Projects are organized for review and deployed via GitHub Pages.

**Live portfolio:** https://mhdesigns98.github.io/vpm-web-tools-public/

---

## Projects

### Embeds
Standalone HTML snippets designed to drop into the CMS.

| Project | Description | Preview |
|---------|-------------|---------|
| Morning Monitor | Newsletter signup form for VPM's morning briefing | [View](https://mhdesigns98.github.io/vpm-web-tools-public/embeds/morning-monitor/) |
| Watch Page — Channel Header | Live stream channel tiles for the Watch page | [View](https://mhdesigns98.github.io/vpm-web-tools-public/embeds/watch-page/preview.html) |
| YouTube Shorts | Playlist embed for VPM News Shorts | [View](https://mhdesigns98.github.io/vpm-web-tools-public/embeds/youtube-shorts/vpm-shorts-embed.html) |

### Pages
Full page designs and section mockups.

| Project | Description | Preview |
|---------|-------------|---------|
| Shenandoah | Landing page for the VPM original documentary | [View](https://mhdesigns98.github.io/vpm-web-tools-public/pages/shanendoah/) |
| Early Childhood Education | Article cards and components for the ECE section | [View](https://mhdesigns98.github.io/vpm-web-tools-public/pages/early-childhood-education/) |
| Impact Page — Annual Report 2025 | Community impact components and funding messaging | [View](https://mhdesigns98.github.io/vpm-web-tools-public/pages/impact-page/Annual%20Report%20-%202025/) |
| How Federal Funding Works | Explainer section with Vimeo embed and CTA | [View](https://mhdesigns98.github.io/vpm-web-tools-public/pages/impact-page/how-federal-funding-works-preview.html) |
| Working at VPM | Careers and recruitment page | [View](https://mhdesigns98.github.io/vpm-web-tools-public/pages/working-at-vpm/working-at-vpm.html) |
| BFD — Broad Street Facility | Renderings and milestone coverage for VPM's new building | — |

### Components
Reusable UI elements and design patterns.

| Project | Description | Preview |
|---------|-------------|---------|
| Spotlight | Homepage spotlight cards with tag-based queue management | [View](https://mhdesigns98.github.io/vpm-web-tools-public/components/spotlight/VPM-Spotlight-Homepage/) |
| Banners | Ad banner templates and examples | [View](https://mhdesigns98.github.io/vpm-web-tools-public/components/banners/) |
| Footer | Footer layout edits and refinements | — |

---

## Folder Structure

```
embeds/          # CMS-ready HTML snippets
  morning-monitor/
  watch-page/
  youtube-shorts/
pages/           # Full page designs and mockups
  bfd/
  early-childhood-education/
  impact-page/
  shanendoah/
  working-at-vpm/
components/      # Reusable UI elements
  banners/
  footer/
  spotlight/
```

---

## Notes

- Files named `-component.html`, `-fragment.html`, or `-inline.html` are CMS embed snippets — use the companion `index.html`, `preview.html`, or `-demo.html` file in the same folder to preview them.
- VPM's custom typeface (GT America) won't load outside of vpm.org. Previews fall back to Barlow, which is close.
- Images reference `assets.vpm.org` and load normally since that CDN is public.
