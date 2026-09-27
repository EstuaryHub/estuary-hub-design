# Estuary Hub — Visual Design Proposal

Sep 26, 2026 · @joseph · Companion to the Interface Design Brief · A proposal, not yet reviewed

## Related Records

- [Interface Design Brief](interface-design-brief.md) — the direction this proposal follows
- [Public Site](static-site.md) — the functions (S1–S18) the pages serve
- [Open Questions](../decisions/open-questions.md) — P11, P12 and P13 come from this proposal
- [Design folder](../../design/README.md) — the source wireframe, the design values and the clickable example

## What this is

The community's wireframe (`design/Estuarywebsite_wireframe.pdf`) sketches seven pages in black and white: Home, What is Estuary?, Sign Up, Conferences, Contact, Donate and Log In. It settles which pages exist and what goes on them. It does not settle colour, type or spacing.

This proposal fills that in, following the brand direction in the [Interface Design Brief](interface-design-brief.md#brand-direction), and turns the wireframe into a clickable example that works on a phone and on a laptop. It covers the brief's design [phases](interface-design-brief.md#deliverables-and-phases) A and B, and part of C, for the light theme only.

Nothing here is final. Wording in [square brackets] is a placeholder for Estuary leadership to write; nothing was invented to fill it.

## The look in one paragraph

An estuary is where fresh water meets salt. The pages sit on a cool, very pale blue-green ground, with deep blue-green text rather than black. One tidal teal marks everything you can act on: links, main buttons, map pins. A warm, sandy "silt" colour is held back for moments of welcome — the invitation to start a group, the screen you see when no group is nearby. The logo is two overlapping circles, one teal and one silt: two things meeting without either winning. Headings use a warm, bookish serif; body text uses a typeface designed for readers with low vision, because the audience skews older and often reads on a phone.

## Colour

Every text colour was checked against the background it sits on. All pass the accessibility standard the brief sets (4.5 to 1 for text, 3 to 1 for controls).

| Name | Value | Used for | Contrast |
| --- | --- | --- | --- |
| Ground | #F3F7F7 | Page background | Text on it 14.0 : 1 |
| Surface | #FFFFFF | Cards, header, form fields | Text on it 15.1 : 1 |
| Ink | #0F2A2E | Text; the footer | — |
| Ink muted | #4A6462 | Secondary text | 5.9 : 1 on ground |
| Tidal teal | #1B6B67 | Links, main buttons, map pins | 5.8 : 1 on ground; white on it 6.3 : 1 |
| Deep teal | #14524F | Buttons when pressed or hovered | White on it 8.9 : 1 |
| Teal mist | #E1EEEC | Badges, the selected group | Deep teal on it 7.5 : 1 |
| Field edge | #7F9795 | Outlines of boxes you type into | 3.1 : 1 |
| Silt | #B8914A | Logo and decoration only — never text | 2.7 : 1 |
| Silt mist | #EFE3C8 | Welcome bands and the "nothing nearby" invitation | Text on it 11.9 : 1 |
| Silt deep | #80601F | Small warm labels above headings | 5.8 : 1 on white |
| Success, warning, danger | #2E6B45, #8A5A00, #A4281F | Status messages only, always with a word or symbol too | 6.4, 5.9 and 7.2 : 1 on white |

## Type

| Role | Typeface | Size |
| --- | --- | --- |
| Headings | Newsreader, a serif with optical sizing | 56, 36 and 24 pixels on a laptop; smaller on a phone |
| Body and interface | Atkinson Hyperlegible, drawn for low-vision readers | 18 pixels, never below 16; lines kept to about 65 characters |
| Numbers in admin tables only | IBM Plex Mono | 14 pixels |

All three are free, open-licence typefaces.

## Space, shape and layout

- Spacing follows steps of 4 pixels (4, 8, 12, 16, 24, 32, 48, 64, 96), so gaps look related rather than improvised.
- Corners: slightly rounded boxes you type into, softer cards, fully rounded buttons.
- Pages are at most 1120 pixels wide on a 12-column grid. Side margins are 16 pixels on a phone and 80 on a laptop.
- Three layouts, as the brief sets out: one column under 640 pixels wide, two where it helps up to 1024, and the split list-and-map view above that.
- Everything you tap is at least 44 pixels tall. Typing boxes use 17-pixel text so phones do not zoom in.

## The pages

| Page | What it does | Follows the wireframe? |
| --- | --- | --- |
| Home | Mission sentence, then the group search, then "What is Estuary?" and "Sign Up"; a photo panel beside it; three plain facts about what happens in a group; a space for future quotes and partner logos; an invitation to lead | Yes, except the search moves to the top — see P13 |
| What is Estuary? | The two passages from the wireframe with photos, five common questions that open and close, the leader training manual to download, two videos | Yes. The questions are drafted; the answers are left for leadership |
| Sign Up | Why join; why lead; the group finder with list and map, and the "nothing nearby yet" version | Yes. The finder follows the brief's search design (S2, S3) |
| Conferences | Partnership invitation, apply button, upcoming conferences | Yes. Not in the current function list — see P11 |
| Contact | Choose a topic, then name, email and message; a thank-you in place of the form | Yes. Not in the function list — see P11 |
| Donate | Choose an amount, monthly or once, and how to pay; card details are typed on the payment company's own page, never on ours | Changed: see below and P11 |
| Log In | A preview of the signed-in area: your group, training progress, messages, ELSNet meeting link. A leader also sees "Is your listing still right?" and their participants | Yes, marked as a preview of the App releases |

Two things the brief asks for that the wireframe does not draw yet: **a page for each group** (S4), where the private contact form lives, and the **"report a problem" link** (S18). For now "Contact this group" in the finder goes to the general Contact page. Both are next.

## Where this departs from the wireframe, and why

1. **Search comes first on the home page.** The wireframe opens with a scrolling strip of photos. The brief's first principle is to answer "is there one near me" before explaining anything, and it rules out carousels. The proposal keeps the photos in a panel beside the search, and they only change when the visitor presses the arrows. Recorded as [P13](../decisions/open-questions.md#p13-what-leads-the-home-page--blocking-for-static-mvp-build).
2. **Donations hand off to a payment company.** The wireframe draws a card-number form on the page. A site with no sign-in and no server should never handle card numbers. The page gathers the choice and passes the visitor to the payment company's own secure page. Recorded as part of [P11](../decisions/open-questions.md#p11-which-of-the-wireframes-extra-pages-are-in-the-static-mvp--blocking-for-static-mvp-build).
3. **Navigation keeps the wireframe's seven items for now.** The brief proposes four destinations plus an account menu. The example follows the wireframe so the community can compare. Recorded as [P12](../decisions/open-questions.md#p12-seven-menu-items-or-four--blocking-for-static-mvp-build).

## Promises the design keeps

- **No email address or phone number appears anywhere.** Every "contact" button leads to a form; the message is passed on privately.
- **Nothing is only on the map.** Every group on the map is also in the list, with its distance.
- **Colour is never the only signal.** In person, online and hybrid each have their own shape; errors have a symbol and words.
- **The essentials work without the interactive parts.** Every page reads in full, the common questions still open and close, and the group list is complete. Only the map toggle, the account tabs and the thank-you messages need them.
- **English and German** are offered in the footer from the start, even though only English is written.

## Not done yet

- The dark theme. The brief asks for contrast checked in both themes before the Static MVP build.
- A page for each group (S4) and "report a problem" (S18).
- Real photos, video, partner logos and the placeholder wording in brackets.
- A check with people who use screen readers. The example was built to the standard but has only been checked automatically.
