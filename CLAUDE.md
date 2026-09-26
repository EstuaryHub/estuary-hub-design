# Estuary Hub — project context

Sanctioned, nonprofit-backed, open-source rebuild of estuaryhub.com.
Org: `EstuaryHub`. Design docs live in `docs/`.

## What the current site is

Wix. 15 routes, 7 in the sitemap. Three things stacked: a brochure, two
hand-maintained directory lists, and a thin membership layer.

Measured, not estimated (counted from rendered pages, 1 Sep 2026):
- 54 estuary group listings
- 106 unique leader email addresses (published as scrapeable plain text)
- 47 more emails on the group listing page
- **The whole public directory is ~26 KB of text, under 10 KB gzipped**

That 26 KB number drives the architecture. Do not re-derive it.

## Five gaps the rebuild exists to close

1. Directory is a flat alphabetical list — no search, no filter, no map
2. Listings have no owner; Add and Edit are two disconnected forms
3. Contact details published in the clear
4. ELSNet intake has no pipeline behind it (the site describes 4 stages, tracks none)
5. Nothing is measurable

## Decisions already made

- **Modular monolith, not a plugin system.** Build the *seam* (enforced module
  boundaries + internal event bus + a versioned public REST API), not the system.
  Extract a plugin SDK only after three in-repo modules prove what it needs.
- **Split the data by sensitivity.** Public directory ships as a static JSON
  artifact built at deploy time, geo search runs in the browser. Postgres stays
  the single source of truth behind it, off the hot path.
- **Static/dynamic split on Azure.** Public pages on Static Web Apps (always on,
  no cold start, free). App and API on Container Apps (scale-to-zero).
- **Contact relay only.** No email address or phone number is ever rendered.
- **Postgres + PostGIS**, not Azure SQL — portability for contributors, not capability.

## Verified platform facts (first-party docs, 26 Sep 2026)

- Azure nonprofit grant: $2,000/yr sponsorship credits. 90-day activation window,
  no rollover, first-party services only, **support plans excluded**.
- Container Apps free grant: 180,000 vCPU-s, 360,000 GiB-s, 2M requests/month.
  Minimum replica 0.25 vCPU / 0.5 GiB. One always-on replica = 648,000 vCPU-s
  = **3.6x over the grant**; the grant covers ~8.3 days, not a month.
- Entra External ID: first 50,000 MAU free.
- Azure Maps: 5,000 Search + 5,000 tile transactions/month free; 15 tiles per
  tile transaction, so 75,000 tiles.
- Static Web Apps Free: 100 GB bandwidth, 2 custom domains, **no SLA**, and
  custom identity providers require Standard.
- PostGIS 3.5.2 supported on Flexible Server (PG 13+).
- SQLite is unsafe on Container Apps: the only persistent mount is Azure Files
  (SMB), which is exactly what SQLite's docs warn against.

Not verified: how always-free allowances behave under a Sponsorship subscription;
whether idle Container Apps seconds draw down the grant; SKU prices by region.

## Blocking, and not an engineering call

From `docs/04-open-questions.md`, in order:
1. **B3** Who maintains this in three years? A "no" changes the project.
2. **B2** Nonprofit owns the GitHub org and Azure subscription, two owners each.
3. **B1** Licence (AGPL-3.0 server + Apache-2.0 SDK recommended; board decision).
4. **F2** Are the Wix Blog/Groups/Chat apps actually in use? Decides directory vs platform.

## Repo conventions

- **No production data in this repo, ever.** It is public and the app holds ~150
  real people's contact details. Synthetic seed only; that seed is the only
  dataset the test suite knows.
- Secret scanning + push protection on. OIDC federation to Azure, no long-lived
  cloud secrets.
- Trunk-based, short-lived branches, required review. DCO over CLA.
- Interface strings externalised from the first commit (one group operates in German).

## Not legal advice

Licence and data-protection notes in the docs describe common practice. The
international contact list (Canada, Europe, Australia) needs a qualified read
before import — that blocks launch, not building.
