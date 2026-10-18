# Estuary Hub — Design System

Oct 18, 2026 · Approved for the wireframe redraw, 18 Oct 2026 · Builds on the [Visual Design Proposal](../docs/product/visual-design-proposal.md) and the [Interface Design Brief](../docs/product/interface-design-brief.md)

## Related Records

- [Interface Design Brief](../docs/product/interface-design-brief.md): the principles, audiences and component inventory this system serves
- [Visual Design Proposal](../docs/product/visual-design-proposal.md): the first pass at colour and type, which this draft revises
- [Design tokens](tokens/tokens.css): the values as code, updated to match this page on 18 Oct 2026
- [Open Questions](../docs/decisions/open-questions.md): P11–P13 cover page scope, navigation and the home page; this draft does not reopen them

## What this is

This is the visual language for the rebuilt site: brand, colour, type, imagery, components and how they behave. We redraw the wireframes page by page against it, so every page uses the same parts.

It starts from what estuaryhub.com looks like today (audited 18 Oct 2026), keeps what people already recognise, and fixes what fails modern accessibility and usability standards. Where it departs from the earlier Visual Design Proposal or the Brief, it says so and asks for a decision in [Decisions this draft asks for](#decisions-this-draft-asks-for).

The five decisions below were approved on 18 Oct 2026. They still need recording in the decision register; see [After review](#after-review).

## The current site, audited

Measured from the rendered pages at desktop (1440 px) and phone (375 px) widths.

### Brand assets

- **Logo.** A wordmark, "Estuary Hub", in deep navy. The "s" is drawn as a winding river channel filled with olive green, ending in a navy tail that carries a small white crayfish. A white version for dark backgrounds is also in use. Both exist online only as raster images (a 1485 × 364 JPG and a 1496 × 355 PNG); no vector original was found.
- **Tagline.** "A place for meaningful converZations", with a deliberate capital Z. "ConverZations" also heads the video section.
- **Logo colours**, sampled from the file: navy **#012D4B** and olive **#7F991D**.

### Colour in use

| Colour | Where | Note |
| --- | --- | --- |
| Olive #859A23 | All four home-page buttons | White text on it measures **3.16 : 1**, which fails the 4.5 : 1 standard for text this size |
| Navy #0B2F5B | The "find local Estuaries" button | White on it 13.4 : 1, passes |
| Forest green #2C5F42 | Behind the home-page slideshow | Rarely seen; the photos cover it |
| Pale blue-grey #DCE6EC | The long welcome text panel | — |
| Warm beige #EDE9DE | Title band on inner pages | — |
| Light grey #E8E6E6 | Directory listing cards | — |
| Indigo #2B337B | "Log In" link only | A fifth blue, unrelated to the logo navy |
| Pure black #000000 | Almost all body text | — |
| Pale lilac #E5EBFA | The "Submit" button on forms | Form-builder default, off-brand |

The site uses about nine unrelated colours. Only two of them, navy and olive, come from the logo.

### Type in use

| Typeface | Where | Size |
| --- | --- | --- |
| Avenir Light | Body, navigation, forms | 18 px body, 14 px labels; a thin weight that is hard to read for older eyes |
| Caudex (serif) | Page titles, section headings | 60 px inner page titles, 34 px sections |
| Playfair Display (serif) | Button labels, letter-spaced, with a drop shadow | 18 px |
| An uploaded display face | Tagline over the hero, with an outline to stay legible on photos | 30 px |
| A typewriter-style face | The leader directory cards | — |

That's five typefaces. Headings in a bookish serif with a humanist sans for body is a sound pairing to keep. The thin body weight, the letter-spaced serif buttons and the typewriter cards are not.

### Imagery in use

- **Home hero:** a full-width slideshow of estuary landscapes, including blurred reeds, an aerial view of winding marsh channels, and dune grass at the shoreline. The logo, tagline and four buttons sit on top with outlines and shadows so they stay readable.
- **Inner pages:** almost no images. One stock photo (cupped hands holding a flower) on the About page.
- **Video:** two embedded videos, "The Estuary Protocol Explained" and "What is an Estuary Meeting Like?". Their thumbnails show the founders talking and a group on a shoreline.
- **No people in conversation** appear anywhere, except in the video thumbnails.

### Layout and components

- **Header:** logo left; "Log In" with a person icon; four menu items ("Home", "More Info", "Get Involved", "Find Site Members"), two of which open drop-downs of six and five links.
- **Home:** slideshow hero with four equal buttons, then a long single text panel, then the two videos, then a one-line footer ("© 2025 Estuary").
- **Inner pages:** a beige title band with a centred serif title, then content in a narrow centred column.
- **Directory:** 54 identical grey cards in one long alphabetical page, about 20,000 px tall, each showing a leader's contact details in plain text.
- **Forms:** square boxes with grey 2 px borders, placeholder text used as instructions ("Add your Name"), grey 14 px labels, a pale lilac rounded "SUBMIT".
- **Buttons:** square, olive, with a white double border.
- **Members area:** Facilitator Program, Mentor Program, Training Manual, ELSNet sign-up and Add an Estuary all open a sign-up wall first. This audit did not go past it.

### What works, and what doesn't

**Keep:**
- The logo, navy and olive. They're recognisable, they belong to the community, and they carry the estuary idea better than anything invented.
- The pairing of a serif for headings with a sans for reading.
- Landscape photography as an atmosphere for the brand.
- The two explainer videos.
- The playful "converZations" in the tagline.

**Fix:**
- **Failing contrast:** white on olive buttons.
- **Text placed over busy photos**, which only stays readable thanks to outlines and shadows.
- **Thin body type.** Avenir Light at 14–18 px is hard going for the older audience the Brief describes.
- **Placeholder text standing in for labels.** It disappears as soon as someone starts typing.
- **Truncated buttons on phones** ("Sign up to be a …", "Find an Estuary Ne…").
- **On phones, the logo appears twice in the first screen**, with an empty gap between.
- **Too many unrelated colours and typefaces.**
- **Contact details published in plain text** on the directory and leader pages. The rebuild's [contact-relay promise](../docs/product/visual-design-proposal.md#promises-the-design-keeps) removes this.
- **The directory is one 20,000-pixel page** with no search, filter or map. Closing this gap is the rebuild's main job.

## The look in one paragraph

An estuary is where a fresh river meets the salt sea. The logo already says this: a green river channel winding into deep navy water. The rebuilt site takes its colours straight from there. **Navy** is the deep water: text, the header, the footer and every main action. **Reed green**, the logo's olive, is the fresh water and the living edge: held back for welcome, for highlights and for the logo itself. Pages sit on a cool, very pale blue-white with plenty of space, so a site about conversation never feels crowded. Headings use a warm, bookish serif and body text uses a typeface drawn for low-vision readers. Photography shows the estuary as atmosphere and, as soon as the community can provide them, real groups in conversation.

## Decisions this draft asks for

Each has a recommended default. Once decided they move to [Open Questions](../docs/decisions/open-questions.md) as P14 onward, then into the register.

1. **Keep the existing logo.** *Recommended: yes.* The prototype's placeholder mark (two overlapping circles) is dropped. Ask leadership for the original vector file; failing that, have the wordmark redrawn as a vector without changing it.
2. **Take the palette from the logo (navy and reed green) instead of the proposal's teal and silt.** *Recommended: yes.* It keeps continuity with what the community already knows and serves the Brief's "two things meeting" idea through an existing asset rather than a new one. Every value below passes the Brief's contrast standard in both themes. This replaces the colour section of the Visual Design Proposal and the colour values in the tokens file.
3. **Allow estuary landscape photography as background atmosphere.** *Recommended: yes, as a secondary image type only.* The Brief says "no river photography". The current site depends on it, and it's the cheapest imagery the project owns. The compromise: landscapes never sit behind text, and never stand in for photos of people. See [Imagery](#imagery).
4. **Keep the type pairing from the proposal (Newsreader and Atkinson Hyperlegible).** *Recommended: yes.* It keeps the current site's serif-plus-sans structure while fixing legibility. Caudex has only two weights and no optical sizing, and Avenir is a paid licence.
5. **Keep "converZations" in the tagline only.** *Recommended: yes.* It's a brand signature, but in headings and buttons it reads as a typo and trips screen readers.

## Brand

### Logo

| Rule | Value |
| --- | --- |
| Versions | Full colour (navy and reed green) on light backgrounds; reversed (white and reed green) on navy or photos |
| Clear space | The height of the crayfish tail on every side |
| Minimum width | 120 px on screen; below that, use the symbol |
| Symbol | The river "s" with the crayfish, cropped from the wordmark, for the browser tab icon and small spaces. To be confirmed with leadership |
| Header size | 40 px tall on a phone, 48 px from 1024 px wide |
| Don't | Recolour it, add a shadow or outline, place it on a busy photo, or show it twice on one screen |

### Tagline

"A place for meaningful converZations." It appears once: on the home page beneath the main heading, or in the footer. It is set in the heading serif and marked up so screen readers read "conversations".

## Colour

All ratios use the WCAG 2.1 method, measured against the background named. Text needs 4.5 : 1; large text, outlines and controls need 3 : 1.

### Light theme (default)

| Name | Value | Used for | Contrast |
| --- | --- | --- | --- |
| Ground | #F5F8FA | Page background | Ink on it 15.1 : 1 |
| Surface | #FFFFFF | Cards, header, form fields | Ink on it 16.1 : 1 |
| Mist | #E4EDF2 | Alternate section bands, selected rows, hover fills | Navy on it 12.0 : 1 |
| Line | #CBD8E0 | Dividers, card edges | Decorative only |
| Field edge | #7D8F9C | Outlines of boxes you type into | 3.3 : 1 on white |
| Ink | #0E2236 | Body text | 16.1 : 1 on white |
| Ink muted | #4B5E6E | Secondary text, help text | 6.7 : 1 on white |
| **Estuary navy** | **#012D4B** | Headings, main buttons, header, footer, focus ring. The logo navy | 14.2 : 1 on white; white on it 14.2 : 1 |
| Navy hover | #0A3D63 | Main buttons when hovered | White on it 11.3 : 1 |
| Navy pressed | #00213A | Main buttons when pressed | White on it 16.4 : 1 |
| Channel blue | #1D5A85 | Links in running text (always underlined) | 7.4 : 1 on white |
| **Reed green** | **#7F991D** | Logo, decorative rules, map pins, illustration. The logo olive | 3.2 : 1. **Never text, never a button fill behind text** |
| Reed deep | #4E5F12 | Small warm labels above headings; the "welcome" button | 7.1 : 1 on white; white on it 7.1 : 1 |
| Reed mist | #EEF2DA | Welcome bands, the "nothing nearby yet" invitation | Ink on it 14.1 : 1 |
| Success | #2E6B45 | Status only, always with a word or symbol | 6.4 : 1 on white |
| Warning | #8A5A00 | Status only | 5.9 : 1 on white |
| Danger | #A4281F | Errors only | 7.2 : 1 on white |

### Dark theme

The Brief requires both themes to be checked before the Static MVP build.

| Name | Value | Used for | Contrast |
| --- | --- | --- | --- |
| Ground | #081C2C | Page background | Ink on it 14.8 : 1 |
| Surface | #0F2A3F | Cards, header | Ink on it 12.6 : 1 |
| Raised | #163651 | Menus, hover fills | Ink on it 10.6 : 1 |
| Line | #2A4A62 | Dividers | Decorative only |
| Field edge | #6F8BA0 | Input outlines | 4.1 : 1 on surface |
| Ink | #E6EEF3 | Body text | — |
| Ink muted | #A6B8C6 | Secondary text | 7.2 : 1 on surface |
| Link | #8CC4E8 | Links | 7.9 : 1 on surface |
| Primary | #B5CC55 | Main buttons (with ground-coloured text), focus ring | Text on it 9.7 : 1 |
| Reed mist | #25331A | Welcome bands | Ink on it 11.4 : 1 |
| Success, warning, danger | #7FC79A, #E2B35C, #F08A80 | Status only | 7.4, 7.6 and 6.1 : 1 on surface |

### Rules

- **One main action per view, in navy.** Secondary actions are outlined in navy; tertiary actions are plain underlined links.
- **Reed green is a highlight, not a workhorse.** At most one reed element per screen besides the logo: a welcome band, a map pin, a rule under a heading.
- **Status colours never double as brand colours.** Success green and reed green don't appear side by side without a label.
- **Colour is never the only signal.** Every status has a word or symbol.
- **No pure black and no pure white text on photos.**

## Type

| Role | Typeface | Size and weight | Line height |
| --- | --- | --- | --- |
| Display (home heading only) | Newsreader | 56 px laptop / 36 px phone, 500 | 1.1 |
| Heading 2 | Newsreader | 36 / 28 px, 500 | 1.2 |
| Heading 3 | Newsreader | 24 / 22 px, 600 | 1.3 |
| Eyebrow (small label above a heading) | Atkinson Hyperlegible | 14 px, 700, capitals, 0.08 em spacing, reed deep | 1.4 |
| Lede (first paragraph) | Atkinson Hyperlegible | 20 px, 400 | 1.6 |
| Body | Atkinson Hyperlegible | 18 px, 400; never below 16 | 1.6 |
| Small, help text | Atkinson Hyperlegible | 15 px, 400 | 1.5 |
| Buttons, labels | Atkinson Hyperlegible | 17 px, 700, sentence case, no letter-spacing | 1.2 |
| Data (admin tables only) | IBM Plex Mono | 14 px | 1.5 |

- Lines of running text stay near 65 characters.
- Headings are sentence case. No capitals for whole buttons or headings, and no letter-spaced serif.
- One typeface per role. No other faces, including inside embedded forms.

## Space, shape and layout

These are unchanged from the [Visual Design Proposal](../docs/product/visual-design-proposal.md#space-shape-and-layout): 4 px spacing steps, a 1120 px maximum width on 12 columns, 16 px phone margins, three layouts (under 640, 640–1024, above 1024 px), and 44 px minimum touch targets.

Shape:

| Element | Corner radius |
| --- | --- |
| Boxes you type into | 10 px |
| Cards | 16 px |
| Large panels, images | 24 px |
| Buttons, badges, pills | Fully rounded |

Elevation is used sparingly: one soft shadow (0 8 px 24 px at 8 % navy) for menus, dialogs and the floating map card. Cards sit flat on the ground with a line-coloured edge.

## Imagery

### Photography: two kinds, in this order

1. **People in conversation (lead).** Small groups seated in a circle, listening, mid-sentence. Real Estuary groups, photographed with written consent; faces may be soft or turned away for anyone who prefers it. This follows the Brief's "show the room before the invitation". Until real photos exist, use a plain reed mist panel with a short caption. Don't use stock photos of strangers pretending to be a group.
2. **Estuary landscapes (atmosphere).** Marsh channels from above, reeds, shorelines where river meets sea: the kind of photos the current site already owns. Used only:
   - as a full-bleed band *between* sections, with no text on it, or
   - beside text in a rounded 24 px frame, never behind it.

**Treatment:** natural colour, slightly cool, with no heavy filters. On the home page a landscape may carry a navy wash (navy at 70 %) behind the hero heading. That's the one place text sits on a photo, and the wash keeps it above 7 : 1.

**Retire:** the auto-advancing slideshow (the Brief rules out carousels), blurred motion shots, outlined or shadowed text on photos, and generic stock such as the hands holding a flower.

**Every image** has written alternative text that describes what matters ("Eight people talking in a circle of chairs in a library"), or is marked decorative.

**Sources:** the community's own photos first. Record consent for every identifiable person. Don't commit photos of real people to this public repository; they live with the content, not the code.

### Video

Keep the two explainer videos. Show them as cards: a thumbnail with a play symbol, a title, and the length in minutes. Captions are required. Videos never autoplay.

### Icons

One open-licence line icon set throughout: 1.5 px stroke, rounded ends, 20 px in text and 24 px on their own. Icons always sit next to a word, except the close (×) and menu (≡) controls, which carry hidden labels. Format badges use distinct shapes: a filled circle for in person, a ring for online, a half-filled circle for hybrid.

### Illustration and pattern

Optional, and only from the logo's own vocabulary: a single winding channel line in reed green can underline a heading or divide sections. No waves, no water droplets, no clip art.

### Maps

Muted base map (greys and pale blue), so pins carry the colour. Pins are reed green with a navy outline, and the selected pin is navy. Clusters show a count in a navy circle. Every pin is also in the list ([Brief: Accessibility](../docs/product/interface-design-brief.md#accessibility)).

## Components

The Brief's [component inventory](../docs/product/interface-design-brief.md#component-inventory) lists what the product needs. This section gives each one its look and states. Every component is drawn in every state, not only the default.

### Header and navigation

- White surface, 1 px line at the bottom, 72 px tall on a laptop and 64 px on a phone. Logo on the left.
- Menu items in Atkinson 17 px navy. The current page is marked with a 3 px reed green underline and its name is announced to screen readers. Colour is not the only signal.
- One navy button at the right for the main action ("Find a group").
- "Log in" is a plain link to its left, with a person icon.
- Phone: logo plus a "Menu" button that opens a full-height panel. Items are 56 px tall, and the main action sits at the top.
- The number of items is open in [P12](../docs/decisions/open-questions.md#p12-seven-menu-items-or-four--blocking-for-static-mvp-build). The component works for four or seven.

### Footer

- Navy background with reversed logo.
- Columns: Find a group, Learn, Get involved, About.
- Language switch (English, Deutsch), the line "Estuary is a 501(c)(3) nonprofit", and a link to report a problem.
- Text #C9DCEA (10.1 : 1 on navy); links underlined.

### Buttons

| Kind | Look | Use |
| --- | --- | --- |
| Primary | Navy fill, white text, fully rounded, 48 px tall, 24 px side padding | The one main action per view |
| Secondary | White fill, 2 px navy outline, navy text | Alternatives ("Learn more") |
| Welcome | Reed deep fill, white text | Only for "Start a group" and the empty-state invitation |
| Quiet | Navy underlined text, no box | Tertiary actions, "Cancel" |
| Danger | Danger fill, white text | Irreversible actions, always with a confirmation |

States: hover darkens one step. Pressed darkens two. Focus shows a 3 px navy ring with a 2 px gap (reed green on dark). Disabled is avoided: keep the button and explain what's missing. Loading keeps the label and adds a spinner.

Labels say what happens ("Send your message"), with no full capitals and no exclamation marks. On phones, buttons go full width and never truncate; long labels wrap to two lines.

### Links

Channel blue, always underlined in running text, 2 px offset. Visited links keep the same colour. External links show a small arrow icon and the destination name.

### Form fields

- The label sits above the box: 17 px bold ink. Help text sits below the label in ink muted 15 px.
- Box: white, 1.5 px field-edge outline, 10 px radius, 48 px tall, 17 px text, so phones don't zoom in.
- Placeholder text is only an example ("e.g. Holland, MI"), never the instruction.
- Focus: 2 px navy outline plus the focus ring.
- Error: danger outline, an error symbol and a message under the box saying how to fix it. The form keeps everything typed.
- Required fields are marked "(required)" in words; optional fields are marked "(optional)" when that's rarer.
- Checkboxes and radios are 24 px with the whole label clickable. Selects use the same box as text fields with a chevron.

### Location search (the hero component)

- One wide field ("Town, city or postcode") with a "Use my location" link and a radius choice (25 / 50 / 100 miles, or km where local).
- Results update as you type; there is no "Search" button, per the Brief.
- On the home page it sits on a white panel over the navy-washed hero. Elsewhere it sits at the top of the results.

### Group card

- White surface, 16 px radius, 1 px line edge, 24 px padding.
- Contents: group name (Newsreader 22 px), then distance in bold ("12 miles away"), when it meets, a format badge, and a one-line location (town only).
- One action: "View group".
- Hover lifts the edge to navy. Selected (synced with the map) uses a mist fill and navy edge.
- **No email address or phone number, ever.**

### Format badge and status pill

Fully rounded, 28 px tall, 14 px bold text with a shape icon.

- **Format:** In person, Online, Hybrid. Mist fill with navy text.
- **Status (application only):** Draft, Pending, Published, Paused. Each uses its own status colour on a pale fill, with a word.

### Page header

Replaces the beige title band:

- Ground background.
- Eyebrow in reed deep, then an H1 in Newsreader, then an optional lede.
- Left-aligned on laptops to match the reading column; centred only on the home page.

### Section band

Full-width bands alternate ground and mist backgrounds to separate sections without lines. One reed mist band per page at most, for the welcome or "start a group" invitation.

### Empty state

- Reed mist panel with a short heading and the nearest real option and its distance.
- Up to two actions, one of them the welcome button.
- It's the Brief's [second most important screen](../docs/product/interface-design-brief.md#3-empty-results--the-second-most-important-screen), so it gets this drawn component, not a line of grey text.

### Common questions (accordion)

- Each question is a full-width button row: Newsreader 20 px, with a plus that turns into a minus.
- Answers are in body type. Several can be open at once.
- Without scripting, all answers show.

### Tabs (members area)

- Underlined tabs, not grey boxes: ink muted text, with the active tab in navy plus a 3 px reed green underline.
- On phones they become a horizontal scroller with the active tab kept in view.

### Notices and messages

- **Inline notice:** pale status fill, a status-coloured edge on the left, symbol plus words.
- **Confirmation after a form:** replaces the form in place, in the past tense ("Sent. A leader will reply to you directly").
- **No pop-ups,** except confirmations for irreversible actions.

### Video card

- Rounded 24 px thumbnail, a navy play circle, and the title and length below.
- Opens in place with captions on.

### Contact relay form

- Name, email and message, and a line saying who receives it and that your email stays private until they reply.
- Shows the limit on how many messages can be sent, plainly, before anyone hits it.

## Motion and interaction

- Transitions are 150–200 ms, ease-out, and limited to colour, shadow and opacity. Nothing slides or bounces.
- Nothing moves on its own: no auto-advancing slideshows, no autoplay video.
- Everything respects the reduced-motion setting.
- Every action works by keyboard, in visual order, with the focus ring always visible.

## Applying this to the wireframes

The community wireframe now lives in the shared design file, one page per screen (Home, What is Estuary?, Sign Up, Conferences, Contact, Donate, Log In/Members). Once this draft is approved, the redraw goes in this order:

1. **Set up the library:** the colours, type styles and components above, built once in the design file and named as here.
2. **Redraw page by page:** Home first, since it holds the location search and the empty state, then Sign Up, What is Estuary?, Contact, Conferences, Donate, Log In/Members. Each page gets a phone (375 px) and laptop (1440 px) version, with its states (empty, error, long content) drawn alongside.
3. **Keep the wireframe's content,** apply the [departures already proposed](../docs/product/visual-design-proposal.md#where-this-departs-from-the-wireframe-and-why) (search first, payment hand-off, navigation per P12), and mark anything new for review.

## After review

When the decisions above are settled:

- Record them in [Open Questions](../docs/decisions/open-questions.md) and the decision register, as the [decision process](../docs/decisions/README.md) describes.
- ~~Update `tokens/tokens.css` and `tokens/tokens.json` to the values here, together.~~ Done 18 Oct 2026. The dark values are recorded but not yet switched on, because the prototype still assumes white text on primary buttons.
- Replace the colour section of the Visual Design Proposal with a link to this page, so each value has one home.
- Update the clickable prototype to match.

## Not done yet

- **The logo as a vector,** and confirmation that the river-and-crayfish symbol can stand alone.
- **Real photographs of groups,** with consent.
- **A screen-reader check** of the components once drawn.
- **The members-only pages,** which were behind the sign-up wall. Their content should come from leadership, not be guessed.
