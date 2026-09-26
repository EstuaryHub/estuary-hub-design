# Estuary Hub — project context

Sanctioned, nonprofit-backed, open-source rebuild of estuaryhub.com.
Org: `EstuaryHub`. This repo is design docs only — no application code yet.

## Releases (the frame for everything)

Two products, each with an MVP and a V1:

| | MVP | V1 |
| --- | --- | --- |
| Public site (static, no sign-in) | **Static MVP**: find + private contact | **Static V1**: leaders nearby, interest, German, freshness |
| Application (signed in) | **App MVP**: claim/edit, ELSNet tracked, review queue | **App V1**: profiles, member finder, reports, Wix retired |

Order: Static MVP ships first and alone (no DB, no sign-in) → Static V1 and
App MVP in parallel → App V1. Every public-site release must keep working with
the application absent. Proposed to product owners as P1; not yet recorded as decided.

Use these four names exactly. "Phase 1" and "core release" are retired terms.

## Who owns what

| Owner | Decides | Docs |
| --- | --- | --- |
| Product owners: Estuary leadership and community members | What each release does (P-questions) | `docs/product/` |
| Board | Licence, accounts, maintainer, data stewardship (B-questions) | `docs/decisions/` |
| Estuary Technology team (technical product owners) | How it is built (D-questions) | `docs/technical/` |

## Doc map

- `docs/product/roadmap.md` — releases, order, gaps closed, Wix transition, success targets, launch comms, support model
- `docs/product/static-site.md` — functions S1–S18 with release + priority
- `docs/product/application.md` — functions A1–A18 with release + priority
- `docs/product/discovery-interview-guide.md` — five pre-build conversations; interview notes never enter the repo
- `docs/product/interface-design-brief.md` — experience, brand, a11y, design phases per release
- `docs/technical/requirements-by-release.md` — guarantees G/SM/SV/AM/AV + the seam contract
- `docs/technical/application-architecture.md` — App V1 end state: data model, modules, API
- `docs/technical/azure-platform-and-costs.md` — hosting, costs, guardrails
- `docs/decisions/open-questions.md` — live backlog (P, B, D, X, F) + question index by release
- `docs/decisions/README.md` — decision register; `delivery-checklist.md` — prerequisites per release
- `docs/superpowers/` — session working records; not authoritative, links may be stale

## Writing conventions for these docs

- Product docs are for community members: plain language, no product/tool names
  (no "Postgres", "Static Web Apps", "JSON"). State needs and promises.
- Technical docs state requirements; tool choices are proposals until a D-question
  is decided. The roadmap owns *what ships when*; architecture owns *how*.
- IDs (S*, A*, P*, B*, D*, G/SM/SV/AM/AV*) are stable references once reviewed —
  add new ones at the end rather than renumbering.
- Each fact has one owning doc; others link to it. Headings are link anchors —
  renaming one means fixing inbound links.
- Every question gets a recommended default. A resolved question goes into the
  register and the owning docs are updated (see README "How a decision moves").
- Before finishing a docs change, check that every relative link and `#anchor` resolves.

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

## Technical direction (proposals; the Technology team decides via D-questions)

- **Modular monolith, not a plugin system.** Build the *seam* (enforced module
  boundaries + internal event bus + a versioned public REST API), not the system.
  Extract a plugin SDK only after three in-repo modules prove what it needs.
- **Split the data by sensitivity.** Public directory ships as a static JSON
  artifact built at deploy time, geo search runs in the browser. Postgres stays
  the single source of truth behind it, off the hot path.
- **Static/dynamic split on Azure.** Public pages on Static Web Apps (always on,
  no cold start, free). App and API on Container Apps (scale-to-zero).
- **Contact relay only.** No email address or phone number is ever rendered.
  This one is a product promise, not a proposal.
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

From `docs/decisions/open-questions.md` (critical path), in order:
1. **P1** Static MVP ships first and alone.
2. **B3** Who maintains this? Light-duty for Static MVP; long-term before App MVP.
3. **B2** Nonprofit owns the GitHub org and Azure subscription, two owners each.
4. **B1** Licence (AGPL-3.0 server + Apache-2.0 SDK recommended; board decision).
5. **F2** Are the Wix Blog/Groups/Chat apps actually in use? Blocks App MVP, not Static MVP.

## Repo conventions

- **No production data or interview notes in this repo, ever.** It is public and the app holds ~150
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
