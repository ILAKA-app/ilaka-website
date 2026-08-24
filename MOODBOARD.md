# MOODBOARD.md — direction to explore

**Status: exploratory. Nothing here is decided, and nothing here has been built.**
This is a read of the ILAKA Pinterest board, written down so the next design pass
has a starting point. It deliberately does not change [DESIGN.md](DESIGN.md),
which documents what the site actually is today.

## Source and how much of it I actually saw

- Board: `ILAKA`, 66 pins, by Ambarish Iyengar — https://pin.it/1Ngkd7HTn
- Pinterest's own auto-tags for the board: *house party aesthetic, college vision
  board, urban people*

**Caveat, important:** I got through roughly the first 12 pins before the browser
pane stopped rendering. So this is a read of ~18% of the board, plus the tags.
Treat every claim below as a hypothesis to confirm against the full board, not a
brief. If the tail of the board pulls somewhere else, this document is wrong.

## What the visible pins are saying

Four threads, in rough order of how strongly they came through:

### 1. Candid over composed
Friends on the floor mid-game of Twister. Students sprawled across a campus lawn
with laptops. A big group sitting in a circle on grass. Nobody is posing for a
brand. These are photos taken *by* someone in the group, not *of* the group.

### 2. Motion and mess
A long-exposure shot of a party/DJ set — smeared light, unreadable faces. A
mountain biker face-down in a muddy stream. Blur and dirt are the point, not a
defect to be corrected.

### 3. Bold graphic work
A hot-pink-and-yellow halftone cityscape. A "why can't I CTRL+Z my mistakes"
sticker graphic. High-saturation, high-contrast, poster/zine energy — closer to
screen-print and sticker packs than to editorial layout.

### 4. Handmade texture
A Bob Marley quote handwritten on a ball. A graffiti-covered room. Stained-glass
panels throwing colour across a courtyard. Human marks, physical surfaces.

## The tension with what we've built

This matters more than the individual pins. The board and the live site are
pulling in different directions, and that gap is the actual thing to resolve.

| | Site today (DESIGN.md) | Board |
|---|---|---|
| Energy | Calm, editorial, composed | Loud, kinetic, unposed |
| Palette | Warm cream + one committed orange | Hot pink, acid yellow, high saturation |
| Texture | Faint ink dot-grid | Graffiti, halftone, print artefacts |
| Photography | Clean, well-lit, considered crops | Blur, mud, flash, mid-motion |
| Type | Bricolage + Plus Jakarta, tidy scale | Sticker/marker/hand-drawn |

The site is **not** wrong — the neo-brutalist cream system is coherent and it
works. But it reads about five years older than the board does. The board is a
19-year-old's camera roll; the site is a well-made startup landing page.

## Things worth exploring

Roughly cheapest-to-riskiest. These are options, not a plan.

1. **Photo selection, not photo treatment.** The cheapest move by far. The
   listings grid currently mixes our own candids (Holi, Diwali, football, run
   club, hangout) with quieter sourced shots (yoga, pottery, dance). The candids
   are already on-board; the sourced ones are what drags it editorial. Swapping
   those three for real Sainikpuri photos moves the whole page without touching a
   line of CSS. **This one is worth doing regardless of what else we decide.**

2. **Let the accent get louder.** `--accent` is already a one-line change
   (DESIGN.md notes `#E63B60` pink-red ships as an alternate). Trying the site on
   pink-red costs nothing and tests the board's palette directly.

3. **A second accent.** The board consistently pairs two hot colours, not one.
   Pink + acid yellow, say. This is a real change to the colour system — the
   current design deliberately commits to a *single* accent role, so adding a
   second means revisiting that decision, not just adding a variable.

4. **Texture pass.** Swap or supplement the ink dot-grid with halftone or
   print-grain on one or two bands. Contained, reversible, tests the zine feel
   without touching layout.

5. **Motion.** Nothing on the site moves except the category ticker. The board is
   full of movement. Worth a look — but this is where scope grows fastest.

6. **Type.** A display face with more hand in it. Highest-risk item on the list:
   Bricolage Grotesque is doing a lot of work and is genuinely good. Don't touch
   this until 1–4 have been tried.

## Open questions

- Does the rest of the board (the ~54 pins not seen) confirm or contradict this?
- Is this a **photography** direction or a **whole visual identity** direction?
  Answering this decides whether the work is item 1 or items 1–6.
- Does the app need to follow, or is this marketing-site only? A landing page that
  reads loud and an app that reads calm is a real seam users will feel.
- Who is this pitched at — the 19-year-old in the board photos, or the 40-year-old
  yoga instructor who has to list a class and get paid? The board only answers for
  one of them, and the organiser side pays the bills.

## What not to break

- The organiser-facing pitch has to stay legible and trustworthy. Whatever the
  neighbour-facing side becomes, someone deciding whether to run their tuition
  business on Ilaka needs to take it seriously.
- Contrast and readability. High-saturation pairings (pink on yellow especially)
  fail WCAG fast. Any second accent gets checked before it ships.
- Page weight. The board's aesthetic invites big full-bleed photography; the
  photo set is currently ~1.9 MB across 15 images after a resize pass. Don't
  give that back.
