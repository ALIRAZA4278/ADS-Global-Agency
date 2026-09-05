# ADS Global Agency

Single-page agency site built with Next.js 16 (App Router, Turbopack), React 19,
Tailwind CSS v4 and Motion.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Where things live

```
src/
  lib/site.js               ← ALL copy, prices, services, projects, positions
  app/
    layout.js               fonts, metadata, providers
    page.js                 section order
    actions.js              contact + careers server actions
    globals.css             design tokens, keyframes, custom utilities
  components/
    providers/Providers.jsx Lenis smooth scroll, motion config, inquiry provider
    inquiry/                hero enquiry modal + its context
    layout/                 Navbar, Footer, Logo
    sections/               Hero, Marquee, Process, About, Services, Work,
                            Packages, Testimonials, Faq, Contact, Careers
    ui/                     Button, Field, SpotlightCard, Reveal, Counter,
                            SectionHeading, Starfield, CornerBrackets, Icon
```

## Editing content

Everything user-facing comes from `src/lib/site.js` — brand details, nav, the
service and budget dropdowns, packages, projects, FAQs and the careers role
list. Two things live outside it:

- `src/app/layout.js` — `metadataBase` points at `https://adsglobalagency.com`.
- `src/components/layout/Logo.jsx` — the "A" mark is an inline SVG.

## Forms

Both forms are real server actions that validate on the server and return
field-level errors while preserving what the visitor typed.

| Form | Where | Action | Fields |
| --- | --- | --- | --- |
| Enquiry modal | Hero + header CTA | `submitEnquiry` (`formType: modal`) | name, email, company, phone/WhatsApp, service, budget |
| Contact | `#contact` | `submitEnquiry` (`formType: full`) | the above plus a written brief |
| Application | `#careers` | `submitApplication` | name, email, phone, position, portfolio URL, short intro, résumé |

**Delivery is the one piece still open.** Each action has a `TODO` where the
provider call belongs — an email service (Resend, Postmark), a CRM webhook, and
for the careers form a storage bucket for the résumé file. Until those are
wired, submissions are validated, accepted and written to the server log.

Résumés are capped at 4MB and limited to PDF/Word. The server action body limit
is raised to 5MB in `next.config.mjs` to leave room for multipart overhead.

## Colours and type

Design tokens are defined once in `@theme` at the top of `src/app/globals.css`:

| Token | Value | Used for |
| --- | --- | --- |
| `--color-ink` | `#05070d` | page background |
| `--color-surface` / `-2` / `-3` | `#0a0e19` → `#131a2a` | cards, panels |
| `--color-brand` | `#2f7bff` | primary accent |
| `--color-accent` | `#22d3ee` | secondary accent, highlights |
| `--color-body` / `--color-muted` / `--color-faint` | text ramp | |

Change those values and every component, gradient and glow follows. The
typeface is Sora, loaded through `next/font/google`.

## Animation notes

- **Scroll reveals** — `Reveal` / `Stagger` in `components/ui/Reveal.jsx`.
- **Process deck** — the phase cards pin with `position: sticky` at staggered
  offsets and stack into a deck. Buried cards darken under a scrim rather than
  losing opacity, so the card underneath never shows through.
- **Sticky + overflow** — sections containing sticky children use
  `overflow-x-clip`, never `overflow-hidden`; the latter makes the section a
  scroll container and sticky silently stops working.
- **Smooth scrolling** — Lenis, set up in `Providers.jsx`, which also intercepts
  hash links so anchors ease instead of jumping.
- **Reduced motion** — `<MotionConfig reducedMotion="user">` strips transforms
  globally, Lenis is skipped entirely, and `globals.css` shortens CSS
  animations. Nothing needs to opt in individually.
