# Ketan Jaysur — Portfolio Website

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

## How to publish it (free)

**Netlify Drop** — easiest:
1. Go to <https://app.netlify.com/drop>
2. Drag this whole folder onto the page.
3. You get a public link in seconds. Rename it under *Site settings → Change site name*.

**GitHub Pages:**
1. Create a repository and upload these files (keep the `assets` folder).
2. Go to *Settings → Pages*, choose `Deploy from a branch`, branch `main`, folder `/ (root)`.
3. Your site appears at `https://<username>.github.io/<repository>/`.

## How to update the content

- Text lives in `index.html`, grouped by section with comments like `<!-- ============ EXPERIENCE ============ -->`.
- Colours, spacing and typography are CSS variables at the top of `assets/styles.css`.
- After changing content, regenerate the PDF so it matches the site:

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --headless=new --disable-gpu --no-pdf-header-footer `
  --print-to-pdf="Ketan-Jaysur-CV.pdf" `
  "file:///C:/Users/User/OneDrive/Documents/Default%20Project/index.html"
```

The CV layout comes from the `@media print` block in `assets/styles.css`,
so the PDF always starts with a proper name/contact masthead and hides the
website chrome.

## Before you share it

- Confirm the LinkedIn URL: `linkedin.com/in/ketan-jaysur-253536122`
- Confirm the email (`kjesur@gmail.com`) and phone (`+91 97234 18883`) are current.
- Optionally replace the `KJ` monogram with a photo in the hero card
  (`.avatar` in `index.html`).
