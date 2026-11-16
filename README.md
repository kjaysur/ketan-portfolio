# Ketan Jaysur — Portfolio Website

**Live site:** <https://kjaysur.github.io/ketan-portfolio/>

A single-page portfolio site built with plain HTML, CSS and a small amount of JavaScript.
No build tools, no frameworks, no internet connection required.

## What's in this folder

```
index.html              The website (all content lives here)
Ketan-Jaysur-CV.pdf     Two-page CV generated from the same content
robots.txt              Lets search engines index the site when hosted
assets/
  styles.css            All styling, responsive layout and print styles
  script.js             Navigation, scroll effects, counters, scroll-spy
```

## How to view it

Double-click `index.html`. It opens in any modern browser (Chrome, Edge, Safari, Firefox).

The site works offline. The only optional network request is the Google Fonts
stylesheet; if it is unavailable, the page falls back to system fonts and still looks fine.

## Publishing

This site is published with **GitHub Pages** straight from this repository:

| Setting | Value |
| --- | --- |
| Source | Deploy from a branch |
| Branch | `main` |
| Folder | `/ (root)` |
| Live URL | <https://kjaysur.github.io/ketan-portfolio/> |

Every `git push` to `main` redeploys the site automatically in about a minute.
The Pages configuration lives at *Settings → Pages* in the GitHub repository.

**Alternative — Netlify:**
1. Go to <https://app.netlify.com/drop>
2. Drag this whole folder onto the page.
3. Rename the site under *Site settings → Change site name*.

## How to update the content

1. Edit `index.html` or `assets/styles.css`.
2. Preview by opening `index.html` in your browser.
3. If the CV content changed, regenerate the PDF (command below).
4. Publish the change:

```powershell
cd "C:\Users\User\Projects\ketan-portfolio"
git add .
git commit -m "Describe what you changed"
git push
```

GitHub Pages picks up the change automatically — no manual upload needed.

- Text lives in `index.html`, grouped by section with comments like `<!-- ============ EXPERIENCE ============ -->`.
- Colours, spacing and typography are CSS variables at the top of `assets/styles.css`.
- Regenerate the PDF so it matches the site:

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --headless=new --disable-gpu --no-pdf-header-footer `
  --print-to-pdf="Ketan-Jaysur-CV.pdf" `
  "file:///C:/Users/User/Projects/ketan-portfolio/index.html"
```

The CV layout comes from the `@media print` block in `assets/styles.css`,
so the PDF always starts with a proper name/contact masthead and hides the
website chrome.

## Before you share it

- Confirm the LinkedIn URL: `linkedin.com/in/ketan-jaysur-253536122`
- Confirm the email (`kjesur@gmail.com`) and phone (`+91 97234 18883`) are current.
- Optionally replace the `KJ` monogram with a photo in the hero card
  (`.avatar` in `index.html`).
