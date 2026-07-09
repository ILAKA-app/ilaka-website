# Ilaka marketing site (Razorpay activation)

Throwaway static site whose only job is to pass Razorpay business-website
review so we can get API keys. **Not the product.** Plain HTML/CSS, no build
step, no framework, no backend. Content sourced from
`docs/md/11_business_overview.md` in the main `ilaka-backend` repo — do not
add claims that aren't backed by that doc without checking with Founder A.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home / landing |
| `pricing.html` | Pricing / Products & Services |
| `terms.html` | Terms & Conditions (dummy/interim — see note below) |
| `privacy.html` | Privacy Policy (DPDP Act framing) |
| `refunds.html` | Refund & Cancellation Policy |
| `contact.html` | Contact Us |
| `shipping.html` | Shipping Policy note (digital goods only) |

## TODOs before submitting to Razorpay

Search the repo for `TODO` / the `.todo` highlighted spans (they render with
an orange dashed box) — everything below must be filled in first:

1. **Domain** — not yet decided. All internal links are relative (`pricing.html`
   etc.) so the site works on any domain once deployed; only the support
   email (`support@ilaka.app`, in `contact.html` and the `<meta>`/mailto)
   needs updating once the real domain is picked.
2. **Support email inbox** — `support@ilaka.app` is a placeholder pattern.
   Set up a real inbox at whatever domain you land on before submission.
3. **Phone number** — placeholder in `contact.html`.
4. **Registered/correspondence address** — placeholder in `contact.html` and
   in every page footer. Confirm with the CA (this is also needed for the
   Razorpay KYC entity address, so get it once and reuse it here).
5. **Business name matching** — every page uses **"Ilaka"**. This must match
   the name on the Razorpay KYC / bank account exactly, or activation review
   bounces.
6. **`terms.html`** has an HTML comment at the very top marking it dummy/
   interim, per the business doc's note that a lawyer-reviewed T&C is
   required before public launch. Not visible on the rendered page — leave
   it in place as a reminder, and replace the whole page before real launch.
7. Both `terms.html` and `privacy.html` show `[DATE — TODO]` as "last
   updated" — set a real date at deploy time.

## Deploying (do this yourself — no hosting credentials were touched here)

Zero build step, so any static host works. Cheapest/fastest for a one-page
marketing site:

**Netlify (drag and drop)**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag this whole folder in. You get a live HTTPS URL immediately.
3. Site settings → Domain management → add your custom domain, follow the
   DNS instructions (usually a CNAME or Netlify's nameservers).

**Vercel**
1. `npm i -g vercel` (one-time), then `vercel` in this folder, follow prompts.
2. Or connect the GitHub repo (see below) in the Vercel dashboard for
   auto-deploys on push.

**GitHub Pages**
1. Push this folder to a GitHub repo.
2. Repo Settings → Pages → deploy from `main` branch, root folder.
3. Add custom domain in the same settings page; GitHub gives you the DNS
   record to add (A records or CNAME depending on setup).

Whichever you pick: confirm HTTPS is active and there's no "under
construction" placeholder before submitting the URL to Razorpay.

## After the site is live — get the keys

1. Sign up / log in at **dashboard.razorpay.com** with the Ilaka business
   account (use the founder email that will own payments).
2. Submit the live website URL wherever the activation form asks for
   "Business website / app link." If it insists on app-store links too,
   submit the site and email Razorpay support that the apps are pre-launch —
   store links will follow post-launch.
3. Complete KYC (PAN, bank, business details) to move from Test Mode to Live.
4. **Test keys are available immediately**, before full activation — grab
   `rzp_test_...` Key ID + Key Secret from *Settings → API Keys* and hand
   them to Founder A so mobile can integrate checkout now, in parallel with
   KYC review.
5. Live keys (`rzp_live_...`) unlock after activation — deliver those once
   approved.

**Never commit the Razorpay Key Secret or live keys anywhere — env vars /
secrets manager only, hand off via a secure channel.**
