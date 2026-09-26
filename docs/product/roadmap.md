# Estuary Hub — Roadmap

Sep 26, 2026 · @joseph · Product owners' overview · For Estuary leadership and community members

## Related Records

- [Public Site](static-site.md): Static MVP and Static V1
- [Member and Admin Application](application.md): App MVP and App V1
- [Requirements by Release](../technical/requirements-by-release.md): for the Estuary Technology team
- [Open Questions](../decisions/open-questions.md) and the [Decision Register](../decisions/README.md)

## What we are asking you to decide

Estuary Hub is two products:

- **the public site**, which anyone can use without signing in
- **the member and admin application**, used by leaders, members, ELSNet applicants and administrators after signing in

Each product has an **MVP**, the smallest version worth launching, and a **V1**, the complete first version. That makes four releases.

We are asking product owners to decide three things:

1. **The release order.** The public site's MVP ships first and on its own, with no dependency on the application ([P1](../decisions/open-questions.md#p1-does-the-static-mvp-ship-first-and-on-its-own--blocking)).
2. **What is in each release.** The function lists are in [Public Site](static-site.md#functions-by-release) and [Application](application.md#functions-by-release). Move anything you think is in the wrong release.
3. **The product questions P2–P10.** Each has a recommended answer in [Open Questions](../decisions/open-questions.md#for-the-product-owners), and **if nobody objects, the recommendation stands.**

Technology choices belong to the Estuary Technology team. The product documents say what each release must do. [Requirements by Release](../technical/requirements-by-release.md) turns that into what the technology must guarantee, and leaves the choice of tools to the team.

## The four releases

| | MVP: smallest version worth launching | V1: complete first version |
| --- | --- | --- |
| **Public site** (no sign-in) | **Static MVP.** Find a group near you and contact its leader privately | **Static V1.** Help people where there is no group yet, in more than one language |
| **Application** (sign-in) | **App MVP.** Leaders own their listings; ELSNet applications are tracked; administrators get a queue | **App V1.** Member profiles and the member finder, reports, stale-listing review; the old Wix member area retired |

### The order they ship in

```
Static MVP ──► Static V1
    │
    └────────► App MVP ──► App V1
```

1. **Static MVP ships first, alone.** It has no sign-in, no database and no dependency on anything else.
2. **Static V1 and App MVP follow**, built side by side. Neither waits for the other.
3. **App V1** comes last.

Each public site release still works if the application is down or never gets built. That is intentional: if the application never gets a long-term maintainer, the movement still has a working front door.

### What must be true before each release starts

| Release | Can start when |
| --- | --- |
| Static MVP | Licence chosen ([B1](../decisions/open-questions.md#b1-which-licence--blocking)); accounts owned by the nonprofit ([B2](../decisions/open-questions.md#b2-who-owns-the-accounts--blocking)); a light-duty maintainer named ([B3](../decisions/open-questions.md#b3-who-maintains-this-after-launch--blocking)) |
| Static V1 | Static MVP is live |
| App MVP | Static MVP has been live at least one month; a long-term maintainer named for the application ([B3](../decisions/open-questions.md#b3-who-maintains-this-after-launch--blocking)); Wix Blog/Groups/Chat usage known ([F2](../decisions/open-questions.md#facts-somebody-needs-to-go-and-find)) ([P6](../decisions/open-questions.md#p6-what-must-be-true-before-app-mvp-starts--pre-app-mvp)) |
| App V1 | App MVP is live, and its first months show which V1 functions matter most |

## Why split it this way

The current site fails two groups of people, and they need different things.

**It fails the stranger.** Someone looking for a conversation nearby faces 54 groups in one alphabetical list, with no search and no map, and leader email addresses printed in plain text. Fixing that needs a good public website and nothing more. The whole public directory is about 26 KB of text, smaller than a photo, so it can be published with the site and searched on the visitor's own phone.

**It fails the volunteers.** Leaders can't edit their own listings, ELSNet applications vanish into an inbox, and nobody can tell whether the movement is growing. Fixing that needs accounts, permissions, a database and ongoing care.

Shipping the public site first means strangers don't wait for the volunteers' tools. It also tests, cheaply, whether we can keep what we build running before we take on the bigger commitment. And it gives us real numbers (searches, messages, listing requests) to size the application against, instead of guesses.

Each product then gets its own MVP and V1 so that each launches as soon as it is useful. Neither has to wait until everything is finished.

## When each gap closes

The five gaps in today's site are the reason for the rebuild.

| # | Gap in today's site | Static MVP | Static V1 | App MVP | App V1 |
| --- | --- | --- | --- | --- | --- |
| 1 | The directory has no search, filter or map | **Closed** | | | |
| 2 | Listings have no owner; Add and Edit are separate forms | One request form, handled by administrators | | **Closed.** Leaders claim and edit their own listings | |
| 3 | Leader email addresses are published in plain text | **Closed**, together with the Wix change in [Transition](#transition-from-wix) | | | |
| 4 | ELSNet applications aren't tracked | The form reaches a named coordinator | | **Closed.** Four tracked stages that applicants can see | |
| 5 | Nothing is measured | Private counts: searches, messages, requests | Counts by region, including "no group here yet" | Application-stage counts | **Closed.** Full reports |

## What changes for each person

| Person | Static MVP | Static V1 | App MVP | App V1 |
| --- | --- | --- | --- | --- |
| **Someone looking for a group** | Searches by postcode; sees results in a list and on a map | Can use the site in German | — | — |
| **Someone with no group nearby** | Sees the nearest group and how to start one | Also sees trained leaders nearby, and can register interest | — | Is told when a group starts nearby |
| **A group leader** | Address hidden; messages arrive by email; changes requested through one form | Their group page shows when the listing was last confirmed | Signs in, claims the listing, edits it directly, confirms it with one click | Can add co-leaders; controls a profile field by field |
| **An ELSNet applicant** | Knows who will contact them | — | Sees which of four stages they are at | — |
| **A member** | Still uses the Wix member area | — | Still uses the Wix member area | Profile and member finder move to the new site |
| **An administrator** | Handles requests from one inbox | Handles interest messages too | Works through a queue; runs the ELSNet pipeline; every change is recorded | Gets reports and stale-listing review |

Administrators do more work in the Static releases, because every listing change goes through them. That is how things work today, now with one form instead of two. App MVP is what takes this work off them.

## Where the two products connect

Visitors see one site. Each point where the public site hands over to the application has a defined behaviour in every release, so nothing is lost at the boundary.

| Connection | Static releases | Once App MVP is live | Once App V1 is live |
| --- | --- | --- | --- |
| Where directory data comes from | Maintained by administrators | Leaders' own edits in the application | — |
| "Update your group" | Request form to administrators | Takes the leader to sign in and edit directly | — |
| ELSNet application form | Emailed to the coordinator | Stored and tracked in the application | — |
| "I'm interested in my area" (Static V1) | Emailed to administrators | — | Stored with consent, so interested people can be told when a group starts |
| The Contact button | Message relayed by email; the address is never shown | Same, and messages are recorded so abuse can be traced | — |
| Web addresses | Every group page has a permanent address | Unchanged | Unchanged |

A dash means no change from the column to its left. The Technology team's version of this table, the **seam contract**, is in [Requirements by Release](../technical/requirements-by-release.md#the-seam-between-the-two-products).

## Transition from Wix

| Part of today's site | Replaced at |
| --- | --- |
| Public pages and both directory lists | Static MVP |
| Add and Edit group forms | Static MVP (as a request form), then App MVP (direct editing) |
| ELSNet signup pages | Static MVP (as a form), then App MVP (tracked) |
| Member sign-in and member search | App V1 |
| Blog, Groups, Chat | Undecided until [F2](../decisions/open-questions.md#facts-somebody-needs-to-go-and-find) is answered |

The Wix member area stays in use until App V1. **It must stop displaying leader email addresses when Static MVP launches.** Otherwise the new site's privacy promise means nothing.

Running both sites costs money until App V1 retires Wix. The Wix renewal date ([F8](../decisions/open-questions.md#facts-somebody-needs-to-go-and-find)) is a natural deadline to plan against. Before anything on Wix is switched off, today's traffic and contact numbers must be captured as the baseline for the success targets ([F4](../decisions/open-questions.md#facts-somebody-needs-to-go-and-find)).

## How we'll know it's working

Each release has a small set of targets, measured a fixed time after launch. The proposed targets are in [P9](../decisions/open-questions.md#p9-what-does-success-look-like-for-each-release--blocking-for-static-mvp-build). The one that matters most is the **App MVP claim rate**: whether three in four active groups are claimed by their leaders within 90 days. The whole application rests on that assumption, and nobody has tested it yet.

Three months after Static MVP launches, product owners review the numbers and choose one of three paths ([P10](../decisions/open-questions.md#p10-what-if-the-static-mvp-falls-short--pre-app-mvp)): start App MVP, stop at the static releases, or return to improving Wix.

Before any of this is built, five short conversations with the people the product is for test the plan's riskiest assumptions. The [discovery interview guide](discovery-interview-guide.md) covers who to talk to and what to ask.

## Launch communications

The people most affected by Static MVP are leaders, whose email addresses come off the site and whose messages now arrive through a form. They should hear it from us before launch day.

| When | Who hears | What they are told | From |
| --- | --- | --- | --- |
| During the Static MVP build | Every listed leader | The re-consent request: what will be shown about them, what will not, and that their email address is coming off the site ([B4](../decisions/open-questions.md#b4-re-consent-or-migrate-the-contact-list-as-it-stands--pre-launch)) | Content owner |
| Two weeks before launch | Leaders who replied | The launch date, how contact messages will reach them, and how to request a change | Content owner |
| At launch | Members and the wider community | The new site, what it does, and that old links still work | Content owner |
| One month after launch | Leaders | A short check that messages are arriving, plus the baseline question for [F4](../decisions/open-questions.md#facts-somebody-needs-to-go-and-find) | Support lead |
| Before App MVP launch | Leaders | Their invitation to claim their listing ([A2](application.md#a2-claim-your-listing)), sent in small batches so problems surface early | Content owner |
| Before App V1 launch | Wix members | The member area is moving, and what happens to their profile | Content owner |

Roles are named under [B10](../decisions/open-questions.md#b10-who-owns-content-design-and-support--blocking-for-static-mvp-build).

## Running it after launch

Every release creates work that someone has to do. This is who does it, subject to the names recorded under [B10](../decisions/open-questions.md#b10-who-owns-content-design-and-support--blocking-for-static-mvp-build) and [B7](../decisions/open-questions.md#b7-who-moderates-and-against-what-standard--pre-launch).

| Situation | Handled by | Promised response |
| --- | --- | --- |
| Listing change, new group, handover or closure request | Administrators | Within the time set in [P3](../decisions/open-questions.md#p3-how-quickly-will-administrators-act-on-listing-requests--pre-static-mvp-launch) |
| A visitor reports a wrong listing or raises a concern about a group (S18) | Administrators | Acknowledged within 7 days; concerns about safety the same week |
| "My message never arrived" | Support lead | Within 7 days |
| Spam or abuse through the contact form | Administrators, with the maintainer if limits need changing | Within 2 days |
| The site is down or broken | Maintainer | Best effort. There is no paid support ([platform](../technical/azure-platform-and-costs.md#the-budget)) |
| Request to download or delete personal data | Data steward | Within the period set by the [X1](../decisions/open-questions.md#x1-data-protection-for-the-international-contact-list--blocking-for-launch-not-for-building) review |
| ELSNet application questions | ELSNet coordinator | As today |

The Technology team keeps a short runbook for the maintainer's rows, so a second person can follow it if the first is away.

## Not in any of the four releases

These were considered and deliberately left out. The reasons are in [Application Architecture](../technical/application-architecture.md#out-of-scope-for-v1).

- Forum, chat, community groups and blog (pending F2)
- Attendance or meeting records. The principle is the board's to decide ([B6](../decisions/open-questions.md#b6-attendance-tracking--deferred-but-decide-the-principle-now)).
- Donations and payments
- Mobile apps. The site works on phones.
- Hosting the platform for other movements

## How to review

Reviews run in rounds, each with a closing date, through a channel product owners already use ([P8](../decisions/open-questions.md#p8-how-will-product-owners-review-and-comment--blocking-for-review)). A named review steward shares each round and brings the comments back.

1. Read this page, then [Public Site](static-site.md) and [Application](application.md). Each is organised by release.
2. Comment on any function you think is in the wrong release, or shouldn't be in any.
3. Answer or accept [P1–P10](../decisions/open-questions.md#for-the-product-owners). Accepted answers are recorded in the [Decision Register](../decisions/README.md).
