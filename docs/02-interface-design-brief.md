# Estuary Hub — Interface Design Brief

Sep 26, 2026 · @joseph · Companion to the Application Design · For whoever designs the interface

## The design problem

Someone lonely, curious, or recently unmoored is deciding whether to walk into a room of strangers and talk about what they believe. The interface has about forty seconds to make that feel possible rather than exposing.

That is the whole design problem. Everything else — the admin queue, the application pipeline, the member finder — is in service of it or is internal machinery.

The interface serves three audiences with genuinely different needs:

| Audience | Arrives | Needs | Fails when |
| --- | --- | --- | --- |
| The newcomer | From a search engine or a friend's link, often on a phone | To know what this is, whether one is nearby, and what happens if they show up | The page explains the movement's philosophy before answering "is there one near me" |
| The leader | Signed in, on a laptop, once a month at most | To fix a meeting time, confirm the listing, answer a message | They must relearn the interface every visit because they use it so rarely |
| The administrator | Signed in, weekly, working through a queue | To clear submissions and applications quickly without losing track | Every action needs three clicks and a page reload |

The newcomer sets the visual and tonal direction. The leader sets the forgiveness requirement — infrequent users need interfaces that explain themselves. The administrator sets the density requirement, and is the one audience where efficiency beats warmth.

## Design principles

Five, each with a test that settles arguments later.

**1. Answer the question before explaining the philosophy.** The current home page offers eleven links and explains the movement before telling anyone where to go. Invert it. The location search is above the fold on the home page, not one click away. *Test: can a first-time visitor start a search without scrolling or reading?*

**2. Show the room before the invitation.** People decide whether to attend based on what the gathering will be like, not on what the organisation believes. Lead with concrete detail — twelve people, two hours, a circle of chairs, nobody brings an agenda — over abstractions about dialogue across difference. *Test: does a group page say what actually happens on a Tuesday evening?*

**3. Never make privacy the user's homework.** Every sharing control defaults to private and states plainly what becomes visible. No setting is described in terms of the system; each is described in terms of who will see what. *Test: can a leader say, without opening help, exactly who can see their meeting location?*

**4. Design the empty state first.** Most searches in most places will return nothing, because there are 54 groups on Earth. The no-results screen is not an error state, it is the second most important screen in the product — it is where someone in a town with no group decides to start one. *Test: does an empty search feel like an opportunity rather than a dead end?*

**5. Forgive the infrequent user.** A leader touches this four times a year. Nothing should depend on remembering where something lives. Destructive actions are reversible or confirmed; every form says what happens after submit. *Test: can someone who last signed in eight months ago update a meeting time without a wrong turn?*

When two principles conflict, the order above decides.

## Brand direction

The name is the brief. An estuary is where fresh water meets salt — a mixing zone, neither one thing nor the other, and unusually alive because of it. That is a better design metaphor than most organisations get, and it should be used rather than illustrated literally. No wave graphics, no river photography.

**What the metaphor means visually:** two things meeting without either winning. A cool, watery neutral ground with one warmer accent held back for moments of welcome. Generous whitespace, because a conversation space that looks crowded contradicts itself. Nothing shouts.

**Palette.** Direction rather than final values — the designer should take these as a starting point and validate contrast properly.

| Role | Direction | Used for |
| --- | --- | --- |
| Ground | Cool off-white with a slight cyan bias; deep blue-green in dark mode | Page background |
| Ink | Deep blue-green near-black, not pure black | Body text |
| Primary accent | Muted tidal teal | Links, primary actions, map markers |
| Warm accent | Silt — a desaturated ochre | Sparingly: welcome moments, the empty state's call to action |
| Semantic | Separate green, amber, red | Status only; never doubling as the brand accent |

Avoid the palette the whole internet currently uses for this kind of project: warm cream with a serif display face and a terracotta accent. It reads as generic and it undercuts the mixing-zone idea.

**Typography.** Two families. A serif with real character for headings — something with optical sizing, warm but not decorative — carrying the human, reflective side. A clean humanist sans for body and interface, chosen for legibility at small sizes on a phone in bad light, since the audience skews older. A monospace for data, coordinates and admin tables only.

Set body text no smaller than 16px, line length near 65 characters, and generous line height. This is a reading site as much as a directory.

**Voice.** Plain, warm, specific. The organisation's own language is already good — "holding space for connection, curiosity and transformation" — but interface copy is not the place for it. Buttons say what happens. Errors say what to do next. Nothing is called a journey.

## Information architecture

The current site has fifteen routes in one flat navigation, several of which differ only by who they are for. This collapses to four top-level destinations plus an account menu.

```
Home
├─ Find a group            ← primary; the search itself
│  ├─ /groups?near=&radius=
│  ├─ /groups/{slug}       ← indexable, the most-linked page on the site
│  └─ /leaders             ← trained leaders with no group yet
├─ What happens here      ← the protocol, FAQ, sample topics
├─ Start a group          ← ELSNet path, training, commitment
└─ Account
   ├─ /me                  ← profile and visibility
   ├─ /me/groups           ← groups I lead; create, edit, confirm
   ├─ /me/application      ← ELSNet status
   ├─ /members             ← member finder
   └─ /admin               ← administrators only
      ├─ /admin/queue
      ├─ /admin/applications
      ├─ /admin/stale
      └─ /admin/reports
```

Three decisions behind that shape. **Find a group is the site's centre of gravity**, so it is first and it is a destination rather than a form buried in a page. **Account is a menu, not a section** — signed-in functions do not compete with public navigation, which keeps the newcomer's path uncluttered. And **admin is a separate visual mode**, not a dropdown item; denser, more tabular, clearly a different place, so nobody confuses moderating with browsing.

The two ELSNet signup pages and the two add/edit pages collapse into one path each. Route redirects from every existing URL are a launch requirement, since the leader list has been shared by email for years.

## Key screens

Five screens carry the product. Each is described as layout, behaviour and failure mode rather than pixels — the designer decides the pixels.

### 1. Home

A short headline saying what an estuary conversation is in one sentence a stranger understands, then the **location search immediately beneath it**, above the fold, focused and ready. Below: three concrete facts about what a meeting is actually like, then a secondary path to starting a group.

No carousel, no hero video, no eleven links. The search field is the hero.

*Failure mode to avoid: a beautiful page that explains the movement and makes people hunt for the directory.*

### 2. Search results

Split view on desktop — scrollable result list on the left, map on the right, each highlighting the other on hover. On mobile, list first with a map toggle, never a tiny map above a list.

Each result card carries name, distance, when it meets, format, and a one-line location. Distance is the most scannable element after the name. Online-only groups sit in a labelled band below the distance-sorted results, because "0 miles away" would be a lie.

Filters for format and language are visible but secondary; with 54 groups, filtering is rarely what someone needs.

**Search is instant, and the design should assume it.** The whole directory loads with the page — about 26 KB — and the search runs in the browser, so there is no request to wait on. Design for results that update as the radius slider moves and as filters toggle, with no spinner, no submit button and no loading skeleton. The one genuine wait is the map tiles, which load independently and must not hold up the list.

This also means the list works before the map does, and keeps working if the map never loads at all — which is the same property the accessibility requirements depend on.

### 3. Empty results — the second most important screen

Most searches will land here. It must not read as failure. Three things, in order: the nearest group beyond the radius with its actual distance; any trained leader nearby who has not started a group yet, with a way to reach them; and an invitation to register interest for that area, plus a soft path to starting one.

The tone is "not yet, and here is what is close," never "no results found."

### 4. Group detail

The most-linked page on the site and the one that converts curiosity into attendance. Name, when it meets, where, format, language, and any special directions, followed by a map and a single clear contact action.

What matters most is what it does **not** show: no email address, no phone number, no street address unless the leader explicitly published one. The contact button opens a relay form.

Needs proper metadata — title, description, structured data for an event or organisation — because most visitors will arrive here from a search engine rather than the home page.

### 5. Leader dashboard

The screen an infrequent user meets. It opens with the groups they lead and, on each, the single most likely action: **confirm this listing is still current**. One click, dated, done.

Below that, edit, messages received through the relay, and ELSNet status if an application is open. Everything labelled in full; no icon-only controls, because someone returning after eight months should not have to decode anything.

### 6. Admin queue

Denser, tabular, a different visual mode. Rows of pending submissions with submitter, date and type; selecting one shows the submitted values and, for an edit, a diff against what is published. Approve, request changes, reject — each with a keyboard shortcut, because this is the one screen used repeatedly in a single sitting.

Status is encoded in shape as well as colour, so it survives both colour-blindness and a bad monitor.

## Component inventory

Built once, used everywhere. Roughly twenty components cover the whole product.

| Component | Where it appears | Notes |
| --- | --- | --- |
| Location search | Home, results, member finder | Postal code, city or geolocation; the single most important input on the site |
| Radius selector | Beside location search | 25 / 50 / 100 miles, with metric for non-US locales |
| Group card | Results list, leader dashboard | Name, distance, schedule, format badge |
| Map + markers | Results, group detail | Clustering above a threshold; keyboard-reachable markers |
| Format badge | Cards, detail, admin | In person / online / hybrid; shape as well as colour |
| Status pill | Admin, leader dashboard | Draft, pending, published, dormant |
| Empty state | Results, dashboard, admin queue | Takes a headline, a reason and up to two actions; never generic |
| Contact relay form | Group detail | Name, email, message; visible rate-limit feedback |
| Visibility toggle | Profile | States in words who will see the field, not just on/off |
| Confirm-listing prompt | Leader dashboard | Dated, one click |
| Diff view | Admin queue | Submitted values against published ones |
| Field set | All forms | Label, help text, error, all wired for screen readers |
| Pagination | Results, admin |  |
| Toast | Everywhere | Confirms what happened, in the past tense |
| Nav + account menu | Global |  |
| Language selector | Global | Present from launch even if only English ships |

Two components deserve unusual care. The **empty state** is a real component with a real API, not an afterthought — principle 4 depends on it. And the **visibility toggle** is the interface of the privacy model: if it is confusing, people either over-share by accident or hide entirely, and both outcomes damage the directory.

## Responsive behaviour

Mobile-first, and not as a slogan — a visitor deciding whether to attend is often standing somewhere with a phone.

| Breakpoint | Layout |
| --- | --- |
| Under 640px | Single column. Results list with a map toggle, never a shrunken map above a list. Search collapses to one field plus radius. Admin tables become stacked cards |
| 640–1024px | Two columns where content warrants. Results still list-first with the map as a panel |
| Above 1024px | Split view: results left, persistent map right. Admin gets full tables |

Rules that hold at every size: touch targets at least 44px, no horizontal page scroll ever, a 16px minimum side gutter, and form inputs at 16px or larger so iOS does not zoom on focus. The map is progressive enhancement — if it fails to load, the list is still complete and usable on its own.

## Accessibility

WCAG 2.1 AA, treated as a requirement rather than an audit at the end. Two reasons this matters more than usual here: the audience skews older, and a nonprofit publishing a public directory is exactly the kind of organisation that receives accessibility complaints.

| Requirement | How it is verified |
| --- | --- |
| Contrast 4.5:1 for body text, 3:1 for large text and interface elements | Automated check in CI on the token palette, both themes |
| Every function reachable by keyboard, with visible focus | Manual pass per screen before each release |
| Map has a non-map equivalent | The results list is complete on its own; map markers are focusable and labelled |
| Forms have real labels, and errors are announced | Screen reader pass on every form: search, contact relay, profile, group edit, ELSNet intake |
| Status never conveyed by colour alone | Shape or text accompanies every status colour |
| Headings form a correct outline | Automated lint |
| Touch targets at least 44px | Design review |
| Respects reduced-motion preference | Any animation gated on the media query |
| Page has a language attribute; content language marked where it differs | Matters already — at least one group operates in German |

The map is the hard one. A map is inherently visual, so the design obligation is that **nothing is only available on the map**. Every group in the map view is in the list with its distance, and the list is what screen readers and keyboard users work from.

## UX copy

Copy is design material here, not decoration — this is a site about conversation, and stilted interface language undercuts the whole proposition.

Four rules. **Say what happens, not what the system does.** **Use the reader's words** — people look for a group near them, not a listing record. **Errors state the fix**, never just the fault. **No apologies and no enthusiasm**; warmth comes from clarity.

| Instead of | Write |
| --- | --- |
| No results found | No estuaries within 25 miles yet — the closest is in Holland, 38 miles away |
| Submit | Send your message |
| Your submission has been received | Sent. Ruth will reply to you directly |
| Invalid postal code | We couldn't find that postal code — try a city name instead |
| Profile visibility settings | Who can see your details |
| Public: On | Your city is shown on your public profile |
| Update record | Save changes |
| An error occurred | We couldn't save that. Your changes are still here — try again |
| Leader Training Manual (PDF, A4) | Leader training manual — A4, for printing outside the US |

The empty state deserves its own line of thought. It is read by someone who just discovered there is nothing near them, and it decides whether they leave or consider starting something. It should name the nearest real option with a real distance, and it should never use the word "unfortunately".

## Deliverables and phases

Design runs ahead of the corresponding build phase, not alongside it. The sequence below assumes one designer, possibly volunteer, working in parallel with the development phases in the platform plan.

| Phase | Deliverable | Needed before |
| --- | --- | --- |
| A | Visual direction: palette with verified contrast in both themes, type pairing, two sample screens | Any interface code |
| B | Design tokens as a real file the developers import — colour, spacing, type scale, radii, shadows | Foundations build |
| C | Search, results and empty state, at three breakpoints | Directory build |
| D | Group detail and contact relay | Directory build |
| E | Profile, visibility controls, leader dashboard, group edit | Member area build |
| F | Admin queue and application pipeline | Admin build |
| G | Accessibility pass across everything, then a component documentation page | Launch |

**Handoff.** Tokens ship as code, not as a screenshot of a palette — a JSON or CSS custom-property file the developers import directly, so a colour is never transcribed by hand. Each screen comes with its states drawn, not just the happy path: loading, empty, error, and the long-content case where a group has a 400-character directions field.

**What does not need designing.** Admin screens beyond the queue can use a plain component library; they are internal, used by two or three people, and design effort there is better spent on the newcomer path.

**If there is no designer.** This brief is written so a developer with reasonable taste can execute it. In that case, do Phase A and B properly — a validated palette and a token file — and let the rest follow the component inventory. The failure mode to avoid is styling each screen as it is built, which produces a site that looks assembled rather than designed.
