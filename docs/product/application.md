# Estuary Hub — Member and Admin Application (App MVP and App V1)

Sep 26, 2026 · @joseph · Product design · For Estuary leadership and community members

## Related Records

- [Roadmap](roadmap.md)
- [Public Site](static-site.md)
- [Interface Design Brief](interface-design-brief.md)
- [Requirements by Release](../technical/requirements-by-release.md#app-mvp): the technology requirements for this product
- [Open Questions](../decisions/open-questions.md)

## What this product is

The signed-in part of Estuary Hub, for the people who keep the movement running: leaders, members, ELSNet applicants and administrators.

The public site is the front door. The application moves the work behind it out of administrators' inboxes and into the hands of the people it belongs to. Leaders edit their own listings, applicants see where they stand, and administrators get a queue, reports and a record of every change.

Visitors to the public site notice almost nothing. It keeps working as before, but its information now comes from what leaders maintain themselves.

| Release | Theme | Depends on |
| --- | --- | --- |
| **App MVP** | Leaders own their listings; ELSNet applications are tracked; administrators get a queue | Static MVP live for at least a month; a long-term maintainer named ([P6](../decisions/open-questions.md#p6-what-must-be-true-before-app-mvp-starts--pre-app-mvp)) |
| **App V1** | Member profiles and the member finder, reports, stale-listing review; the Wix member area retired | App MVP |

App MVP is the part that takes work off administrators. App V1 is where members, not just leaders, move off Wix.

## Who it is for

| Person | Uses it | Needs | Fails when |
| --- | --- | --- | --- |
| **Leader** | A few times a year, often on a laptop | To fix a meeting time, confirm the listing, and see messages | They must relearn it every visit |
| **ELSNet applicant** | During the application | To know it arrived and where it stands | They are left wondering |
| **Member.** Interested, not leading | Occasionally | To control what others see about them, and to find people nearby | Privacy settings are confusing, so they over-share or hide completely |
| **Administrator.** ELC staff or a named volunteer | Weekly, working through a list | To clear requests and applications quickly and see how the movement is doing | Every action takes three clicks and a page reload |

Leaders set the **forgiveness** bar: someone returning after eight months must succeed without help. Administrators set the **speed** bar: this is the one place efficiency matters more than warmth.

## Roles

| Role | How someone gets it | Can do |
| --- | --- | --- |
| Member | Signs up | Apply to ELSNet; from App V1, manage a profile and find members |
| Leader | Claims an existing listing, or an administrator moves their ELSNet application to "listed" | Create and edit groups they lead; add a co-leader in App V1 |
| Administrator | Appointed by the organisation ([B7](../decisions/open-questions.md#b7-who-moderates-and-against-what-standard--pre-launch)) | Everything, including unpublished records and the change history |

**Leader is earned, not self-declared.** A leader can edit only the groups they lead.

## Functions by release

**Must** means the release doesn't launch without it. **Should** can follow shortly after launch. **Could** is built only when someone asks for it.

| # | Function | For | Release | Priority | Takes over from |
| --- | --- | --- | --- | --- | --- |
| A1 | Sign in | Everyone signed in | App MVP | Must | — |
| A2 | Claim your listing | Leader | App MVP | Must | — |
| A3 | Edit your group | Leader | App MVP | Must | S9 request form |
| A4 | Confirm your listing is current | Leader | App MVP | Must | Twice-yearly admin email |
| A5 | Leader home | Leader | App MVP | Must | — |
| A6 | Apply to ELSNet and see your status | Applicant | App MVP | Must | S7 form to inbox |
| A7 | Review queue | Admin | App MVP | Must | Admin inbox |
| A8 | ELSNet pipeline | Admin | App MVP | Must | Coordinator's inbox |
| A9 | Export and change history | Admin | App MVP | Must | — |
| A10 | Your data: download or delete | Everyone signed in | App MVP | Must | — |
| A18 | Hand over or close a group | Leader | App MVP | Must | S9 handover option |
| A11 | Your profile and who sees it | Member | App V1 | Must | Wix profile |
| A12 | Find members near you | Member | App V1 | Should | Wix member search |
| A13 | Stale listing review | Admin | App V1 | Must | Manual tracking |
| A14 | Reports | Admin | App V1 | Must | S11 counts |
| A15 | Registered interest, stored with consent | Admin | App V1 | Should | S14 inbox messages |
| A16 | Co-leaders | Leader | App V1 | Should | — |
| A17 | Public data feed for partners | Other sites | App V1 | Could | — |

## App MVP

**Goal:** leaders keep their own listings current without waiting on an administrator, ELSNet applications stop disappearing, and every change is recorded.

### A1. Sign in

Email-based sign-in through a standard identity service; Estuary Hub never stores passwords. Sign-in appears as one menu at the top of the public site, so it never competes with "find a group" for a newcomer's attention.

### A2. Claim your listing

The step that turns an imported listing into one a leader owns.

1. The leader receives an invitation email and signs in.
2. The site suggests the groups linked to their email address.
3. They pick theirs, and a confirmation link goes to the address already on record.
4. Once they click it, the group is theirs. They land in the edit form with a prompt to check the details.

Until a group is claimed, it stays published, with an administrator responsible for it.

### A3. Edit your group

One form to create, edit or pause a group, usable only by its leaders.

When changes go live ([D2](../decisions/open-questions.md#d2-do-edits-to-published-listings-go-live-immediately-or-into-the-queue--blocking) recommended answer):

| Change | Goes live |
| --- | --- |
| Meeting time, directions, format, language, link | Immediately; on the public site within minutes |
| Group name or location | After an administrator approves it |
| A brand-new group | After an administrator approves it |

The leader sees their saved change straight away in their own view, even before the public site catches up, so they never wonder whether the save worked.

### A4. Confirm your listing is current

Twice a year, the leader is prompted to confirm the listing: one click, dated. The date appears on the public group page (S16). This one date is what separates a directory that stays accurate from one that quietly decays.

### A5. Leader home

The first screen after signing in. It opens with the groups the leader runs, and on each one the most likely action: **confirm this listing is still current.** Below that: edit, recent messages received through the contact form, and ELSNet status if an application is open. Every button is labelled in words, with no icon-only controls.

### A6. Apply to ELSNet and see your status

The applicant fills in the application once, signed in, and can then see which of the four stages they are at: **applied → invited → training → listed**. They receive an email at each step. Questions can change over time without breaking earlier applications, and reviewers' notes are never shown to the applicant.

### A7. Review queue

Everything waiting for an administrator, in one list: new groups, changes needing approval, and problems or concerns reported by visitors (S18). Each item shows what was submitted, what changed compared with the live listing, and who sent it. There are three actions: **approve**, **send back with a note**, or **reject**. Each has a keyboard shortcut.

### A8. ELSNet pipeline

The four stages, tracked. An administrator moves each application forward, and each move can email the applicant. Moving to **listed** makes the person a leader. Applications with no movement in 30 days are flagged.

### A9. Export and change history

- **Export** members and groups for the board and for disaster recovery. Every export is recorded with who ran it and when.
- **Change history:** who changed which record, and what it said before and after. It is cheap to build now and impossible to reconstruct later.

### A10. Your data: download or delete

Any signed-in person can download what is held about them and ask for it to be deleted. Deleting removes them from every public listing. The exact obligations follow [X1](../decisions/open-questions.md#x1-data-protection-for-the-international-contact-list--blocking-for-launch-not-for-building).

### A18. Hand over or close a group

Groups end and leaders move on. A leader can hand a group to someone else, who must accept before it becomes theirs, or close it, which marks it paused with a short public note instead of deleting its page. If a leader leaves without doing either, an administrator can do it for them, and the stale review (A13) is how that gets noticed. Every handover is recorded in the change history (A9).

### What changes when App MVP launches

| What | Before | After |
| --- | --- | --- |
| Directory records | Maintained by administrators | Imported once; the application becomes the only source |
| Leader contact addresses | Held privately for the contact form | Linked to each leader's account when they claim (A2) |
| "Update your group" (S9) | Emails administrators | Takes the leader to sign in and edit (A3) |
| ELSNet form (S7) | Emails the coordinator | Stored and tracked (A6); applications already in progress are entered at their current stage ([F3](../decisions/open-questions.md#facts-somebody-needs-to-go-and-find)) |
| Wix member area | Running | Still running, until App V1 |
| Group page addresses | Permanent | Unchanged |

## App V1

**Goal:** members, not just leaders, move off Wix, and the organisation can see how the movement is doing.

### A11. Your profile and who sees it

Today's member area has one checkbox controlling everything. App V1 gives each detail its own setting: name, city, region, country, a note about where to meet, and how to be contacted. **Every setting starts private.** Each is described by who will see it, for example "Your city is shown to signed-in members."

Location is stored only to the nearest town or postcode area, never a home address.

### A12. Find members near you — Should

The member search that exists behind today's Wix sign-in, rebuilt to respect each person's choices. A member who hasn't chosen to be findable doesn't appear. Messages go through the same private contact form as S5.

Whether it is worth rebuilding depends on how much the Wix version is used ([P7](../decisions/open-questions.md#p7-is-the-member-finder-worth-rebuilding--pre-app-v1)).

### A13. Stale listing review

Groups whose last confirmation has lapsed, oldest first, with two one-click actions: nudge the leader, or mark the group as paused (S16).

### A14. Reports

Deliberately modest, enough to answer "is the movement growing, and where?":

- Published groups, by country and region
- New groups over time
- Applications at each stage
- Where people searched and found nothing (from S11)

### A15. Registered interest, stored with consent — Should

"I'm interested in a group here" (S14) is stored properly instead of arriving in an inbox. When a leader starts a group nearby, the people who registered interest there can be told. Consent is recorded, and can be withdrawn at any time. Messages collected by email earlier are imported only if the person agrees again ([P4](../decisions/open-questions.md#p4-what-happens-to-im-interested-messages-before-app-v1--pre-static-v1)).

### A16. Co-leaders — Should

A leader can invite a co-leader by email. Both can then edit the group, and either can confirm it.

### A17. Public data feed for partners — Could

A read-only feed of published groups, so a partner organisation can show "estuaries near you" on its own site. It contains only what is already public, never any contact details, and is built only once a partner asks for it.

### What changes when App V1 launches

- The Wix member area is switched off, and old member links redirect to the new site.
- Interest messages collected by email move into A15, for people who agree again.

## Promises the application makes

Everything the [public site promises](static-site.md#promises-the-public-site-makes), plus:

- **Nothing a member submits becomes public without proof of ownership or an administrator's approval.**
- Every privacy setting starts private.
- No one's home address is stored.
- You can download or delete your data.
- Every change to a listing, and every export, is recorded.
- No attendance or meeting records are kept, pending the board's principle on [B6](../decisions/open-questions.md#b6-attendance-tracking--deferred-but-decide-the-principle-now).

## Not in either application release

Forum, chat, community groups, blog, attendance records, donations, mobile apps, and hosting for other movements. The reasons are in [Application Architecture](../technical/application-architecture.md#out-of-scope-for-v1). If F2 shows the first three are in use, they are designed as a later release, built on the application's existing structure rather than bolted on.
