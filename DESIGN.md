# DESIGN.md — Ilaka marketing site

Neo-brutalist warm-cream system, implemented from the Claude Design component
**"Ilaka Landing.dc.html"** (design project `840a6ff1-bd3b-4350-843d-8332b6cde45d`) and rebuilt
as a standalone, dependency-free page in `index.html`.

## Color strategy: committed accent on warm paper

Brand hexes are the source of truth. Neutrals are tinted warm, not grey.

| Role | Hex | Use |
|------|-----|-----|
| Paper (cream) | `#FBF2E4` | dominant page surface |
| Card | `#FFFBF3` | inputs, light cards, insets |
| Ink | `#1C1710` | text, borders, dark bands (organisers, FAQ, footer) |
| Accent | `#FF7A1F` | primary action, highlights, the final CTA band |
| Error | `#E63B60` | form validation only |

The accent is a **committed** role, not a timid ≤10% dab: it carries buttons, the final CTA
background, kicker labels, marquee dots, and the numbered organiser cards. The design ships
alternate accents (`#FF7A1F` orange, `#E63B60` pink-red, `#0F8F82` teal, `#6B4EFF` violet); the
live default is orange. Accent is exposed as the `--accent` CSS variable, so a re-skin is a
one-line change.

Texture: a faint ink radial-dot grid (`rgba(28,23,16,0.09)` on a 24px grid) on the hero, and a
denser grid on the accent final CTA. Dark bands (ink `#1C1710`) alternate with cream to pace
the long scroll.

## Typography

- **Display / headings / wordmark:** Bricolage Grotesque (400/600/700/800). Chunky, warm,
  slightly irregular grotesque; carries every heading and the `ilaka.` wordmark. Not on the
  reflex-reject list.
- **Body / UI:** Plus Jakarta Sans (400/500/600/700, plus italic for the founder pull-quote).
  Clean humanist sans, legible at small sizes.

Fluid `clamp()` scale on headings (hero `clamp(38px,5.4vw,70px)`), tight `-0.02em` display
tracking, strong weight contrast (800 display over 400–600 body).

## Form language

The signature look is **neo-brutalist**:

- **Borders:** solid ink, 2–3px (`2.5px` on most interactive elements, `3px` on hero image and
  the final CTA card).
- **Hard offset shadows:** `Npx Npx 0` with no blur (buttons `3–4px`, cards `6–10px`), in ink
  on light surfaces and paper on dark ones. Hover "pops" the element: `translate(-2px,-2px)`
  and the shadow grows by ~2px.
- **Shapes:** pill buttons and toggles (`border-radius:100px`); rounded cards (12–24px).
- **Wordmark:** `ilaka` in Bricolage 800 with a single accent-coloured period.

## Motion

- **Marquee:** an ink bar of scrolling category words (Yoga, Run Clubs, Pottery…), two
  identical sets translated `-50%` for a seamless loop (`marquee` 32s linear).
- **Floaty tag:** the "12+ categories" chip on the hero image bobs gently (`floaty` 4s).
- **Hover pop:** the translate + shadow-grow on buttons and CTAs.
- Everything is gated behind `prefers-reduced-motion: reduce` (marquee and floaty stop, smooth
  scroll off). Only `transform` / `box-shadow` animate, never layout properties.

## Imagery

The source uses `<image-slot>` placeholders (a design-tool web component). In the standalone
build these are on-brand **placeholder frames**: warm dot-grid tiles with a category emoji and
a small uppercase label, inside the same ink border + hard shadow as everything else, so an
empty slot looks intentional rather than broken. **Real photos** should replace them at the
hero (one), the six use-case cards, and the founder portrait when available.

## Layout

`max-width:1240px` centred content, generous `clamp()` section padding. Two-column hero (copy +
framed image with a rotated accent card behind it). Card grids use
`repeat(auto-fit,minmax(...,1fr))` for breakpoint-free responsiveness. The page alternates cream
and ink bands and closes on a full-bleed accent CTA, then an ink footer. No horizontal overflow
from 375px to 1240px.
