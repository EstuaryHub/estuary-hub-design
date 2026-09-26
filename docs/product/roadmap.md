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
3. **The product questions P2–P7.** Each has a recommended answer in [Open Questions](../decisions/open-questions.md#for-the-product-owners), and **if nobody objects, the recommendation stands.**

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

## Not in any of the four releases

These were considered and deliberately left out. The reasons are in [Application Architecture](../technical/application-architecture.md#out-of-scope-for-v1).

- Forum, chat, community groups and blog (pending F2)
- Attendance or meeting records. The principle is the board's to decide ([B6](../decisions/open-questions.md#b6-attendance-tracking--deferred-but-decide-the-principle-now)).
- Donations and payments
- Mobile apps. The site works on phones.
- Hosting the platform for other movements

## How to review

1. Read this page, then [Public Site](static-site.md) and [Application](application.md). Each is organised by release.
2. Comment on any function you think is in the wrong release, or shouldn't be in any.
3. Answer or accept [P1–P7](../decisions/open-questions.md#for-the-product-owners). Accepted answers are recorded in the [Decision Register](../decisions/README.md).
