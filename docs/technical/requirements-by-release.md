# Estuary Hub — Requirements by Release

Sep 26, 2026 · @joseph · Technical product design · For the Estuary Technology team

## Related Records

- [Roadmap](../product/roadmap.md), [Public Site](../product/static-site.md), [Application](../product/application.md): what each release does (owned by the product owners)
- [Application Architecture](application-architecture.md): the proposed end-state design (data model, modules, API)
- [Azure Platform and Costs](azure-platform-and-costs.md): the proposed hosting and cost model
- [Open Questions](../decisions/open-questions.md#for-the-development-team): decisions the team owns

## How to read this

The product documents say **what** each release does and **for whom**. This document says what the technology must **guarantee** for each release. How to meet each guarantee is the team's call, recorded as a decision (D-number) in [Open Questions](../decisions/open-questions.md#for-the-development-team) and then in the [Decision Register](../decisions/README.md).

[Application Architecture](application-architecture.md) and [Azure Platform and Costs](azure-platform-and-costs.md) are the current proposal for meeting these requirements. They describe the **App V1 end state**. Earlier releases use a subset of that design.

Requirement IDs are prefixed by release: **G** (every release), **SM** (Static MVP), **SV** (Static V1), **AM** (App MVP) and **AV** (App V1). Function IDs (S1–S17, A1–A17) refer to the product documents.

| Release | Ships | Runtime pieces |
| --- | --- | --- |
| Static MVP | First, alone | Prebuilt public site, directory data file, one small form-delivery function, email sending |
| Static V1 | After Static MVP, in parallel with App MVP | As Static MVP, plus a leaders data file and translations |
| App MVP | After Static MVP has been live one month and a maintainer is named | Adds the application, database and identity provider. The directory data file is now generated from the database |
| App V1 | After App MVP | Same pieces, more modules |

## Every release

| ID | Requirement | Why |
| --- | --- | --- |
| G1 | Public pages and directory data are served as prebuilt files. No request on a visitor's path wakes a server. | Nobody waits on a cold start ([platform](azure-platform-and-costs.md#the-staticdynamic-split)) |
| G2 | No email address or phone number appears in any page, script, data file, API response or public repository | Contact relay only |
| G3 | Public data files are built from an allow-list of public fields. Private fields are never written, rather than written and then filtered out | A file cannot leak what was never written into it |
| G4 | The public site keeps working with the application down or absent | Static releases must stand alone |
| G5 | Only synthetic seed data in the repository, fixtures, tests, snapshots and issues | The repository is public, and the real list is around 150 people ([D7](../decisions/open-questions.md#d7-what-does-the-synthetic-seed-dataset-look-like--blocking)) |
| G6 | Interface strings are kept out of code from the first commit | [D8](../decisions/open-questions.md#d8-which-language-ships-first-and-is-the-interface-translatable--pre-launch); German arrives in Static V1 |
| G7 | WCAG 2.1 AA, with automated contrast and heading checks in CI and a manual keyboard and screen-reader pass before each launch | [Interface brief](../product/interface-design-brief.md#accessibility) |
| G8 | OIDC federation to the cloud; no long-lived cloud secrets; secret scanning and push protection on | Repository conventions |
| G9 | Budget alerts and a log-ingestion cap are in place before the first deploy | [Budget guardrails](azure-platform-and-costs.md#budget-guardrails) |
| G10 | Every public address is permanent. A published group or leader address never changes or disappears; a paused or removed group shows a notice | Links are shared by email for years |
| G11 | Every public form is rate-limited and spam-checked, and tells the user what happens next | Forms are the only write path open to anonymous users |

## Static MVP

Functions S1–S12. **No database, no sign-in, no always-on compute.**

| ID | Requirement | Serves |
| --- | --- | --- |
| SM1 | The directory data file holds every published group with public fields only (see [the seam](#the-seam-between-the-two-products)), and search runs in the browser against it | S2, S3, S4 |
| SM2 | One prebuilt page per published group, with structured data (organisation or event) and a sitemap | S4 |
| SM3 | A form-delivery function accepts the contact (S5), request (S9) and ELSNet (S7) forms and delivers each by email to the right recipient, with the sender set as reply-to on contact messages | S5, S7, S9 |
| SM4 | Leader email addresses used by SM3 are held in a private store readable only by that function. They are never in the public repository, the data file or the build output ([D12](../decisions/open-questions.md#d12-how-does-the-contact-relay-work-before-the-application-exists--blocking-for-static-mvp)) | S5 |
| SM5 | An administrator can publish a directory change without developer help, and it is live within minutes ([D11](../decisions/open-questions.md#d11-where-does-the-directory-live-before-the-application-exists--blocking-for-static-mvp)) | S9 |
| SM6 | Every change to the directory is reviewable and has a history (who, when, what changed) | S9, stands in for the App MVP change history |
| SM7 | Redirects from every known Wix address, including each old group URL | S10 |
| SM8 | Counts of searches, zero-result searches, messages and requests, with no cookies, no personal data and no third-party trackers | S11 |
| SM9 | Map tiles load independently and never block the result list; the list is complete without the map | S2 |
| SM10 | Running cost close to zero; one volunteer can keep it running in a few hours a month | Tests the [B3](../decisions/open-questions.md#b3-who-maintains-this-after-launch--blocking) assumption cheaply |
| SM11 | The directory data can be exported in the seam format for a one-time import into App MVP | Transition to App MVP |

## Static V1

Functions S13–S17. Still no dependency on the application.

| ID | Requirement | Serves |
| --- | --- | --- |
| SV1 | A leaders data file holding only leaders who opted in, located at city or postcode-centre precision, never an address | S13 |
| SV2 | The interest form (S14) goes through the same delivery function to administrators; nothing is stored beyond the delivery log | S14 |
| SV3 | Localised routes with correct `lang` and alternate-language metadata; content language marked where a group listing differs from the page language | S15 |
| SV4 | The directory data carries each group's status (published or paused) and its last-confirmed date; paused groups are excluded from search but keep their page | S16 |
| SV5 | Search counts record region only (country and first-level region), never coordinates or postcode | S11 extension |
| SV6 | A print stylesheet or generated page per group, with a short link and QR code | S17 (Could) |

## App MVP

Functions A1–A10. **This is where the database, identity provider and long-term maintenance commitment arrive.**

| ID | Requirement | Serves |
| --- | --- | --- |
| AM1 | One store is the source of truth for every record ([D1](../decisions/open-questions.md#d1-what-stores-the-data--blocking)). Static-era directory data is imported once, then retired as a source | Transition |
| AM2 | The directory and leaders data files are regenerated from the store within minutes of a publish, with a scheduled rebuild as a safety net ([D10](../decisions/open-questions.md#d10-how-fresh-must-the-public-directory-be--blocking)). The output format is unchanged from the static releases | A3, the seam |
| AM3 | A leader's own view reads live from the store, so they see a saved change immediately, whatever the public data file shows | A3, A5 |
| AM4 | Identity is keyed on the identity provider's subject, never on email | A1, A2 |
| AM5 | Authorisation is role **and** ownership. A leader can edit only groups they lead | A3 |
| AM6 | Claiming a listing requires a token sent to the email already on the imported record | A2 |
| AM7 | Edit policy: a verified owner's routine edits publish immediately; name, location and new groups go to the queue ([D2](../decisions/open-questions.md#d2-do-edits-to-published-listings-go-live-immediately-or-into-the-queue--blocking)) | A3, A7 |
| AM8 | Every change to every record is written to an append-only audit log, with before and after values | A9 |
| AM9 | Every export is logged with who ran it and when | A9 |
| AM10 | A member can export their own data, and deletion tombstones the record and removes it from public files | A10 |
| AM11 | Contact messages are stored so abuse can be traced, with sender IP hashed and bodies deleted after the retention period ([D9](../decisions/open-questions.md#d9-how-long-are-contact-relay-messages-retained--pre-launch)) | S5 |
| AM12 | ELSNet answers are stored against a versioned question set, and reviewer notes are never returned to the applicant | A6, A8 |
| AM13 | Module boundaries (directory, membership, applications, notifications) are enforced mechanically, not by convention | [Module architecture](application-architecture.md#module-architecture) |
| AM14 | Automated daily backups, with a restore rehearsed before launch | [Delivery checklist](../decisions/delivery-checklist.md) |
| AM15 | Non-production environments stop when idle ([D5](../decisions/open-questions.md#d5-how-are-three-environments-funded-and-kept-cheap--blocking)) | Budget |
| AM16 | Running cost fits inside the nonprofit grant, with alerts at 50% and 80% | [Budget](azure-platform-and-costs.md#the-budget) |
| AM17 | The S7 and S9 forms hand over to the application (sign in and edit, or apply) without changing their public addresses | Transition |

## App V1

Functions A11–A17.

| ID | Requirement | Serves |
| --- | --- | --- |
| AV1 | Each profile field has its own visibility setting, all private by default. Visibility is enforced on the server, never only in the interface | A11 |
| AV2 | Member locations are stored at city or postcode-centre precision only | A11, A12 |
| AV3 | The member finder returns only members who opted in to being findable, and only the fields each has made visible | A12 |
| AV4 | Consent is recorded as events (what was agreed, when and from where), and withdrawing consent takes effect in public files at the next rebuild | A15, [consent_event](application-architecture.md#data-model) |
| AV5 | Registered interest is stored with consent and can notify people when a group is published nearby | A15 |
| AV6 | Stale-listing detection is driven by the last-confirmed date and a configurable threshold | A13 |
| AV7 | Reports are aggregates only; no report exposes an individual's details to anyone other than an administrator | A14 |
| AV8 | If built, the partner feed is read-only, versioned, rate-limited, and serves only what the public data files already contain | A17, [Public API](application-architecture.md#public-api) |
| AV9 | Redirects from every Wix member-area address before the Wix site is switched off | Wix retirement |

## The seam between the two products

The public site and the application communicate only through the interfaces below. As long as the contract holds, either side can change its internals without the other noticing. Whoever produces the data files owns the contract: administrator tooling in the static releases, and the application from App MVP onward.

| Interface | Direction | Contract | From |
| --- | --- | --- | --- |
| Directory data file | Producer → public site | Published groups with public fields only: `slug`, `name`, `meets_when`, `meets_where`, `special_directions`, `meetup_url`, location at published precision, `timezone`, `language`, `format`. From Static V1 it also carries `status` (published or paused) and `last_confirmed_at`. The file carries a `schema_version`; the site ignores fields it doesn't know | Static MVP |
| Leaders data file | Producer → public site | Opted-in leaders only: `slug`, display name, city, region, country, centroid location, and the slug of any group they lead | Static V1 |
| Form delivery | Public site → producer | One endpoint per form (contact, listing request, ELSNet, interest). The body includes a group or leader slug; the response says whether the message was accepted, never who it went to. Recipient lookup happens on the server | Static MVP |
| Public addresses | Shared | `/groups/{slug}` and `/leaders/{slug}` are permanent; slugs survive a rename | Static MVP |
| Account entry | Public site → application | A sign-in link in the account menu, plus deep links: "update your group" goes to sign-in and then the edit form for that slug | App MVP |

Rules:

- A change to any contract is a versioned change, recorded as a decision, and the public site must accept both versions until it has been updated.
- Neither side ever reads the other's internal storage.

## Decisions the team owns, by release

Each is in [Open Questions](../decisions/open-questions.md#for-the-development-team) with a recommended default.

| Decision | Blocks |
| --- | --- |
| [D11](../decisions/open-questions.md#d11-where-does-the-directory-live-before-the-application-exists--blocking-for-static-mvp) Where the directory lives before the application exists | Static MVP |
| [D12](../decisions/open-questions.md#d12-how-does-the-contact-relay-work-before-the-application-exists--blocking-for-static-mvp) How the contact relay works before the application exists | Static MVP |
| [D3](../decisions/open-questions.md#d3-which-framework-and-does-it-matter--blocking) Framework | Static MVP (static output); App MVP (container) |
| [D4](../decisions/open-questions.md#d4-dco-or-cla--blocking) DCO or CLA | Static MVP (first contribution) |
| [D7](../decisions/open-questions.md#d7-what-does-the-synthetic-seed-dataset-look-like--blocking) Synthetic seed | Static MVP |
| [D8](../decisions/open-questions.md#d8-which-language-ships-first-and-is-the-interface-translatable--pre-launch) Language and translation | Static MVP (externalised strings); Static V1 (German) |
| [D1](../decisions/open-questions.md#d1-what-stores-the-data--blocking) Data store | App MVP |
| [D2](../decisions/open-questions.md#d2-do-edits-to-published-listings-go-live-immediately-or-into-the-queue--blocking) Edit policy | App MVP |
| [D5](../decisions/open-questions.md#d5-how-are-three-environments-funded-and-kept-cheap--blocking) Environments | App MVP |
| [D6](../decisions/open-questions.md#d6-private-endpoint-for-the-database-or-firewall-rules--pre-launch) Database network | App MVP launch |
| [D9](../decisions/open-questions.md#d9-how-long-are-contact-relay-messages-retained--pre-launch) Message retention | App MVP launch |
| [D10](../decisions/open-questions.md#d10-how-fresh-must-the-public-directory-be--blocking) Directory freshness | App MVP |
