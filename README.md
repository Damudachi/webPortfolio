# Aldrich Sabando — Applied AI & Software Engineering

A single-page portfolio built as a plate book of working systems: each featured
project is a plate with its own technical figure and a numbered key, and
pointing at a line in the key lights up the part of the drawing it describes.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · deployed on Vercel.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
npx tsc --noEmit # type-check
```

No environment variables are required. The site is fully static — no API
routes, no database, no analytics, no secrets.

## How it is put together

```
src/
  app/
    layout.tsx             fonts, metadata, html shell
    page.tsx               section order
    globals.css            design tokens and every component style
    icon.svg               favicon (the AS monogram)
    opengraph-image.tsx    social card, generated at build time
  components/
    Masthead.tsx           sticky masthead, scroll-spy, mobile menu
    Hero.tsx / HeroField.tsx
    SystemFacts.tsx
    SelectedWork.tsx       wraps the three plates and the More builds index
    PlateTulongGuro.tsx    case file + grading console + four-step pipeline
    PlateLiturgyGen.tsx    press sheet + keyed legend
    PlateIntelsy.tsx       detection frame + keyed legend
    plate-parts.tsx        shared plate head, callouts, legend
    Principles.tsx / Profile.tsx / StackCreds.tsx / Contact.tsx / Footer.tsx
    Monogram.tsx           the AS mark, drawn as SVG
    Grain.tsx              fixed noise overlay
  lib/
    content.ts             every fact and link on the page, in one place
    field.ts               seeded generator for the hero field and the
                           handwriting in the TulongGuro submission panel
```

Edit copy in `src/lib/content.ts`. Nothing on the page is hardcoded elsewhere.

### Design notes

- **Palette** is strictly grayscale: `#090A0B`, `#0D0F11`, `#131619`, `#303438`,
  `#858B91`, `#F0F1F2`, `#D9DDE0`. Hierarchy comes from scale, rule weight and
  space, never colour.
- **Type** is Archivo (using its width axis for display sizes) with IBM Plex
  Mono for indexes, dates and annotations, both loaded through `next/font`.
- **Every visual is drawn in SVG or CSS.** There are no raster images, so
  nothing can 404 or slow the page down.
- **Motion** is one page-load sequence (the hero field drawing itself) plus
  responses to hover and focus. `prefers-reduced-motion` turns all of it off.
- The three project figures are illustrations, labelled as such on the page. No
  benchmark numbers, inference speeds or model scores are shown anywhere.

### Résumé download

There is no résumé link, because there is no PDF in the repository. To add one:
drop `resume.pdf` into `public/` and add a link to `/resume.pdf` in
`src/components/Contact.tsx`. Do not link the `.docx`.

## Deploying to Vercel

The project uses a stock Next.js configuration, so Vercel detects everything on
its own: framework preset **Next.js**, build command `npm run build`, output
handled by the Next.js adapter. There is no custom server and no environment
variable to set.

**Git-connected (recommended):**

1. Push this repository to GitHub.
2. In Vercel, **Add New → Project**, import the repository.
3. Confirm the detected Next.js preset and build command, then **Deploy**.

After that, pushes to the production branch deploy to production and pushes to
any other branch get a preview deployment.

**From the CLI:**

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

### Canonical URL

Open Graph metadata needs an absolute URL. On Vercel this is picked up from
`VERCEL_PROJECT_PRODUCTION_URL` automatically. If you attach a custom domain,
set `NEXT_PUBLIC_SITE_URL` to it in the Vercel project's environment variables
so the social card and canonical links point at the right host.

## Source material

`brief/` holds the build brief, the reference art and the résumé `.docx` this
site was written from. It is git-ignored, because the résumé contains personal
contact details that are deliberately not published on the site.
