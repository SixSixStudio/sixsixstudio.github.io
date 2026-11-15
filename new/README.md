# sixsisstudio — site

One page, hand-written HTML/CSS. No build step, no frameworks, no dependencies except two
Google Fonts (Inter, Instrument Serif) which fall back to system fonts offline.

## Files

    site/index.html          the page — all CSS is inline in <style>
    site/brand/mark-256.png  circular mark, used in header/footer/favicon
    site/brand/favicon.png   browser icon
    site/brand/logo-badge-800.png  full arched badge, used for og:image / socials
    site/brand/logo-badge.png      full badge, transparent background (master)
    site/brand/mark-circle.png     circular mark with transparent outside (master)
    site/brand/mark.png            square crop of the disc (has black corners — do not use on light)

## Hero video

    brand/video/hero.mp4         12s, 1280x720, h264, no audio, 369 KB
    brand/video/hero-poster.jpg  first-frame fallback, 13 KB

Source: Pixabay video id 37862 (out-of-focus warm bokeh on black), trimmed to 12s,
scaled to 720p, crf 31, `-an`, faststart, then mirrored horizontally in CSS
(`transform:scaleX(-1)`) so the glow sits behind the photo card instead of behind
the headline. Overlay stack inside `.hero`:
`.hero-bg` (poster + video) -> `.hero-tint` (two gradients) -> `.hero-mark`
(logo at 7.5% opacity) -> `.hero-grid` with the copy at z-index 2.

Autoplay rules: `muted` + `playsinline` + `loop`; if the browser refuses, the poster
stays. `prefers-reduced-motion` hides the video entirely and flattens the tint.

To go back to the pre-video hero:

    cp ~/sixsisstudio/backups/index-static-hero-2026-11-07.html \
       ~/sixsisstudio/site/index.html
    cp ~/sixsisstudio/site/index.html /sdcard/Download/sixsisstudio/site/index.html

(The backup lives outside site/ on purpose — anything inside site/ gets published.)

## Photography

All four images are Pixabay stock, downloaded through `content-pipeline/pixabay.py`
and cropped to 9:16 by `tools/prep_images.py`:

    brand/stock/hero.jpg        id 7320119  editing timeline on a monitor — hero
    brand/stock/step-vertical.jpg id 4797499 two phones held upright — card 01
    brand/stock/step-footage.jpg  id 2838921 laptop/desk, footage sent in — card 02
    brand/stock/step-ontime.jpg   id 614149  planner + pen, agreed date — card 03
    brand/stock/fmt-florist.jpg id 4013862  independent florist — format tile
    brand/stock/fmt-barber.jpg  id 7820299  barbershop — format tile
    brand/stock/fmt-nails.jpg   id 6836787  nail technician — format tile

Hero and cards are all graded (brightness ~0.92-0.95, saturation ~0.86-0.90) so
stock never glares against the dark page. Card images are cropped 4:3, hero 4:5.
No faces are used — avoids any implied-endorsement issue.

Pixabay licence: free for commercial use, no attribution required, no model
releases needed for this kind of use. They are labelled on the page as format
references, NOT as client work — do not relabel them as our portfolio.

Brand files were generated from the supplied 2000×2000 logo by
`tools/mklogo.py` (crop + knock black out to transparency) and
`tools/mkcircle.py` (circular alpha mask, 256/512 exports).

## Preview on the phone

The folder is mirrored at:

    /sdcard/Download/sixsisstudio-site/index.html

Open it with Chrome via a file manager. Note the fonts need a network connection;
without one the page uses system fonts and still reads correctly.

## Deploy (free, GitHub Pages)

1. Create a GitHub account/org named `sixsisstudio` (or any name) and a **public** repo.
2. Upload the whole `site/` folder contents to the repo root (index.html at root).
3. Repo → Settings → Pages → Source: `Deploy from a branch`, Branch: `main`, folder `/ (root)`.
4. Live at `https://<user>.github.io/<repo>/`.
5. Custom domain later: Settings → Pages → Custom domain, then a CNAME in DNS.
   Buying the domain from the first £69, not before.

No `.nojekyll` needed — there is no underscore-prefixed path.

## Editing

- Prices live in the `#packages` section; the add-on row is `.addons`. Opening ladder
  (7 Nov, halved from launch pricing): trial 35 / starter 75 / growth 140 /
  your-phone 99; single 25, audit 25, filming day 150. Raise them once three paying
  clients are in. Change the card, the add-on row AND the `mailto:` subject together.
- Volume (7 Nov, doubled for value): starter 8 videos/mo, growth 16/mo, your-phone
  12 edits/mo. Revisions doubled everywhere they are stated: trial 2, starter 2 each,
  growth 4 each, strip + trust line + process step + card 03 all say two.
- Contact address appears 12 times as `sixsixlong@protonmail.com`. Replace all with
  `patch`, not sed, if it ever changes.
- When real client cuts exist: in `#formats`, swap each `<img src="brand/stock/fmt-…">`
  for a `<video class="fmt-vid" src="work/x.mp4" muted loop playsinline
  preload="metadata" poster="work/x.jpg">` (add `.fmt-vid{width:100%;aspect-ratio:2/3;object-fit:cover}`),
  and change the section line that calls them format references. 9:16, under 6 MB each.

## Validation done on this box

- Tag balance + no unclosed elements (html.parser): clean.
- Every local src/href resolves to a real file: clean.
- Prices on page: 35 / 75 / 140 / 99 plus 25 / 25 / 150.
- Zero occurrences of "clinic", "dental", "practice" or "West London" — the page
  targets businesses generally; geography appears only as "London".
- Not validated: rendered layout — no browser on this machine. Visual check is on the phone.

## Sound policy (do not add music)

Voice, real ambience, sound design, silence. Optional solo unpitched percussion only.
The site says this in the sound section; keep it true.
