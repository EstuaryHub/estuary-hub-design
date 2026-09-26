# Estuary Hub — Application Architecture

Sep 26, 2026 · @joseph · Sanctioned rebuild of estuaryhub.com · For the Estuary Technology team

## Related Records

- [Open Questions](../decisions/open-questions.md)
- [Decision Register](../decisions/README.md)
- [Requirements by Release](requirements-by-release.md) — what each release must guarantee
- [Roadmap](../product/roadmap.md) — how the product is split into Static MVP, Static V1, App MVP and App V1

## Purpose and scope

Estuary Hub exists to answer one question a stranger asks: is there an estuary conversation near me, and who do I talk to? The current Wix site cannot answer it. Fifty-four groups sit in a flat alphabetical list with no search, no filter and no map, so a visitor in Grand Rapids reads all fifty-four.

The site does have a working radius search — but only behind the member wall, and it points at people rather than groups. This rebuild moves that capability to the front door and builds the rest of the application around it.

Five structural gaps define the scope. Each maps to a feature area below.

| # | Gap in the current site | What the rebuild does |
| --- | --- | --- |
| 1 | Directory is an unsearchable flat list | Geo search over groups, distance-sorted, with a map |
| 2 | Listings have no owner; Add and Edit are disconnected forms | Records owned by leaders, with a claim flow and real editing |
| 3 | 106 leader emails published as scrapeable plain text | Contact relay forms; no address ever rendered |
| 4 | ELSNet intake is a form submission with no pipeline | Four-stage application pipeline with status visible to applicant and reviewer |
| 5 | Nothing is measurable | Admin counts: active groups, growth by region, stale applications |

This document describes the **end state after App V1**: the full application behind the public site. The [Roadmap](../product/roadmap.md) splits it into four releases (Static MVP, Static V1, App MVP, App V1), and [Requirements by Release](requirements-by-release.md) says which parts of this design each release needs. Where the two disagree on what ships when, the roadmap wins; this document owns how it works. Community features — forum, groups, chat, blog — are deliberately excluded and covered in the final section.

## Roles and personas

Four roles, and authorisation is role plus record ownership rather than role alone. A leader can edit the group they own and no other.

| Role | Who they are | Can see | Can do |
| --- | --- | --- | --- |
| Visitor | Anonymous; found the site by search or word of mouth | Public site, directory, published group detail pages | Search by location, contact a group via relay form, sign up for updates |
| Member | Signed in; an "interested person" waiting for a group to form nearby | All of the above, plus the member finder | Manage own profile and per-field visibility, apply to ELSNet |
| Leader | Trained, runs one or more groups | All of the above | Create and edit groups they own, confirm a listing is current, add a co-leader |
| Administrator | ELC or delegated volunteer | Everything, including unpublished records and the audit log | Moderate submissions, advance applications through the pipeline, export, mark groups dormant |

Two notes that shape the model. **Leader is earned, not self-declared** — a member becomes a leader when an administrator advances their ELSNet application to `listed`, not by ticking a box. And **ownership is a join, not a column**: a group can have several leaders, so `estuary_leader` carries the relationship and its own `role` of owner or co-leader.

## Public site

Static content, no sign-in, served separately from the application so it never cold-starts. Content is inherited from the existing site and rewritten, not copied wholesale.

| Page | Contains | Notes |
| --- | --- | --- |
| Home | What an estuary conversation is, one strong call to action, secondary path to start a group | Replaces a home page offering eleven competing links |
| What happens at an estuary | The protocol, meeting shape, what a first visit is like | Answers the anxiety a newcomer actually has |
| Sample topics | Representative topics, framed as emergent rather than an agenda | Carried over from the current topics page |
| FAQ | Origin, roles, how groups relate to each other | Carried over and restructured |
| Start a group | Path into ELSNet, the commitment, link to training | Currently split across two separate signup pages |
| Resources | Training manual downloads, gated per the access rule chosen | Files served from blob storage, not bundled with the site |

One deliberate change: the current home page has eight entry points competing for attention. This design has **one primary action** — find a group near you — and subordinates everything else to it.

## Directory

The core of the release, and public — no sign-in to search.

**How it is served.** The published directory is built into a static JSON artifact at deploy time and served from the CDN beside the public pages. The whole dataset is roughly 26 KB — under 10 KB compressed — so the browser holds all of it and the search runs locally. That means results are instant with no loading state, filters apply without a round trip, and the directory keeps working even if the application backend is down. The database remains the source of truth; it is simply not on this path.

**Search.** One location input accepting a postal code, a city, or browser geolocation, plus a radius selector. Distance is computed in the browser over the loaded dataset. Results are distance-sorted and shown as a list beside a map, each highlighting the other on hover. Filters for format (in person, online, hybrid) and language. Online-only groups have no meaningful distance, so they appear in a separate band below the distance-sorted results rather than being forced onto the map.

The artifact contains only published, public fields — no contact details, no unpublished records, no member data. That is a structural guarantee rather than a query filter: the file physically cannot leak what was never written into it.

**Empty results are a feature, not an error.** When nothing is within the radius, the page offers the nearest group beyond it, the nearest trained leader with no group yet, and the option to register interest for that area. The current site has no answer here at all.

**Group detail page.** Name, when it meets, where (at the precision the leader chose), format, language, special directions, a map, and a contact button. Indexable by search engines, since that is how most people will arrive.

**Contact relay.** No email address or phone number is ever rendered. A visitor writes a message in a form; the platform delivers it to the leader with a reply-to that reaches the sender. This closes gap 3 on its own and is the single highest-value privacy decision in the design.

**Leader directory.** The same pattern over trained leaders who have no group yet — the "there is nobody here, but someone nearby could start one" path. Visible only where the leader opted in.

| Behaviour | Rule |
| --- | --- |
| Default radius | 25 miles, with 50 and 100 offered |
| Units | Miles, with kilometres for non-US locales |
| Location precision shown publicly | Venue name and city; never a street address unless the leader explicitly publishes one |
| Unpublished groups | Excluded from all public queries and from the API |
| Dormant groups | Excluded from default results, reachable by direct link with a clear notice |

## Member area

Sign-in, and the place where gap 2 closes.

**Profile with per-field visibility.** The current site offers one checkbox governing everything. This design puts a visibility setting on each field independently: name, city, region, country, meeting-place note, contact preference. The default for every field is private; a member opts in, field by field. Coordinates are stored at city or postal-centroid precision, never at an exact address, so even a fully public profile does not disclose where someone lives.

**Claim your listing.** The hinge of the whole migration. Every imported group already names its leader, but no account owns it. A leader signs in, finds the record describing their group, and claims it — verified by sending a token to the email already on the imported record. Once claimed, they edit it directly. Until claimed, it stays published with an administrator as fallback owner.

**Group management.** Create, edit, and mark dormant — one form, on a record you own, replacing the current Add and Edit pair that share no state. A leader can invite a co-leader by email. Edits to an already-published group either publish immediately or enter the moderation queue, depending on the policy chosen in the open questions document.

**Confirm this listing is current.** A dated prompt, twice a year, writing to `last_confirmed_at`. One click. This single field is what separates a directory that decays from one that does not.

**Member finder.** The existing radius search over members, rebuilt against the new model and respecting per-field visibility. A member who has not opted into being findable does not appear, whatever their distance.

**ELSNet application and its status.** The applicant fills the intake once and can afterwards see which of the four stages they are at, rather than wondering whether the form arrived.

## Admin

The surface the current site lacks entirely, and the one most likely to be cut for time. It should not be cut — every hour it saves a volunteer administrator is repaid weekly for as long as the site runs.

**Moderation queue.** New group submissions and, depending on policy, edits to published ones. Each item shows the submitted values, a diff against the current record where one exists, and the submitter. Approve, request changes with a note, or reject.

**ELSNet pipeline.** The four stages the current site already describes in prose but does not track: applied, invited, training, listed. An administrator moves an application between stages; each transition can send an email. Advancing to `listed` is what promotes the member to leader.

**Stale listing review.** Groups whose `last_confirmed_at` has passed the threshold, oldest first, with a one-click nudge to the leader and a one-click mark-dormant.

**Counts.** Published groups, groups by country and region, new listings over time, applications by stage, applications with no movement in 30 days. Deliberately modest — enough to answer whether the movement is growing and where.

**Export.** Members and groups as CSV, for the board and for disaster recovery. Every export is written to the audit log with who ran it and when, because it is the most sensitive action in the application.

**Audit log.** Who changed which record, before and after. Cheap to add now and impossible to reconstruct later.

## Key user flows

Four flows carry the application. If these are right, the rest is detail.

**Find a group.** Visitor lands on home or arrives at a group page from a search engine. Enters a postal code and radius. Sees distance-sorted results beside a map. Opens a group. Reads when and where it meets. Sends a message through the relay form. The leader receives it with a working reply-to. No account required at any step, and no email address exposed.

**Claim a listing.** Leader signs in, having been invited by email during migration. The system offers candidate records matching the email on the imported row. Leader selects theirs and confirms. A verification token goes to that email. On confirmation, `estuary_leader` is written with role `owner`, `claimed_at` is stamped, and the leader lands directly in the edit form with a prompt to check that the details are still right.

**Apply to ELSNet.** Member signs in and completes the intake. Answers are stored as structured JSON against a versioned question set, so the questions can change without breaking old applications. Status shows `applied`. An administrator reviews, invites them to a cohort call, and advances the stage; each transition emails the applicant. On `listed`, the member gains the leader role and can create a group.

**Moderate a submission.** A new group arrives in the queue. The administrator sees the submitted values and the submitter's history. Approving publishes the record, geocodes it, writes the audit entry, and emails the submitter. Requesting changes returns it with a note and leaves it unpublished.

One rule runs through all four: **nothing a member submits becomes publicly visible without either ownership verification or an administrator's approval.** That is what keeps an open directory from becoming a spam target.

## Data model

Nine tables. Types are given for PostgreSQL with PostGIS; the equivalents in another engine are noted in the platform document.

**member** — one row per human, owned by the membership module.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid pk |  |
| external\_subject\_id | text unique | The identity provider's subject claim. Keyed on this, never on email, so a member can change their address |
| email | citext not null | Current contact address |
| display\_name | text not null |  |
| role | enum | visitor, leader, admin |
| status | enum | active, suspended, deleted |
| created\_at, last\_seen\_at | timestamptz |  |

**profile** — the public-facing half, split out so visibility is per field.

| Column | Type | Notes |
| --- | --- | --- |
| member\_id | uuid pk fk | One-to-one with member |
| city, region, country | text |  |
| postal\_code | text |  |
| location | geography(Point,4326) | City or postal centroid. Never an exact address |
| meeting\_place\_note | text | The "nearest coffee shop" field, reframed |
| visibility | jsonb not null | Per-field flags, default all false |
| contact\_preference | enum | relay\_only, direct\_email |
| findable | boolean default false | Opt in to the member finder |

**estuary** — a group, owned by the directory module.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid pk |  |
| slug | text unique | Stable URL, survives a rename |
| name | text not null |  |
| meets\_when | text not null | Free text; groups describe schedules in prose |
| meets\_where | text | Venue name and city |
| special\_directions | text |  |
| meetup\_url | text |  |
| location | geography(Point,4326) | Null for online-only groups |
| geocode\_precision | enum | exact, venue, city, postal, manual |
| timezone | text | IANA identifier |
| language | text | BCP 47 |
| format | enum | in\_person, online, hybrid |
| status | enum | draft, pending, published, dormant, rejected |
| last\_confirmed\_at | timestamptz | Drives stale review |
| created\_at, updated\_at | timestamptz |  |

**estuary\_leader** — the join that gives a listing an owner.

| Column | Type | Notes |
| --- | --- | --- |
| estuary\_id, member\_id | uuid fk | Composite pk |
| role | enum | owner, co\_leader |
| listed\_publicly | boolean default false |  |
| claimed\_at | timestamptz | Null until verified |

**application** — ELSNet intake and pipeline.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid pk |  |
| member\_id | uuid fk |  |
| question\_set\_version | int not null | Lets questions change without breaking old rows |
| answers | jsonb not null |  |
| cohort\_preference | text |  |
| wants\_public\_listing | boolean |  |
| status | enum | applied, invited, training, listed, withdrawn, declined |
| reviewer\_notes | text | Never visible to the applicant |
| status\_changed\_at | timestamptz |  |

**contact\_message** — the relay, which must be a table rather than a passthrough so abuse can be rate-limited and traced.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid pk |  |
| estuary\_id | uuid fk |  |
| sender\_name, sender\_email | text |  |
| body | text |  |
| delivered\_at | timestamptz |  |
| spam\_score | numeric |  |
| sender\_ip\_hash | text | Hashed, never raw |

**consent\_event** — who agreed to what, when. Added because the migration needs it.

| Column | Type | Notes |
| --- | --- | --- |
| id | uuid pk |  |
| member\_id | uuid fk |  |
| kind | enum | listing\_publication, contact\_display, email\_updates |
| granted | boolean not null |  |
| source | enum | migration, signup, settings |
| recorded\_at | timestamptz |  |

**resource** — training manual and what follows it: title, description, blob reference, locale and page-size variant, access level (public or members), version.

**audit\_log** — actor, entity, entity\_id, action, before and after as jsonb, occurred\_at.

### Indexes that matter

| Index | On | Why |
| --- | --- | --- |
| GiST spatial | estuary.location | Admin and API radius queries; the public search runs client-side against the static artifact |
| Partial | estuary (status) where status = 'published' | Public queries only ever read published rows |
| B-tree | estuary.last\_confirmed\_at | Stale review sorts on it |
| GiST spatial | profile.location where findable | Member finder |
| B-tree | application (status, status\_changed\_at) | Finds applications with no movement |

### Three choices worth defending

Splitting **profile** from **member** is what makes per-field visibility possible at all; the current single checkbox cannot express it. **last\_confirmed\_at** is one column separating a directory that decays from one that does not. And **consent\_event** exists because migrating 150 people's contact details onto a new platform is something the organisation may later need to show its working on.

## Module architecture

One deployable, with hard internal boundaries. This is the decision that makes plugins possible later without committing to a plugin API now.

The instinct is to build an extension system up front so community features drop in cleanly. That reliably freezes the wrong abstraction: an extension surface published before there are extensions is fixed in place by its first consumer, and the project spends years unable to change it. What is needed in the App V1 is the **seam**, not the system.

| Module | Owns | Publishes events |
| --- | --- | --- |
| directory | estuary, estuary\_leader, contact\_message | listing.submitted, listing.published, listing.confirmed, listing.went\_dormant |
| membership | member, profile, consent\_event | member.registered, profile.visibility\_changed, member.deleted |
| applications | application | application.submitted, application.stage\_changed |
| content | resource, static pages | resource.published |
| notifications | delivery only | consumes events, owns no domain data |
| platform | auth, audit\_log, geocoding, search primitives | — |

Three rules hold it together. Modules talk through **typed service interfaces and a documented internal event bus**, never by reading each other's tables — notifications learns that a listing was published by subscribing, not by querying `estuary`. Boundaries are **mechanically enforced** by lint rules on import paths or separate workspace packages, because on a volunteer team with rotating contributors an unenforced boundary is gone within a year, and with it the whole basis for plugins. And the first community features are built **as in-repo modules using only these seams**: if a feature can be built without punching through a boundary, the seam is right.

Extract a plugin SDK only once three real modules have proven what it needs. That is an earned abstraction rather than a guessed one.

## How a change reaches the public site

Serving the directory statically adds one step that did not exist before, and it needs to be explicit so nobody is surprised by a stale listing.

1. A leader edits a group they own, or an administrator approves a submission.
2. The change is written to the database, which remains the source of truth.
3. The directory module emits `listing.published` or `listing.confirmed`.
4. A build job regenerates the public JSON artifact from published rows and geocodes anything new.
5. The artifact is uploaded and the CDN cache for it is invalidated.

Three properties to hold onto. The build is **idempotent** — regenerating from the same rows produces the same file, so it can be re-run safely at any time. It is **cheap**: 54 rows is milliseconds, so there is no reason to batch changes for efficiency. And the artifact is **derived, never authoritative** — if it is lost or corrupted, rebuild it; never edit it directly, and never let anything read it back as a source of truth.

The open decision is the trigger and the resulting staleness window: rebuild on every change, on a short schedule, or both with a scheduled rebuild as a safety net. A leader who fixes a wrong meeting time and does not see it appear within a few minutes will assume the edit failed and do it again, so the window should be minutes rather than hours. This is recorded as a question in the open questions document.

For group detail pages there is a related choice: pre-render one page per published group at build time, which is best for search engines and costs nothing at 54 pages, or render them from the application. Pre-rendering is the better default here, since most visitors arrive at a group page directly from a search engine.

## Public API

The extension point that costs nothing to commit to and serves the most consumers. Versioned under `/api/v1`, described by OpenAPI, read-only in the App V1.

Note that this is **not** how the site's own directory reads data — that comes from the static artifact described above. The API exists for integrations: another community's site embedding a group finder, a partner listing nearby groups, a future plugin. It therefore carries no load from ordinary visitors, which is why anonymous rate limits can be strict without hurting anyone.

| Endpoint | Returns |
| --- | --- |
| GET /api/v1/estuaries | Published groups, filterable by `near` and `radius`, `format`, `language`; paginated |
| GET /api/v1/estuaries/{slug} | One published group |
| GET /api/v1/leaders | Publicly listed leaders, same geo filters |
| POST /api/v1/estuaries/{slug}/contact | Relay message; rate-limited, no authentication |

Four rules. The API **serves only what is already public** — it is never a side door around per-field visibility, and unpublished or dormant records are simply absent. Contact details are **never** in a response body, on any endpoint, for any caller. Anonymous reads are rate-limited by IP; a registered integration gets a token and a higher ceiling. And webhooks for `listing.published` and `application.stage_changed` let an integration react without polling.

Write endpoints beyond the contact relay wait until someone has a concrete use for them. Publishing a write API for a directory this size, before anyone has asked, is how the plugin mistake enters through a different door.

## Non-functional requirements

| Area | Requirement |
| --- | --- |
| Directory search | Results in under 500 ms at p95 for a radius query over the expected dataset of a few hundred rows |
| Public pages | Served from a CDN with no cold start; a first-time visitor never waits on a container spinning up |
| Accessibility | WCAG 2.1 AA, verified before launch. The audience skews older and the site must work on a phone in a car park |
| Privacy | No contact detail rendered publicly, anywhere. Coordinates stored at centroid precision. Per-field visibility default private |
| Data export and deletion | A member can export their own data and request deletion; deletion tombstones the row and detaches it from public records |
| Observability | Errors and basic usage, with a daily ingestion cap set before the first log is written |
| Backup | Automated daily, with a restore actually rehearsed once before launch rather than assumed |
| Browser support | Current Chrome, Safari, Firefox and Edge, plus iOS and Android Safari or Chrome two versions back |
| Internationalisation | Interface strings externalised from the first commit. At least one group operates in German today, and the leader list spans four continents |

Accessibility and internationalisation are the two that get retrofitted expensively if they are not designed in from the Static MVP. Both are cheap in the first week.

## Out of scope for v1

Each exclusion is deliberate, and each has a reason that is not simply "no time".

| Excluded | Why |
| --- | --- |
| Forum, groups, chat | The current Wix site loads these apps but no route exposes them. Confirm whether anyone uses them before building replacements — building a forum nobody wants is the most expensive mistake available here |
| Blog | Same. If the movement publishes, it does so on YouTube and elsewhere |
| Plugin SDK | Deliberately deferred until three in-repo modules have proven the seams |
| Write API beyond the contact relay | No named consumer yet |
| Attendance or meeting records | Changes the relationship from directory to surveillance. Needs a governance decision, not an engineering one |
| Payments and donations | No requirement stated. Adds PCI scope to a volunteer-run platform |
| Native mobile apps | A responsive site covers the need at this scale |
| Multi-tenancy for other movements | Interesting, and a reason to keep the code portable, but not a v1 requirement |

The one to watch is attendance tracking. It will be requested, it sounds harmless, and it quietly converts a public directory into a record of who attends conversations about religion and meaning. That is a board decision before it is a backlog item.
