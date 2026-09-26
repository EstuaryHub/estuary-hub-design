# Estuary Hub — Open Questions

Sep 26, 2026 · @joseph · Companion to the Application Design · For the board and the development team

## How to use this document

Every question below has a recommended default. **If nobody objects to a default, that is the answer** — the point of this document is to surface decisions, not to stall on them.

Questions are sorted by who decides. A board question is one where the organisation carries the consequence: licensing an asset, stewarding other people's contact details, setting a scope boundary with ethical weight. A development question is one the team can settle among themselves and record in an architecture decision note.

Comment directly on any question in this document rather than replying by email — that keeps the answer attached to the question.

| Priority | Meaning |
| --- | --- |
| Blocking | Phase 1 cannot start, or cannot start correctly, until this is answered |
| Pre-launch | Needed before go-live, not before building |
| Deferred | Can wait until after the core release, but should be recorded as deliberately deferred |

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

*Recommended default: name a maintainer before Phase 1 begins. If no name emerges, the honest alternative is improving the existing Wix site in place — moving the two directories into Wix CMS collections closes the two biggest gaps for a fraction of the effort, and any volunteer can keep it running.*

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

*Recommended default: firewall rules plus managed identity for the core release, with the private endpoint priced and revisited once the budget has a year of real data behind it. Record it as a conscious trade, not an oversight.*

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

## Needs outside expertise

Three questions where neither the board nor the developers should answer from general impression. Each needs someone qualified.

### X1. Data protection for the international contact list — Blocking for launch, not for building

The leader directory includes people in Canada, Europe and Australia. Republishing their names, emails and approximate locations on a new platform under a nonprofit's control touches data-protection law — GDPR at minimum. Nobody on this project should be summarising those obligations from memory.

**What to ask:** what lawful basis covers publishing a volunteer leader's contact details; what the retention, access and deletion obligations are; whether a privacy notice and a data processing record are required; and whether hosting region matters.

*This does not block Phase 1. It blocks launching with the existing list imported wholesale. Design for per-field visibility, consent events and deletion from the start so whatever the answer is, compliance is cheap rather than retrofitted.*

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
| F4 | What is the current traffic? | Every free-tier calculation assumes low volume. Wix analytics would confirm it in five minutes | Site administrator |
| F5 | Who currently administers the site day to day? | They are the real domain expert on the moderation workflow, and the person the admin surface is being designed for | The board |
| F6 | Where is the domain registered, and who controls DNS? | A launch-day dependency that surfaces at the worst moment if nobody checks early | The board |
| F7 | Are there other language groups beyond the German one? | Affects whether internationalisation is theoretical or immediate | ELSNet coordinator |

F1 and F2 are the two worth chasing first. F1 sizes the migration; F2 decides whether this is a three-month project or a six-month one.

## The critical path

Of everything above, four answers unblock the rest — and none of them needs a developer.

1. **Who maintains this after launch (B3).** Answer this first, because a no changes the project rather than delaying it. If no name emerges, improving the Wix site in place is the honest alternative and everything below becomes moot.
2. **Who owns the accounts (B2).** The grants cannot be applied for until the nonprofit owns the GitHub organisation and the Azure subscription, and the Azure credits expire 90 days after issue.
3. **Which licence (B1).** The repository cannot be made public without it, and the repository is public from the first commit.
4. **Are Blog, Groups and Chat in use (F2).** Decides whether the scope is a directory or a platform, which changes every estimate downstream.

Everything else can be settled while Phase 1 is underway.

The one worth dwelling on is the first. A custom application is the right call only if there is a named person who will own it in three years. If the honest answer is "me, when I have time," a bespoke application is a liability dressed as an upgrade — and there is no shame in the smaller version that a volunteer can keep running. Deciding that deliberately is a better outcome than discovering it in month eight.
