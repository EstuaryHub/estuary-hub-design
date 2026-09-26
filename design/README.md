# Design

Visual design for the public site: the community's wireframe, the design values, and a clickable example built from them. This is design work, not the application. The plain-language write-up of the proposal is the [Visual Design Proposal](../docs/product/visual-design-proposal.md).

| Path | What it is |
| --- | --- |
| `Estuarywebsite_wireframe.pdf` | The community's black-and-white wireframe: seven pages, no colour or type |
| `tokens/tokens.css` | Colour, type, spacing, radius and layout values as CSS custom properties. The source of truth |
| `tokens/tokens.json` | The same values as JSON for tools. Change both files together |
| `prototype/` | Clickable example of all seven pages plus `foundations.html` (the style guide), in plain HTML, CSS and JavaScript |

## Viewing the prototype

No build step. Either open `prototype/index.html` in a browser, or serve the folder so links behave like a real site:

```sh
cd design
python3 -m http.server 8000
# then open http://localhost:8000/prototype/
```

Serve from `design/`, not `design/prototype/`, because the pages load `../tokens/tokens.css`.

Views the pages don't reach by clicking:

- `prototype/sign-up.html?results=none#find` shows the "nothing nearby yet" results
- `prototype/account.html?role=participant` shows the signed-in area as a participant; the default is a group leader

## How the prototype is put together

- One stylesheet (`prototype/assets/site.css`), which uses only the token values, and one small script (`prototype/assets/site.js`), with no dependencies.
- The header and footer are repeated in each page. Keep them identical when editing.
- Fonts load from Google Fonts. Self-host them before this becomes the real site.
- All names, groups, dates and conferences are placeholders in [square brackets]. There is no real data here and there must not be; see the repo rules in the [README](../README.md#ground-rules).
- Every page has `noindex`, so it won't be listed by search engines if it is published for review.

## Not done yet

- The dark theme, which the [brief](../docs/product/interface-design-brief.md#deliverables-and-phases) requires before the Static MVP build
- A page for each group (S4), with the private contact form, and "report a problem" (S18)
- Interface wording moved out into a strings file, which the repo conventions require from the first real commit. The prototype has its wording inline
- Hosting configuration for Azure Static Web Apps
