# ilaka.co.in — public marketing site

The live site at **https://www.ilaka.co.in**, deployed from this repo on Vercel.
Plain static HTML/CSS/JS: no build step, no framework, no dependencies.

Two layers live here:

- **`index.html`** — the pre-launch landing page. A single self-contained file
  (neo-brutalist warm-cream design, inline CSS/JS) with the waitlist capture.
  See [`DESIGN.md`](DESIGN.md) and [`PRODUCT.md`](PRODUCT.md) for brand and voice.
- **The legal pages** — required for Razorpay activation. Simpler layout sharing
  `css/style.css`, themed to the same palette and fonts.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Landing page + waitlist |
| `pricing.html` | Pricing / Products & Services |
| `terms.html` | Terms & Conditions (interim — not lawyer-reviewed) |
| `privacy.html` | Privacy Policy (DPDP Act framing) |
| `refunds.html` | Refund & Cancellation Policy |
| `contact.html` | Contact Us |
| `shipping.html` | Shipping Policy (digital goods only) |

## Waitlist

`index.html` POSTs `{ email, role }` as JSON to `WAITLIST_ENDPOINT` (declared at
the top of the inline `<script>`) and shows the success state **only on a 2xx**.
Every signup is also mirrored into `localStorage` under `ilaka_waitlist`.

### ⚠️ Action required: paste a form endpoint

`WAITLIST_ENDPOINT` in `index.html` is **empty**, so the form falls back to the
`support@ilaka.co.in` mailto — and that mailbox does not exist yet. Until one of
the two options below is done, **a signup reaches nobody.**

**Option A — now, no backend needed.** Create a form on any hosted form service
and paste its endpoint URL into `WAITLIST_ENDPOINT`. The service only has to
accept a cross-origin JSON POST from `https://www.ilaka.co.in` and return a 2xx
the browser can read; Formspree, Web3Forms and Tally all do. We send
`{ email, role }` and read only the status code, so switching services is a
one-line change. Check the service's free-tier submission cap before relying on it.

**Option B — when the backend is deployed.** Set it to
`https://api.ilaka.co.in/api/v1/waitlist`. That endpoint is already built in
`ilaka-backend` (`src/waitlist/`): idempotent per email, rate limited to 5/min per
IP, and CORS already allows both `ilaka.co.in` and `www.ilaka.co.in`. Read signups
back with `npm run waitlist:export`.

If you do A first and B later, **the addresses collected by the form service need
importing into the `waitlist_signups` table by hand** — otherwise you will mail one
cohort at launch and not the other.

The original value pointed at a deleted Railway host, at a path that also omitted
the `/api/v1` global prefix, so it could never have captured a signup either way.

## Open items

- **Registered office address** — pages show `Hyderabad, Telangana, India`.
  Replace with the full street address once the CA confirms it.
- **CIN** — incorporation pending; add to `terms.html` once issued.
- **`support@ilaka.co.in` mailbox** — the decided support address
  (`docs/10-plans/PRODUCTION_READINESS.md`), but the mailbox still needs creating.
- **Terms & Privacy** — interim wording, not lawyer-reviewed. See the comment at
  the top of `terms.html`.
- **Legal-page "Last updated" dates** — privacy/refunds are 9 July 2026 (when
  they were written); terms is 19 August 2026 (subscription-band clause added).
  Bump when the text actually changes.
- **CA confirmation on roster-indexed subscriptions is outstanding** (CR-003a,
  PRD Open Question Q7). The bands are published here, but per CR-003 *no
  subscription may be charged until that confirmation is in hand.*
- **ILK-BOD-01 has not been reissued to the CA** with the roster tiers.

## Pricing is derived, not authored

`pricing.html` mirrors `ILK-BOD-01` (Business Overview) §3.1–3.5 in the
`ilaka-docs` repo, as amended by **CR-003a — roster-indexed subscription tiers**
(approved 16 August 2026). Do not edit prices here directly: change the baseline
document, then mirror it. The `terms.html` subscription clause exists to satisfy
CR-003 §6.3 (tier changes must be transparent and pre-notified).

## Preview locally

```bash
python -m http.server 8899
```

Then open http://localhost:8899. Any static server works.

## Deploy

> **Deploying? Read [`DEPLOY.md`](DEPLOY.md)** — step-by-step, written for whoever
> holds the Vercel account.

**This repo is not currently wired to Vercel.** It has no GitHub webhook, no
recorded deployments, and no `.vercel` project link — pushing to `master` does
**not** update the live site. The version serving ilaka.co.in was deployed
manually and has been frozen since 14 August 2026.

To make pushes deploy (do this once):

1. Vercel dashboard → Add New → Project → import `ILAKA-app/ilaka-website`.
2. Framework preset **Other**, root directory `./`, no build command,
   output directory `./`.
3. Assign the existing `ilaka.co.in` + `www.ilaka.co.in` domains to the new
   project (they are currently attached to the old manual deployment).

After that, `master` redeploys on every push. Until then, deploy by hand:

```bash
npx vercel --prod
```
