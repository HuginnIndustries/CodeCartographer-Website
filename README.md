# CodeCartographer Website

Static marketing site for `codecarto.dev`. Built on the Hearth UI design template.

## Files

- `index.html` — overview and landing page
- `features.html` — pipeline variants, evidence classification, phase-gating, output artifacts
- `docs.html` — installation (drop-in, Pi-mono, MCP), configuration, cPanel deployment
- `showcase.html` — example outputs, defect scan passes, model compatibility, use cases
- `site.css` — marketing site styles (imports `colors_and_type.css`)
- `colors_and_type.css` — canonical design tokens (palette, typography, spacing, shadows)
- `logo.svg` — CodeCartographer map/matrix brand icon and favicon
- `script.js` — pipeline switcher, copy buttons, scroll reveals
- `.htaccess` — Apache config (HTTPS redirect, security headers)
- `robots.txt` — crawler guidance
- `sitemap.xml` — sitemap for the live domain
- `LAUNCH_CHECKLIST.md` — cPanel launch and post-upload verification checklist

## Deploy To Namecheap cPanel

1. Open Namecheap cPanel for the account serving `codecarto.dev`.
2. Go to File Manager.
3. Open the document root for the domain:
   - primary domain: usually `public_html/`
   - addon domain: the folder assigned as that domain's document root
4. Upload the contents of this folder into that document root.
5. Confirm `index.html` is at the top of the document root.
6. Enable AutoSSL for `codecarto.dev`.
7. Force HTTPS in the domain settings or with the `.htaccess` file.
8. Visit `https://codecarto.dev/` and hard refresh.

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
