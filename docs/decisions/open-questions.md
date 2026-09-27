# Estuary Hub — Open Questions

Sep 26, 2026 · @joseph · Decision backlog · For product owners, the board and the Estuary Technology team

## Related Records

- [Decision Register](README.md)
- [Delivery Checklist](delivery-checklist.md)

## How to use this document

Every question below has a recommended default. **If nobody objects to a default, that is the answer** — the point of this document is to surface decisions, not to stall on them.

Questions are sorted by who decides. A product question (P) is about what the product does and for whom, and is settled by Estuary leadership and community members as product owners. A board question (B) is one where the organisation carries the consequence: licensing an asset, stewarding other people's contact details, setting a scope boundary with ethical weight. A development question (D) is one the Estuary Technology team settles among themselves and records in an architecture decision note.

Comment directly on any question in this document rather than replying by email — that keeps the answer attached to the question.

| Priority | Meaning |
| --- | --- |
| Blocking | The release named in the index below cannot start, or cannot start correctly, until this is answered |
| Pre-launch | Needed before that release goes live, not before building it |
| Deferred | Can wait, but should be recorded as deliberately deferred |

The four releases are **Static MVP**, **Static V1**, **App MVP** and **App V1**, described in the [Roadmap](../product/roadmap.md#the-four-releases).

## Question index

The earliest release each question holds up. Questions for Static MVP come first because that release ships first.

| Holds up | Product owners | Board | Technology team | Outside review / facts |
| --- | --- | --- | --- | --- |
| Product-owner review | P8 | — | — | — |
| Static MVP build | P1, P9, P11, P12, P13 | B1, B2, B3 (light-duty maintainer), B8, B10 | D3, D4, D7, D8, D11, D12 | X3, F4, F8 |
| Static MVP launch | P3, P5 | B4, B5, B7, B9 | — | X1, X2, F6 |
| Static V1 | P2, P4 | — | — | F7 |
| App MVP build | P6, P10 | B3 (long-term maintainer) | D1, D2, D5, D10 | F1, F2, F3 |
| App MVP launch | — | — | D6, D9 | — |
| App V1 | P7 | B6 | — | — |

## For the product owners

Settled by Estuary leadership and community members. Record each outcome in the [Decision Register](README.md).

### P1. Does the Static MVP ship first and on its own? — Blocking

The public site can launch with no sign-in, no database and no dependency on the application. That gets strangers a working directory soonest, tests whether the organisation can keep a site running before taking on the bigger commitment, and produces real numbers to size the application against.

*Recommended default: yes. Static MVP ships first; Static V1 and App MVP follow in parallel; App V1 comes last.*

### P2. Should trained leaders without a group be listed? — Pre-Static V1

This is the second option offered when a search finds nothing nearby, and it is how many new groups start. It needs each leader's permission first ([B4](#b4-re-consent-or-migrate-the-contact-list-as-it-stands--pre-launch)).

*Recommended default: yes, in Static V1, showing only leaders who opt in during re-consent outreach. A shorter list with permission is better than a longer one without.*

### P3. How quickly will administrators act on listing requests? — Pre-Static MVP launch

Until App MVP, every listing change goes through an administrator. The request form tells the leader what to expect, so the promise has to be one we can keep.

*Recommended default: within seven days, with two named administrators sharing the inbox ([B7](#b7-who-moderates-and-against-what-standard--pre-launch)). If requests regularly take longer, that is evidence App MVP is needed sooner.*

### P4. What happens to "I'm interested" messages before App V1? — Pre-Static V1

Each message holds a person's email address and rough location, and until App V1 there is nowhere to store them properly.

*Recommended default: they go to the administrators' inbox, are answered by hand, and are deleted after a stated period. They move into App V1 only if the person agrees again.*

### P5. What must be true before the Wix directory is switched off? — Pre-Static MVP launch

*Recommended default:* every current published group is on the new site or deliberately retired; every old link redirects; re-consent outreach has run and its grace period has started ([B4](#b4-re-consent-or-migrate-the-contact-list-as-it-stands--pre-launch)); the data-protection review is complete ([X1](#x1-data-protection-for-the-international-contact-list--blocking-for-launch-not-for-building)); the accessibility check has passed; two named administrators are in place; and the Wix member area no longer displays leader email addresses.

### P6. What must be true before App MVP starts? — Pre-App MVP

*Recommended default:* Static MVP has been live at least one month; a long-term maintainer is named for the application ([B3](#b3-who-maintains-this-after-launch--blocking)); [F2](#facts-somebody-needs-to-go-and-find) is answered; and the Static MVP counts show real administrator workload. If listing requests turn out to be rare, App MVP can start with the ELSNet pipeline alone.

### P7. Is the member finder worth rebuilding? — Pre-App V1

The Wix member area has a radius search over members. Rebuilding it with per-field privacy is real work.

*Recommended default: check how much the Wix version is used before App V1 is scoped. If it is barely used, retire it with the Wix member area and do not rebuild it.*

### P8. How will product owners review and comment? — Blocking for review

Product owners are community members, and most will not comment on Markdown files in a GitHub repository. Without a channel they can actually use, silence will look like agreement under "if nobody objects, that is the answer" — which is the wrong way for a decision to be made.

*Recommended default: each review round is exported to a shared document or PDF with a stated closing date. One named review steward gathers the comments, brings them back into the repository, and records outcomes in the [Decision Register](README.md). A recommended default stands only if the round actually reached the product owners and the closing date passed without objection.*

### P9. What does success look like for each release? — Blocking for Static MVP build

Counts (S11) say what is measured, not what counts as working. Targets need a baseline from today's site ([F4](#facts-somebody-needs-to-go-and-find)) captured before Wix is switched off, or no improvement can ever be shown.

*Recommended default targets, confirmed or adjusted once the baseline is in:*

| Release | Measured after | Target |
| --- | --- | --- |
| Static MVP | 3 months | Zero email addresses exposed anywhere; contact messages reaching leaders at least at today's level; listing requests handled within the promised time ([P3](#p3-how-quickly-will-administrators-act-on-listing-requests--pre-static-mvp-launch)) nine times in ten |
| Static V1 | 3 months | Every "no group here" search offers at least one next step; interest registrations and leader opt-ins tracked by region |
| App MVP | 90 days | Three in four active groups claimed by their leaders; no ELSNet application without movement for more than 30 days; administrator time on listing changes clearly down |
| App V1 | 6 months | Nine in ten published listings confirmed within the last 12 months; the Wix site switched off |

The App MVP claim rate is the one to watch. It tests the riskiest assumption in the plan: that leaders who touch the site a few times a year will take ownership of their listing.

### P10. What if the Static MVP falls short? — Pre-App MVP

B3 has a fallback; the rebuild as a whole needs one too.

*Recommended default: review three months after Static MVP launch against [P9](#p9-what-does-success-look-like-for-each-release--blocking-for-static-mvp-build).*
- *If it meets its targets and a long-term maintainer exists, start App MVP.*
- *If it meets its targets but nobody can commit to the application, stop at the static releases. They stand alone by design and are still better than today's site.*
- *If the site itself cannot be kept running by a volunteer, return to improving Wix in place, as described under [B3](#b3-who-maintains-this-after-launch--blocking), and carry over the directory data and redirects.*

### P11. Which of the wireframe's extra pages are in the Static MVP? — Blocking for Static MVP build

The community's wireframe draws three pages the [Public Site](../product/static-site.md) function list does not include: **Conferences**, a general **Contact** page, and **Donate**. Each is small, but each adds something to keep up to date, and Donate needs a payment company and an account the nonprofit owns.

*Recommended default: add Conferences and Contact to the Static MVP as new functions at the end of the list. Keep a Donate page, but have it send people to a payment company's own secure page; the site never handles card details. The board chooses the payment company and who holds the account, alongside [B2](#b2-who-owns-the-accounts--blocking).* See the [Visual Design Proposal](../product/visual-design-proposal.md#the-pages).

### P12. Seven menu items or four? — Blocking for Static MVP build

The wireframe's menu has seven items: Home, What is Estuary?, Sign Up, Conferences, Contact, Donate, Log in. The [Interface Design Brief](../product/interface-design-brief.md#information-architecture) proposes four destinations plus an account menu, with finding a group first. More items is familiar; fewer puts the directory in front of newcomers.

*Recommended default: keep the wireframe's labels, but rename "Sign Up" to "Find a group" so the directory is named in the menu, and hide "Log in" until the App MVP exists.* The clickable example currently follows the wireframe as drawn, so the two can be compared.

### P13. What leads the home page? — Blocking for Static MVP build

The wireframe opens with a scrolling strip of photos and video stills. The brief's first principle is to answer "is there one near me" before anything else, and it rules out carousels.

*Recommended default: the mission sentence, then the group search directly beneath it, with photos in a panel beside it that change only when the visitor presses the arrows.* This is what the [Visual Design Proposal](../product/visual-design-proposal.md#where-this-departs-from-the-wireframe-and-why) shows.

## For the board

### B1. Which licence? — Blocking

The real question is whether the organisation would mind someone running a closed, hosted fork of this for another community.

**AGPL-3.0** says no: network use triggers the obligation to share modifications, which keeps improvements flowing back. It is the conventional choice for a nonprofit's platform asset. **Apache-2.0** says you don't mind, and buys wider adoption, easier corporate contribution and an explicit patent grant. A common split is AGPL for the server with a permissive licence on the client SDK and plugin interfaces, so integrators aren't forced to relicense their own work.

*Recommended default: AGPL-3.0 for the server, Apache-2.0 for any SDK.* This is the organisation disposing of an asset, so it should be a minuted decision with a qualified review, not settled in a pull request.

### B2. Who owns the accounts? — Blocking

The GitHub organisation and the Azure subscription must belong to the nonprofit, never to an individual contributor, with **at least two people holding owner access** so the bus factor is not one. Someone also needs to own the annual grant renewal by name.

*Recommended default: nonprofit-owned, two named owners on each, renewal owner recorded in the board minutes.*

### B3. Who maintains this after launch? — Blocking

A custom application with no named maintainer is worse than the Wix site it replaced. The Wix site will still be running in 2030; a bespoke application with an expired certificate will not.

*Recommended default: name a light-duty maintainer before the Static MVP build begins, and a long-term maintainer before App MVP begins. If no name emerges, the honest alternative is improving the existing Wix site in place — moving the two directories into Wix CMS collections closes the two biggest gaps for a fraction of the effort, and any volunteer can keep it running.*

### B4. Re-consent, or migrate the contact list as it stands? — Pre-launch

About 150 people's names, emails and approximate locations move to a new platform. Asking them is both the decent thing and a good list-cleaning exercise — but if only half confirm, launch day shows a thinner directory than the site it replaced.

*Recommended default: ask, with a grace period. Unconfirmed listings stay visible carrying a "confirm your listing" prompt for a defined window, then go dormant. Start outreach during the directory build, not at launch.*

### B5. Is the training manual public or members-only? — Pre-launch

Currently it sits behind a login. Public lowers the barrier for someone considering starting a group; gated preserves a relationship with ELSNet before someone runs a session unsupported.

*Recommended default: public. The material's value is in being read, and the training relationship is carried by the ELSNet cohort calls rather than by file access control.*

### B6. Attendance tracking — Deferred, but decide the principle now

It will be requested, it sounds harmless, and it quietly converts a public directory into a record of who attends conversations about religion and meaning. Whatever the answer, it should be the board's rather than a backlog item someone picks up.

*Recommended default: no attendance or membership records in the platform, recorded as a deliberate principle rather than an omission.*

### B7. Who moderates, and against what standard? — Pre-launch

An open submission form on a public directory needs someone deciding what gets published. The application provides the queue; the organisation provides the judgement and the named people.

*Recommended default: two named administrators, a short written standard for what qualifies as an estuary group, and a stated response time so submitters know what to expect.*

### B8. What is the site's relationship to the wider movement? — Pre-launch

The current site is closely identified with specific individuals. A nonprofit-owned platform may want a different posture — more institution, less personality — and that materially changes the home page and FAQ copy.

*Recommended default: worth ten minutes of discussion before the content is written, because rewriting it afterwards is the expensive order.*

### B9. What does the site promise about the groups themselves? — Pre-Static MVP launch

The site sends strangers, some of them lonely or vulnerable, to meet other strangers and talk about belief and meaning. Two things need a board answer before the group pages and FAQ are written: whether listed groups are endorsed by the organisation or independently run, and what someone should do if a meeting goes wrong.

*Recommended default: groups are described as independently run by trained volunteers, following a short published set of shared expectations. Every group page links to that statement and to a way to raise a concern with the organisation, which goes to the administrators and is handled like a listing report (S18). Worth a qualified read alongside X1, since it touches liability.*

### B10. Who owns content, design and support? — Blocking for Static MVP build

The Static MVP's critical path includes work no one is named for: writing the about pages and FAQ, drafting the re-consent and launch messages, the visual design, German translation for Static V1, and answering visitors and leaders after launch.

*Recommended default: name four roles, which may be the same people — a content owner, a designer (or a decision that design is developer-led, following the [interface brief](../product/interface-design-brief.md#deliverables-and-phases)), a support lead for the administrators' inbox, and a data steward who handles download and deletion requests. Record the names in the [Delivery Checklist](delivery-checklist.md).*

## For the development team

Settle these among yourselves and record each as a short architecture decision note.

### D1. What stores the data? — Blocking

This was originally written as "Postgres or Azure SQL," which was too narrow. It smuggled in an assumption worth questioning: that one store holds everything.

**The data is far smaller than it feels.** The entire public directory as it renders today — 54 groups and 106 leader entries — is about **26 KB of text**, under 10 KB compressed. That is a fraction of one photograph on the home page. Writes are a handful per week, and reads are overwhelmingly "show me groups near this postal code."

**So split the question by sensitivity before choosing an engine.** There are two populations with opposite requirements:

|  | Public directory | Private member data |
| --- | --- | --- |
| Contents | Groups, publicly listed leaders | Profiles, ELSNet applications, consent events, relay messages |
| Visibility | Public by definition | Must never be public |
| Reads | Constant, the hot path | Rare, by few people |
| Writes | A few a week | A few a week |
| Needs | Moderation, audit trail, geo search | Access control, deletion, export |

Once separated, the public half may not need a database at all, and whatever serves the private half sits off the hot path where the choice matters much less.

### Options

| Option | Cost | Public directory | Private data | Main objection |
| --- | --- | --- | --- | --- |
| Static JSON on the CDN, search in the browser | $0 | Excellent | No | Cannot hold anything private or writable |
| Git as source of truth, CI rebuilds the site | $0 | Excellent | No | Leaders are not developers — needs a git-backed CMS over it |
| PostgreSQL Flexible Server + PostGIS | The main recurring line item | Good | Good | The only option with a standing bill |
| Azure SQL Database, free tier | $0 within the allowance | Good | Good | Proprietary engine; contributors cannot easily self-host |
| Azure Cosmos DB, free tier | $0 within 1,000 RU/s and 25 GB | Good, has geo indexing | Workable | Document model fights a relational schema; admin reports get awkward |
| Azure Table Storage | Pennies | Workable | Workable | No joins, no ad-hoc queries; poor developer ergonomics |
| SQLite | Varies | Good | Good | Unsafe on Container Apps — see the platform document |
| Managed Postgres off Azure (Neon, Supabase) | Free tier | Good | Good | A nonprofit platform resting on a startup's free tier, and outside the grant |
| Airtable or Google Sheets | Free tier | Workable | **No** | 150 people's contact details in a service the board does not control |

On the Azure SQL free allowance: 100,000 serverless vCore-seconds a month works out to roughly 55 hours of active compute at the 0.5 vCore minimum, so it depends on auto-pause suiting the traffic pattern. Verify that against real traffic before relying on it — I have not.

### Recommendation

*Split the data, then pick one engine for the private half.*

Serve the **public directory as a static JSON file built at deploy time** and do the geo search in the browser. At 26 KB this is faster than any database query, costs nothing, cannot leak private data because it contains none, survives a backend outage, and removes the highest-traffic feature from the database entirely.

Keep **PostgreSQL as the single store** behind it, as the source of truth for everything including the records the directory is built from. That keeps one schema, one migration path, one backup, and one engine contributors run locally — and it keeps the option of dropping the static build later if it ever stops fitting.

Two alternatives worth a real hearing rather than a dismissal. **Azure SQL's free tier** would zero out the only recurring cost; the objection is binding an open-source project to an engine contributors cannot readily self-host, not capability. And **git as the source of truth for the public directory** is unusually well matched to this problem — moderation becomes pull request review, the audit log becomes git history, backup becomes every clone, all free and already built. Its limit is hard rather than soft: private member data cannot live in a public repository, so it solves half the problem and you still need a store for the other half.

*What this decision blocks: the schema, the migration, and the local development setup. It does not block the interface work.*

### D2. Do edits to published listings go live immediately, or into the queue? — Blocking

Immediate is kinder to leaders and respects their ownership. Queued is safer for a public directory carrying the organisation's name.

*Recommended default: immediate for a verified owner editing their own listing, queued for new submissions and for any change to a group's name or location. That splits the difference along the line where abuse would actually occur.*

### D3. Which framework, and does it matter? — Blocking

Less important than it feels, with one real constraint: whatever the team picks must produce a container that a contributor can run locally in one command, and must let the public pages be built as static output for Static Web Apps.

*Recommended default: whatever the majority of the team already knows well. Fluency beats fashion on a volunteer project.*

### D4. DCO or CLA? — Blocking

A contributor licence agreement lets the nonprofit relicense later but deters casual contributors. A Developer Certificate of Origin is a line in a commit message.

*Recommended default: DCO, unless the board's answer to B1 leaves relicensing genuinely on the table.*

### D5. How are three environments funded and kept cheap? — Blocking

Two idle databases cost as much as one busy one.

*Recommended default: production runs continuously; development and staging auto-stop when idle. Automate it rather than relying on memory.*

### D6. Private endpoint for the database, or firewall rules? — Pre-launch

A private endpoint is the stronger security posture and a real line item — it pulls the Container Apps environment into a virtual network, which adds charges.

*Recommended default: firewall rules plus managed identity for App MVP and App V1, with the private endpoint priced and revisited once the budget has a year of real data behind it. Record it as a conscious trade, not an oversight.*

### D7. What does the synthetic seed dataset look like? — Blocking

The repository is public and the application holds 150 real people's contact details. Those two facts must be separated by design rather than discipline.

*Recommended default: a generated seed with invented names and plausible coordinates spanning several countries, and it is the only dataset the test suite knows about. No production row ever enters the repo — not in a fixture, a migration, a test snapshot, or an issue attachment reproducing a bug.*

### D8. Which language ships first, and is the interface translatable? — Pre-launch

At least one group operates in German today and the leader list spans four continents.

*Recommended default: English at launch, but interface strings externalised from the first commit. Retrofitting internationalisation is expensive; designing for it costs almost nothing in week one.*

### D9. How long are contact relay messages retained? — Pre-launch

The relay table exists so abuse can be rate-limited and traced, which means it accumulates other people's messages.

*Recommended default: retain 90 days, then delete the body and keep only the metadata needed for abuse prevention.*

### D10. How fresh must the public directory be? — Blocking

New, and a direct consequence of D1. If the directory is served as a static artifact rebuilt from the database, there is a window between a leader saving a change and the public site showing it.

The window matters for one specific human reason: a leader who corrects a wrong meeting time and does not see it appear will assume the save failed and do it again, or email an administrator. The cost of a long window is not stale data, it is duplicate submissions and support load.

| Trigger | Window | Note |
| --- | --- | --- |
| Rebuild on every publish event | Seconds to a minute | Cheapest correct answer at 54 rows; a rebuild is milliseconds |
| Scheduled rebuild every few minutes | Up to the interval | Simpler, but the leader sees nothing happen |
| Event-driven with a scheduled rebuild as a safety net | Seconds, self-healing | Catches a missed event without anyone noticing |

*Recommended default: event-driven, with a scheduled rebuild every 15 minutes as a safety net, and the leader's own edit screen reading live from the database so they see their change confirmed immediately regardless of the public artifact.*

That last clause is the important one — it decouples the leader's confidence from the publish pipeline entirely.

### D11. Where does the directory live before the application exists? — Blocking for Static MVP

New, and a consequence of [P1](#p1-does-the-static-mvp-ship-first-and-on-its-own--blocking). Until App MVP there is no database, but an administrator still has to publish listing changes without developer help, with review and history ([requirements SM5, SM6](../technical/requirements-by-release.md#static-mvp)).

| Option | Review and history | Administrator effort | Moving to App MVP |
| --- | --- | --- | --- |
| Public fields as a data file in the repository, edited through a git-backed CMS | Free: pull requests and git history | Low once the CMS is set up | Straightforward one-time import |
| Hand-edited data file in the repository | Free | Needs someone comfortable with GitHub | Straightforward |
| A spreadsheet the build reads from | None built in | Lowest | Import, but no history comes with it |

*Recommended default: public fields in the repository behind a git-backed CMS.* This is the "git as source of truth" option from [D1](#d1-what-stores-the-data--blocking), which suits the static releases because they hold no private data. Leader contact addresses are the exception and go to [D12](#d12-how-does-the-contact-relay-work-before-the-application-exists--blocking-for-static-mvp).

### D12. How does the contact relay work before the application exists? — Blocking for Static MVP

The contact, listing-request, ELSNet and interest forms need something that receives a submission, looks up a private recipient and sends email, without the leader's address ever reaching the browser or the public repository.

*Recommended default: a single small serverless function alongside the static site. It keeps the slug-to-address lookup in a private secret store, sends through the transactional email service in the [platform plan](../technical/azure-platform-and-costs.md#reference-architecture), and applies rate limits and a spam check. App MVP later takes over the same endpoints ([the seam](../technical/requirements-by-release.md#the-seam-between-the-two-products)).*

## Needs outside expertise

Three questions where neither the board nor the developers should answer from general impression. Each needs someone qualified.

### X1. Data protection for the international contact list — Blocking for launch, not for building

The leader directory includes people in Canada, Europe and Australia. Republishing their names, emails and approximate locations on a new platform under a nonprofit's control touches data-protection law — GDPR at minimum. Nobody on this project should be summarising those obligations from memory.

**What to ask:** what lawful basis covers publishing a volunteer leader's contact details; what the retention, access and deletion obligations are; whether a privacy notice and a data processing record are required; and whether hosting region matters.

*This does not block building. It blocks launching with the existing list imported wholesale. Design for per-field visibility, consent events and deletion from the start so whatever the answer is, compliance is cheap rather than retrofitted.*

### X2. Accessibility obligations — Pre-launch

A nonprofit publishing a public directory is exactly the kind of organisation that receives accessibility complaints. WCAG 2.1 AA is the design target regardless; the question is whether anything stricter applies in the jurisdictions where the organisation operates.

**What to ask:** what standard applies to this organisation's public website, and whether a published accessibility statement is expected.

### X3. Licence review — Blocking

B1 sets the direction. Someone qualified should confirm that the chosen licence does what the board intends, is compatible with the dependencies the project will pull in, and is the right instrument for a nonprofit releasing an asset.

**What to ask:** does this licence achieve the board's intent, and does anything in the dependency tree conflict with it?

The guidance in these documents describes common practice. It is not legal advice, and the three questions above are precisely where that distinction matters.

## Facts somebody needs to go and find

Not decisions — unknowns. Each is answered by looking, and each changes an estimate or a scope boundary. All of them need access to the current site's administration, which a sanctioned rebuild should now have.

| # | Unknown | Why it matters | Who can answer |
| --- | --- | --- | --- |
| F1 | How large is the real dataset behind the site? | 54 groups and 106 leader emails are counted from rendered pages. The CMS almost certainly holds more — unpublished records, interest signups, past applications. Every migration estimate assumes the export, not the HTML | Site administrator |
| F2 | Are the Blog, Groups and Chat apps actually in use? | All three load in the home page bundle, but no route exposes them. If they are live behind the member wall, scope grows from a directory to a platform. If they are vestigial, they are simply deleted | Site administrator |
| F3 | How many ELSNet applications exist, and at what stage? | Decides whether the pipeline migrates real state or starts empty | ELSNet coordinator |
| F4 | What is the current traffic, and what is the baseline to beat? | Every free-tier calculation assumes low volume, and the success targets in [P9](#p9-what-does-success-look-like-for-each-release--blocking-for-static-mvp-build) need a before-picture: monthly visits, directory page views, and how many contacts leaders say they receive. Capture it before Wix is switched off, or it is gone | Site administrator, plus a short question to leaders |
| F5 | Who currently administers the site day to day? | They are the real domain expert on the moderation workflow, and the person the admin surface is being designed for | The board |
| F6 | Where is the domain registered, and who controls DNS? | A launch-day dependency that surfaces at the worst moment if nobody checks early | The board |
| F7 | Are there other language groups beyond the German one? | Affects whether internationalisation is theoretical or immediate | ELSNet coordinator |
| F8 | When does the Wix subscription renew, and what does it cost? | The Wix member area keeps running until App V1, so both sites are paid for in parallel. The renewal date sets a natural deadline | Board treasurer |

F1 and F2 are the two worth chasing first. F1 sizes the migration; F2 decides whether this is a three-month project or a six-month one.

## The critical path

Of everything above, five answers unblock the rest — and none of them needs a developer. One thing comes before all five: [P8](#p8-how-will-product-owners-review-and-comment--blocking-for-review), a review channel the product owners can actually use, so that their answers are real answers.

1. **Does the Static MVP ship first and on its own (P1).** If yes, the questions below are needed for the Static MVP, and the heavier commitments (a long-term maintainer, the data store) move back to App MVP.
2. **Who maintains this after launch (B3).** Answer this first, because a no changes the project rather than delaying it. Static MVP needs only a light-duty maintainer; App MVP needs a committed one. If no name emerges even for the Static MVP, improving the Wix site in place is the honest alternative and everything below becomes moot.
3. **Who owns the accounts (B2).** The grants cannot be applied for until the nonprofit owns the GitHub organisation and the Azure subscription, and the Azure credits expire 90 days after issue.
4. **Which licence (B1).** The repository cannot be made public without it, and the repository is public from the first commit.
5. **Are Blog, Groups and Chat in use (F2).** Decides whether the scope is a directory or a platform, which changes every estimate downstream.

Everything else can be settled while the Static MVP is being built.

The one worth dwelling on is the first. A custom application is the right call only if there is a named person who will own it in three years. If the honest answer is "me, when I have time," a bespoke application is a liability dressed as an upgrade — and there is no shame in the smaller version that a volunteer can keep running. Deciding that deliberately is a better outcome than discovering it in month eight.
