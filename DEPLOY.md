# Deploying ilaka.co.in

**Audience:** Founder B (or whoever holds the Vercel account).
**Time:** ~10 minutes, once. After that every push to `master` deploys itself.

---

## The situation

`www.ilaka.co.in` is hosted on **Vercel**. The version currently serving is a
**manual deployment made on 14 August 2026** — it was never connected to this
GitHub repo. You can confirm this yourself:

```bash
gh api repos/ILAKA-app/ilaka-website/hooks --jq 'length'
```

That returns `0`. There is no webhook, so **pushing to `master` does nothing to
the live site.** The new landing page is already committed and pushed here; it
is simply not being served.

The job below is to connect this repo to Vercel and move the domains onto it.

---

## Step 1 — Import the repo into Vercel

1. Go to <https://vercel.com/new>.
2. Under **Import Git Repository**, pick `ILAKA-app/ilaka-website`.
   - If the repo is not listed, click **Adjust GitHub App Permissions** and
     grant Vercel access to the `ILAKA-app` org.
3. Configure it as a plain static site — there is no build step:

   | Setting | Value |
   |---|---|
   | Framework Preset | **Other** |
   | Root Directory | `./` |
   | Build Command | *leave empty* (toggle Override off) |
   | Output Directory | `./` |
   | Install Command | *leave empty* |

4. Click **Deploy**.

You will get a URL like `ilaka-website-xxxx.vercel.app`. **Open it and check the
site looks right before touching the domain.** You should see the orange-and-cream
landing page with "Your class deserves a full room." — not the plain white page.

---

## Step 2 — Move the domains

The domains are attached to the *old* project, so this is the step that actually
swaps what the public sees.

1. In the **new** project → **Settings → Domains**.
2. Add `www.ilaka.co.in`. Vercel will say it is already in use by another
   project and offer to move it — accept.
3. Add `ilaka.co.in` and set it to **redirect to `www.ilaka.co.in`** (that is the
   existing behaviour; keep it).
4. If Vercel asks for DNS changes, the records are at your domain registrar.
   Nothing should need changing if the domain is already pointed at Vercel.

Verify:

```bash
curl -sI https://www.ilaka.co.in/ | grep -i last-modified
curl -so /dev/null -w '%{http_code}\n' https://www.ilaka.co.in/assets/photos/hero.jpg
```

`last-modified` should be today, and the image should return **200** (it is
currently 404 — that file only exists in the new version).

---

## Step 3 — Delete or rename the old project

Once the domains have moved and the site is confirmed good, find the old Vercel
project and rename it to something like `ilaka-website-legacy-2026-08`, or delete
it. Leaving two projects around invites someone redeploying the wrong one later.

---

## After this

Every push to `master` redeploys production. Pushes to any other branch get their
own preview URL, which is the safer way to review changes:

```bash
git checkout -b my-change
# ...edit...
git commit -am "..."
git push -u origin my-change
```

Vercel comments the preview URL on the branch.

### Rolling back

Vercel dashboard → the project → **Deployments** → find the last good one →
**⋯ → Promote to Production**. This is instant and does not involve git.

---

## Two things that are NOT done yet

**1. The waitlist form does not capture anything.**
`index.html` POSTs `{ email, role }` as JSON to:

```
https://backend-production-dfd0.up.railway.app/waitlist
```

That endpoint **does not exist**, and the backend sends **no CORS headers**, so
the browser call fails twice over. The page handles this honestly — it shows a
"couldn't reach our server, email us" fallback rather than a fake confirmation —
but nobody is joining a list.

To fix, on the backend:

- Add `POST /waitlist` accepting `{ email: string, role: "business" | "participant" }`,
  returning 2xx on success. The page treats any non-2xx as failure.
- Enable CORS for origin `https://www.ilaka.co.in`.

If the endpoint path or shape differs, update `WAITLIST_ENDPOINT` at the top of
the inline `<script>` in `index.html`.

**2. Pricing is published but not chargeable.**
`pricing.html` shows the CR-003a roster-indexed bands (₹0 / ₹199 / ₹499 / ₹999 /
₹1,999). **CR-003 requires CA confirmation before any subscription is charged**,
and that is still outstanding (PRD Open Question Q7). Publishing the bands is
fine; billing against them is not, until the CA signs off and ILK-BOD-01 has been
reissued to them.

---

## Where the content comes from

- Prices mirror **ILK-BOD-01 §3.1–3.5** in the `ilaka-docs` repo, as amended by
  **CR-003a**. Change the baseline document first, then mirror it here — do not
  edit prices directly in `pricing.html`.
- The landing page was authored at `ilaka-docs/website/` and copied here. Those
  two copies will drift; pick one as canonical when you get a chance.
