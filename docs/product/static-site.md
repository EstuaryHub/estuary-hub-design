# Estuary Hub — Public Site (Static MVP and Static V1)

Sep 26, 2026 · @joseph · Product design · For Estuary leadership and community members

## Related Records

- [Roadmap](roadmap.md)
- [Member and Admin Application](application.md)
- [Interface Design Brief](interface-design-brief.md)
- [Requirements by Release](../technical/requirements-by-release.md#static-mvp): the technology requirements for this product
- [Open Questions](../decisions/open-questions.md)

## What this product is

The public website at estuaryhub.com. It answers one question: **is there an estuary conversation near me, and how do I reach the people who run it?**

Nobody signs in. Every page is published ahead of time and served as-is, so the site is fast, cheap and hard to break. It keeps working even if the member application is down or was never built. Anything a visitor sends, such as a message to a leader or a request to update a listing, is delivered by email to the right person.

| Release | Theme | Depends on |
| --- | --- | --- |
| **Static MVP** | Find a group near you and contact its leader privately | Nothing. It ships first. |
| **Static V1** | Help people where there is no group yet, in more than one language | Static MVP |

## Who it is for

| Person | Arrives | Needs |
| --- | --- | --- |
| **The newcomer.** The main audience | From a search engine or a friend's link, usually on a phone | To learn what this is, whether a group is nearby, what happens if they go, and how to reach someone |
| **Someone with no group nearby** | Same | A next step instead of a dead end |
| **A would-be leader** | From the home page or FAQ | To understand ELSNet, apply, and read the training material |
| **A current leader** | From an email or a bookmark | To keep their listing right, and to receive messages without exposing their address |
| **An administrator** | Their email inbox | Requests arriving through one form, in a consistent format |

When a design choice helps one of these people at another's expense, the newcomer wins ([design principles](interface-design-brief.md#design-principles)).

## Functions by release

**Must** means the release doesn't launch without it. **Should** is planned for the release but can follow shortly after launch. **Could** is built only if time allows.

| # | Function | Release | Priority | Gap |
| --- | --- | --- | --- | --- |
| S1 | Home page with search at the top | Static MVP | Must | 1 |
| S2 | Find a group near you | Static MVP | Must | 1 |
| S3 | "Not yet near you" results | Static MVP, extended in V1 | Must | 1 |
| S4 | A page for every group | Static MVP | Must | 1 |
| S5 | Contact a leader privately | Static MVP | Must | 3 |
| S6 | About the conversations | Static MVP | Must | — |
| S7 | Start a group | Static MVP | Must | 4 (partly) |
| S8 | Training materials | Static MVP | Must | — |
| S9 | Update or add your group | Static MVP | Must | 2 (partly) |
| S10 | Old links keep working | Static MVP | Must | — |
| S11 | Simple, private counts | Static MVP, extended in V1 | Must | 5 (partly) |
| S12 | Privacy and accessibility statements | Static MVP | Must | — |
| S13 | Trained leaders near you | Static V1 | Must | 1 |
| S14 | Tell us you're interested | Static V1 | Must | 1 |
| S15 | The site in German | Static V1 | Should | — |
| S16 | "Last confirmed" and paused-group notices | Static V1 | Should | 2 (partly) |
| S17 | Printable group flyer | Static V1 | Could | — |
| S18 | Report a problem with this listing | Static MVP | Must | 2 (partly) |

## Static MVP

**Goal:** a newcomer can find the nearest group and contact its leader, and no leader's email address is published anywhere.

### S1. Home page with search at the top

One sentence says what an estuary conversation is. The location search sits directly beneath it, visible on a phone without scrolling. Below it are three concrete facts about what a meeting is like, then a smaller path to starting a group.

It replaces a home page with eleven competing links. *Done when a first-time visitor can start a search without scrolling or reading anything else.*

### S2. Find a group near you

The visitor enters a postcode or city, or allows their phone to share its location, and picks a distance (25, 50 or 100 miles; kilometres outside the US). Results appear instantly, nearest first, in a list and on a map. Pointing at a group in one highlights it in the other.

Optional filters cover format (in person, online, hybrid) and language. Online-only groups appear in their own section below the nearby results, because "0 miles away" would be misleading.

The list works without the map. If the map fails to load, or the visitor uses a screen reader, every result is still in the list with its distance.

*Done when results change as the distance or filters change, with no loading screen and no "search" button to press.*

### S3. "Not yet near you" results

With 54 groups worldwide, most searches will find nothing within range. This screen is where someone decides whether to leave or to start something.

- **In Static MVP** it shows the nearest group beyond the chosen distance, with its real distance, and a gentle path to starting a group (S7).
- **In Static V1** it adds trained leaders nearby (S13) and "tell us you're interested" (S14).

The tone is "not yet, and here is what is close," never "no results found."

### S4. A page for every group

Each group gets its own permanent web address. The page shows the group's name, when it meets, where (venue and city only, unless the leader chooses to publish more), format, language and any special directions, with a small map and one Contact button. The pages are built to be indexed well by search engines, because most newcomers will arrive on a group page rather than the home page.

Each group page also says plainly how groups relate to the organisation, and how to raise a concern, following the board's answer to [B9](../decisions/open-questions.md#b9-what-does-the-site-promise-about-the-groups-themselves--pre-static-mvp-launch).

**What the page never shows:** an email address, a phone number, or a street address the leader has not explicitly chosen to publish.

### S5. Contact a leader privately

The Contact button opens a short form: the visitor's name, email address and message. The message is emailed to the group's leader, and when the leader clicks Reply, the reply goes straight to the visitor. The leader's address is never shown anywhere.

After sending, the visitor sees who will reply: *"Sent. Ruth will reply to you directly."* Repeated sending is limited, to keep spam out of leaders' inboxes.

This one function fixes the site's most serious privacy problem: 106 leader addresses published where anyone can copy them.

### S6. About the conversations

Three pages carried over from the current site and rewritten, not copied:

- **What happens at an estuary:** the shape of a meeting and what a first visit is like.
- **Sample topics:** examples of what tends to come up, not an agenda.
- **FAQ:** origins, roles, and how groups relate to each other.

The tone of this copy depends on [B8](../decisions/open-questions.md#b8-what-is-the-sites-relationship-to-the-wider-movement--pre-launch), which should be settled before writing starts.

### S7. Start a group

One path, replacing today's two separate signup pages. It explains what ELSNet is, what leading involves, and the four stages (applied, invited, training, listed). It ends with the application form.

In the Static releases the form is emailed to the ELSNet coordinator, and the page tells applicants who will contact them and roughly when. Once App MVP is live, the form moves into the application, and applicants can track their stage there ([A6](application.md#a6-apply-to-elsnet-and-see-your-status)).

### S8. Training materials

The leader training manual and related files, in each available page size and language, with plain labels ("A4, for printing outside the US"). No sign-in is needed, assuming [B5](../decisions/open-questions.md#b5-is-the-training-manual-public-or-members-only--pre-launch) is answered "public." If the board chooses members-only, this function moves to App MVP.

### S9. Update or add your group

One form, replacing today's separate Add and Edit forms, which shared nothing.

- **To update an existing group,** the leader picks their group, and the form opens with the current details filled in.
- **To add a new group,** they start from a blank copy of the same form.
- **To hand a group over or close it,** they choose that option, and either name the person taking over or say the group has stopped meeting. A handover is confirmed with the new leader before it takes effect. A closed group is marked paused, never deleted, so its page still explains what happened.

The request reaches the administrators' inbox in a consistent format that shows what changed. An administrator checks it and publishes it, and the change appears on the site within minutes. The form tells the leader how long this usually takes ([P3](../decisions/open-questions.md#p3-how-quickly-will-administrators-act-on-listing-requests--pre-static-mvp-launch)).

**Rule:** nothing sent through this form appears on the site until an administrator approves it.

Twice a year, administrators email each leader asking them to confirm their listing is still correct, and record the date of each confirmation.

Once App MVP is live, this form takes leaders to sign in and edit directly instead ([A3](application.md#a3-edit-your-group)).

### S10. Old links keep working

Every address on the current site, including the 15 known pages and each group's old link, sends visitors to the matching new page. Leader lists and group links have been shared by email for years, and a broken link would look like the movement had disappeared.

### S11. Simple, private counts

- **In Static MVP:** the site counts searches, searches that found nothing, messages sent and requests received.
- **In Static V1:** it adds rough region for each search, so we can see where groups are wanted but don't exist.

No tracking cookies, no following individuals, no advertising or third-party tracking, and no cookie banner needed.

These numbers are the evidence for App MVP ([P6](../decisions/open-questions.md#p6-what-must-be-true-before-app-mvp-starts--pre-app-mvp)).

### S12. Privacy and accessibility statements

Two short, plain-language pages. One says what the site collects through its forms, who receives it, and how long it is kept. The other says what accessibility standard the site meets and how to report a problem. Their exact content depends on [X1](../decisions/open-questions.md#x1-data-protection-for-the-international-contact-list--blocking-for-launch-not-for-building) and [X2](../decisions/open-questions.md#x2-accessibility-obligations--pre-launch).

### S18. Report a problem with this listing

Every group page has a small "Report a problem" link. A visitor who turns up to find the group no longer meets there, or who has a concern about a group, says so in a short form. It goes to the administrators' inbox like S9, and once App MVP is live, to the review queue ([A7](application.md#a7-review-queue)).

Visitors are usually the first to discover a listing is wrong. Without this link, the only check is the leaders' twice-yearly confirmation. The same route handles concerns about a group itself, as set out in [B9](../decisions/open-questions.md#b9-what-does-the-site-promise-about-the-groups-themselves--pre-static-mvp-launch).

### Static MVP launch criteria

The old Wix directory is switched off only when all of these are true ([P5](../decisions/open-questions.md#p5-what-must-be-true-before-the-wix-directory-is-switched-off--pre-static-mvp-launch)):

- Every current published group is on the new site, or deliberately retired
- Every old link redirects correctly
- Re-consent outreach has run, and its grace period has started ([B4](../decisions/open-questions.md#b4-re-consent-or-migrate-the-contact-list-as-it-stands--pre-launch))
- The data-protection review is complete ([X1](../decisions/open-questions.md#x1-data-protection-for-the-international-contact-list--blocking-for-launch-not-for-building))
- The accessibility check has passed
- The success targets and their baseline are recorded ([P9](../decisions/open-questions.md#p9-what-does-success-look-like-for-each-release--blocking-for-static-mvp-build), [F4](../decisions/open-questions.md#facts-somebody-needs-to-go-and-find))
- Leaders have been told about the change before it happens ([launch communications](roadmap.md#launch-communications))
- Two named administrators are in place ([B7](../decisions/open-questions.md#b7-who-moderates-and-against-what-standard--pre-launch))
- The Wix member area no longer displays leader email addresses

## Static V1

**Goal:** someone with no group nearby still finds a next step, and the site works for people who don't read English.

### S13. Trained leaders near you

The same search, over trained leaders who do not yet run a group. It helps someone with no group nearby find a person who could start one. Each leader has a page with name, city and a Contact button that works like S5.

**Only leaders who have said yes appear.** Their permission is collected during re-consent outreach ([P2](../decisions/open-questions.md#p2-should-trained-leaders-without-a-group-be-listed--pre-static-v1)). It is in V1 rather than MVP because enough permissions need to be gathered first.

### S14. Tell us you're interested

On the "not yet near you" screen, a visitor can leave their name, email and area to hear if a group starts nearby. Until App V1 these go to the administrators' inbox and are handled by hand ([P4](../decisions/open-questions.md#p4-what-happens-to-im-interested-messages-before-app-v1--pre-static-v1)). The form says plainly what happens to the details and for how long they are kept.

### S15. The site in German — Should

The interface and the about pages are available in German, with a language switcher, because at least one group meets in German. Any other language that [F7](../decisions/open-questions.md#facts-somebody-needs-to-go-and-find) turns up follows the same route. Group listings stay in whatever language their leader writes them in.

### S16. "Last confirmed" and paused-group notices — Should

Each group page shows when its listing was last confirmed ("Listing confirmed March 2027"), so a newcomer can trust it is current. A group an administrator has marked as paused drops out of search results, but its page stays up with a clear notice, so shared links still lead somewhere.

### S17. Printable group flyer — Could

A one-page printable version of a group's page, with a short link and a QR code, for leaders to put up in a library or café. The audience skews older, and a lot of recruitment happens offline.

## What neither static release does

These are in the [application](application.md), not dropped:

- Signing in, and leaders editing their own listings (App MVP)
- Tracking ELSNet applications (App MVP)
- Member profiles and the member finder (App V1)
- A review queue, reports or export (App MVP and App V1)

## Promises the public site makes

Written so leaders and visitors can hold us to them:

- No email address or phone number is ever shown on the site.
- No street address is shown unless the leader chose to publish it.
- Nothing sent through a form is published without an administrator's approval.
- A leader appears in "trained leaders near you" only if they said yes.
- The site does not track individual visitors.
- The site works on a phone, with a keyboard and with a screen reader. The target is WCAG 2.1 AA, checked before each launch.
- Every piece of interface text is ready for translation from the first release.

## Risks

| Risk | What it looks like | Mitigation |
| --- | --- | --- |
| Thin directory at launch | Few leaders answer re-consent, so fewer groups are listed than today | Start outreach during the build; unconfirmed groups stay visible for a grace period ([B4](../decisions/open-questions.md#b4-re-consent-or-migrate-the-contact-list-as-it-stands--pre-launch)) |
| Administrators become the bottleneck | Requests pile up and leaders give up | A stated response time ([P3](../decisions/open-questions.md#p3-how-quickly-will-administrators-act-on-listing-requests--pre-static-mvp-launch)); S11 counts make the case for App MVP early |
| Listings go stale | No sign-in means no easy way for leaders to confirm their listing | Twice-yearly admin email (S9); visitor reports (S18); confirmation dates shown in Static V1 (S16) |
| Contact form abuse | Spam reaches leaders through the relay | Rate limits and spam checks; leaders can report abuse by replying |
| Wix still publishes emails | The old member area undoes the privacy fix | Part of the launch criteria above |
