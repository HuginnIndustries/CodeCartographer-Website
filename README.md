# CodeCartographer Website

Static marketing site for `codecarto.dev`. Built on the Hearth UI design template.

## Files

- `index.html` — overview and landing page
- `features.html` — pipeline variants, evidence classification, phase-gating, output artifacts
- `docs.html` — installation (drop-in, Pi-mono, MCP), configuration, GitHub Pages deployment
- `showcase.html` — example outputs, defect scan passes, model compatibility, use cases
- `site.css` — marketing site styles (imports `colors_and_type.css`)
- `colors_and_type.css` — canonical design tokens (palette, typography, spacing, shadows)
- `logo.svg` — CodeCartographer map/matrix brand icon and favicon
- `script.js` — pipeline switcher, copy buttons, scroll reveals
- `CNAME` — GitHub Pages custom-domain configuration for `codecarto.dev`
- `robots.txt` — crawler guidance
- `sitemap.xml` — sitemap for the live domain

## Deploy With GitHub Pages

GitHub Pages publishes the repository's `main` branch from the repository root.

1. Open a pull request targeting `main`.
2. Run `npm test` against the authoritative CodeCartographer checkout and wait for the pull-request checks to pass.
3. Merge the pull request. GitHub Pages automatically starts a new deployment.
4. Confirm the latest Pages build completed successfully in the repository's **Settings → Pages** view.
5. Keep `CNAME` set to `codecarto.dev`; GitHub Pages manages the approved TLS certificate and enforces HTTPS.
6. Visit `https://codecarto.dev/` and hard refresh.

## Important Link Notes

The site links to:

- repository: `https://github.com/HuginnIndustries/CodeCartographer`
- ZIP archive: `https://github.com/HuginnIndustries/CodeCartographer/archive/refs/heads/main.zip`

## Design

Color palette and typography follow the Hearth UI warm-neutral token system:

- Surfaces: Parchment (#ede5cc), Ivory (#f5efd8), Warm Sand (#e0d5b8)
- Primary: Iron Clay (#9e3728) / Coral (#b8432f)
- Type: Lora (display), Inter (body/UI), JetBrains Mono (code/identifiers)

All tokens are defined in `colors_and_type.css`. Tune the palette there; the marketing site reads from the same file.

## Verification

The static site is checked against an authoritative CodeCartographer checkout so version labels, MCP tool documentation, pipeline variants, and continuity terminology cannot drift silently.

```bash
# With the CodeCartographer repository as a sibling directory:
npm test

# Or point at another checkout explicitly:
CODECARTO_UPSTREAM=/absolute/path/to/CodeCartographer npm test
```

GitHub Actions checks out both repositories and runs the same source-boundary tests on every pull request and push to `main`.
