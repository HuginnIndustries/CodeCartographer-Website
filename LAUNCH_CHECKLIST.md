# CodeCartographer Website Launch Checklist

Date: 2026-05-21
Target host: Namecheap cPanel / Apache
Target domain: https://codecarto.dev/

## Current state

- Static site only: HTML, CSS, JS, robots.txt, sitemap.xml, .htaccess.
- No build step required.
- Website folder is not currently a git repository.
- Main CodeCartographer package is v0.8.0.
- Public repo links target the `main` branch.

## Pre-upload checklist

1. Confirm domain document root in cPanel.
   - Primary domain is usually `public_html/`.
   - Addon domain uses the folder configured for that addon domain.
2. Upload the contents of this folder, not the folder itself.
3. Confirm these files exist at the document root:
   - `index.html`
   - `features.html`
   - `docs.html`
   - `showcase.html`
   - `site.css`
   - `colors_and_type.css`
   - `script.js`
   - `.htaccess`
   - `robots.txt`
   - `sitemap.xml`
4. Enable AutoSSL for `codecarto.dev` and `www.codecarto.dev` if both are configured.
5. Confirm HTTPS works before relying on the HSTS header in `.htaccess`.
6. Visit these URLs after upload:
   - https://codecarto.dev/
   - https://codecarto.dev/features.html
   - https://codecarto.dev/docs.html
   - https://codecarto.dev/showcase.html
   - https://codecarto.dev/robots.txt
   - https://codecarto.dev/sitemap.xml

## Verification commands

From this folder locally:

```bash
python3 -m http.server 8123
```

Then open:

```text
http://127.0.0.1:8123/index.html
```

Basic sanity checks:

```bash
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path
class P(HTMLParser): pass
for p in Path('.').glob('*.html'):
    parser = P()
    parser.feed(p.read_text(encoding='utf-8'))
    print(f'OK html parse: {p.name}')
PY
```

## Post-launch checks

1. Browser console has no JavaScript errors on all four HTML pages.
2. Header navigation works on all pages.
3. Copy buttons on docs page write the expected commands.
4. External links resolve:
   - GitHub repository
   - main branch README / GUIDE / MANUAL / CHANGELOG / LICENSE / CONTRIBUTING
   - npm package
   - main.zip download
5. Mobile check:
   - nav wraps cleanly
   - hero buttons are full-width and tappable
   - code blocks do not create horizontal overflow
6. Search/indexing:
   - `robots.txt` returns 200
   - `sitemap.xml` returns 200
   - canonical tags point at `https://codecarto.dev/…`

## Follow-ups worth doing before a bigger public push

- Add a small real screenshot or generated sample artifact once CodeCartographer has a polished public demo output.
- Add an Open Graph image (`og:image`) so shares have a branded preview card.
- Decide whether to make `CodeCartographer-Website` its own git repo or fold it into the main repo under `website/`.
- Consider replacing Google Fonts with locally hosted font files if supply-chain/privacy posture matters for the public site.
