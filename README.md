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

Two things must exist on the backend before signups are actually captured:

1. `POST /waitlist` accepting `{ email, role }`.
2. CORS allowing origin `https://www.ilaka.co.in`.

Until then submitters get the `support@ilaka.co.in` mailto fallback rather than a
false confirmation.

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

Vercel is connected to this repo's `master` branch and redeploys on push.
