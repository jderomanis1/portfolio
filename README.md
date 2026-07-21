# deromanis.com — Experience Site

Static site. No build step, no dependencies. Edit HTML, push, done.

## Deploy to GitHub Pages (one time)

1. Create a repo (e.g. `deromanis.com` or `experience-site`) and push these files to `main`.
2. GitHub → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main` / `(root)`.
   (No build pipeline needed — this is plain HTML, so branch deploy is the simplest correct choice.)
3. Wait ~60–90 seconds, then visit the `github.io` URL and confirm it loads with no console errors.

## Point deromanis.com at it

1. The `CNAME` file in this repo is already set to `deromanis.com`.
2. At your DNS provider, add:
   - `A` records for the apex → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `<your-github-username>.github.io`
3. GitHub → Settings → Pages → Custom domain: `deromanis.com` → wait for DNS check → enable **Enforce HTTPS**.

## Before going live — edit these

- `index.html` → contact email (`joe@deromanis.com` placeholder) and LinkedIn URL (`YOUR-HANDLE`).
- Drop your résumé at `assets/Joe-DeRomanis-Resume.pdf` (both download buttons already point there).
- Certifications section: 5 named + degree are listed; the "+13 more" line is where the rest go if you want them itemized.
