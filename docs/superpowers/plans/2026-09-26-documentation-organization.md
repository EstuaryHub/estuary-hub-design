# Documentation Organization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize the design repository into a decision-first documentation set for board members and contributors.

**Architecture:** Retain the four detailed numbered records as the authoritative documents under `docs/`. Use the root README as the short navigation surface, then add a decision register and delivery checklist so decision status and operational accountability do not duplicate technical rationale.

**Tech Stack:** Markdown, Git, Bash, ripgrep, pnpm.

**Spec:** [Documentation Organization Design](../specs/2026-09-26-documentation-organization-design.md)

## Global Constraints

- Preserve all substantive recommendations and external source links.
- Do not change application scope, architecture, design recommendations, or platform choices.
- Do not add production contact information.
- Do not restore or modify the user-managed deletion of `HANDOFF.md`.
- Keep the README navigational, never a second technical design or an open-question backlog copy.
- Keep detailed rationale in its owning record; the decision register records outcomes and links.
- Every delivery-checklist row needs a deadline, named owner, status, and evidence.

## Review Focus

- Board readers can find the four critical-path blockers and their detailed authority from the README.
- Every README link follows the moved document paths, with no stale root-level record path.
- Future resolved decisions can be added without copying rationale or deleting question context.
- A checklist row cannot claim completion without owner and evidence.
- `HANDOFF.md` remains an unstaged user deletion throughout the documentation commits.

---

## File Structure

| Path                                   | Responsibility                                                             |
| -------------------------------------- | -------------------------------------------------------------------------- |
| `README.md`                            | Decision-first entry point, status, reading paths, and authoritative links |
| `docs/01-application-design.md`        | Product, data, module, API, and quality design                             |
| `docs/02-interface-design-brief.md`    | Experience, accessibility, and visual-design brief                         |
| `docs/03-azure-platform-costs.md`      | Hosting, cost, and operations design                                       |
| `docs/04-open-questions.md`            | Live decision backlog and pending-question context                         |
| `docs/decisions/README.md`             | Resolved and externally reviewed decision register                         |
| `docs/decisions/delivery-checklist.md` | Evidence-backed phase and launch prerequisites                             |

### Task 1: Move The Authoritative Design Records

**Files:**
- Move: `01-application-design.md` to `docs/01-application-design.md`
- Move: `02-interface-design-brief.md` to `docs/02-interface-design-brief.md`
- Move: `03-azure-platform-and-costs.md` to `docs/03-azure-platform-costs.md`
- Move: `04-open-questions.md` to `docs/04-open-questions.md`

**Interfaces:**
- Consumes: Four root-level design records.
- Produces: Stable record paths used by all navigational documents.

- [ ] **Step 1: Confirm the pre-move layout**

Run: `rg --files -g '*.md' | sort`

Expected: The four numbered records are at the repository root; no target paths exist under `docs/`.

- [ ] **Step 2: Rename the records through Git**

Run: `mkdir -p docs && git mv 01-application-design.md docs/01-application-design.md && git mv 02-interface-design-brief.md docs/02-interface-design-brief.md && git mv 03-azure-platform-and-costs.md docs/03-azure-platform-costs.md && git mv 04-open-questions.md docs/04-open-questions.md`

Expected: Git shows four renames and preserves their contents.

- [ ] **Step 3: Verify titles after the moves**

Run: `for file in docs/01-application-design.md docs/02-interface-design-brief.md docs/03-azure-platform-costs.md docs/04-open-questions.md; do test -f "$file" && head -n 1 "$file"; done`

Expected: Each target exists and retains its existing title.

- [ ] **Step 4: Commit the moves**

Run: `git add docs/01-application-design.md docs/02-interface-design-brief.md docs/03-azure-platform-costs.md docs/04-open-questions.md && git commit -m "docs: move design records under docs"`

Expected: The commit contains only four document renames.

### Task 2: Build The Decision-First Entry Point

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: Task 1 paths.
- Produces: Board and contributor reading paths.

- [ ] **Step 1: Write and run the failing acceptance check**

Run: `rg -n '^## (Purpose|Current Status|Critical Path|Reading Paths|Design Records)$|maintainer|two named owners|licence|Blog, Groups, and Chat' README.md`

Expected: FAIL because the placeholder README lacks required headings and blocker text.

- [ ] **Step 2: Replace the placeholder with this README structure**

```markdown
# Estuary Hub Design

## Purpose

Estuary Hub is a sanctioned, nonprofit-backed, open-source rebuild of estuaryhub.com. The core release makes the group directory searchable, gives listings verified ownership, replaces public contact details with a relay, tracks ELSNet intake, and provides modest administration.

## Current Status

The design is ready for organizational and technical decisions. Implementation must not begin until the critical-path decisions below are resolved.

## Critical Path

1. Name the maintainer who will own the service after launch.
2. Place the GitHub organization and Azure subscription under nonprofit ownership, with two named owners for each.
3. Choose and review the repository licence.
4. Confirm whether the current Wix Blog, Groups, and Chat applications are in use.

The rationale, recommended defaults, and owners are in [Open Questions](docs/04-open-questions.md#the-critical-path).

## Reading Paths

**Board:** Read [Open Questions](docs/04-open-questions.md), then the [Decision Register](docs/decisions/README.md) and [Delivery Checklist](docs/decisions/delivery-checklist.md).

**Contributors:** Read [Application Design](docs/01-application-design.md), [Azure Platform and Costs](docs/03-azure-platform-costs.md), and [Interface Design Brief](docs/02-interface-design-brief.md), then check [Open Questions](docs/04-open-questions.md) for unresolved constraints.

## Design Records

- [Application Design](docs/01-application-design.md): product scope, data model, modules, API, and quality requirements.
- [Interface Design Brief](docs/02-interface-design-brief.md): experience, accessibility, information architecture, and design handoff.
- [Azure Platform and Costs](docs/03-azure-platform-costs.md): hosting, costs, verified platform facts, and operational guardrails.
- [Open Questions](docs/04-open-questions.md): live decision backlog, recommended defaults, fact finding, and needed external advice.
- [Decision Register](docs/decisions/README.md): resolved decisions and their evidence.
- [Delivery Checklist](docs/decisions/delivery-checklist.md): accountable prerequisites for build and launch.
```

- [ ] **Step 3: Verify the entry point passes**

Run: `rg -n '^## (Purpose|Current Status|Critical Path|Reading Paths|Design Records)$|maintainer|two named owners|licence|Blog, Groups, and Chat' README.md`

Expected: Every heading and all four concerns are present.

- [ ] **Step 4: Commit the README**

Run: `git add README.md && git commit -m "docs: add decision-first repository entry point"`

Expected: The commit changes only `README.md`.

### Task 3: Add The Decision Register And Delivery Checklist

**Files:**
- Create: `docs/decisions/README.md`
- Create: `docs/decisions/delivery-checklist.md`

**Interfaces:**
- Consumes: `docs/04-open-questions.md` and the detailed records from Task 1.
- Produces: A concise decision register and evidence-backed prerequisite checklist.

- [ ] **Step 1: Write and run the failing accountability check**

Run: `test -f docs/decisions/README.md && test -f docs/decisions/delivery-checklist.md`

Expected: FAIL because neither accountability document exists.

- [ ] **Step 2: Create the decision register**

Create `docs/decisions/README.md` with a heading, a link to `../04-open-questions.md`, a short rule that resolved questions retain their original context, and these two tables:

```markdown
| ID  | Outcome | Owner | Date | Evidence | Source |
| --- | ------- | ----- | ---- | -------- | ------ |

| ID  | Review Needed                                             | Owner | Status | Evidence | Source                                                                                                                                |
| --- | --------------------------------------------------------- | ----- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| X1  | Data-protection review for the international contact list | Board | Open   | —        | [Open Questions](../04-open-questions.md#x1-data-protection-for-the-international-contact-list--blocking-for-launch-not-for-building) |
| X2  | Accessibility-obligations review                          | Board | Open   | —        | [Open Questions](../04-open-questions.md#x2-accessibility-obligations--pre-launch)                                                    |
| X3  | Licence review                                            | Board | Open   | —        | [Open Questions](../04-open-questions.md#x3-licence-review--blocking)                                                                 |
```

- [ ] **Step 3: Create the delivery checklist**

Create `docs/decisions/delivery-checklist.md` with this table and sources:

```markdown
| Deadline       | Prerequisite                                                      | Owner              | Status | Evidence | Source                                                                        |
| -------------- | ----------------------------------------------------------------- | ------------------ | ------ | -------- | ----------------------------------------------------------------------------- |
| Before Phase 1 | Name a maintainer and backup maintainer                           | Board              | Open   | —        | [B3](../04-open-questions.md#b3-who-maintains-this-after-launch--blocking)    |
| Before Phase 1 | Set nonprofit ownership and two named owners for GitHub and Azure | Board              | Open   | —        | [B2](../04-open-questions.md#b2-who-owns-the-accounts--blocking)              |
| Before Phase 1 | Choose the licence and record qualified review                    | Board              | Open   | —        | [B1](../04-open-questions.md#b1-which-licence--blocking)                      |
| Before Phase 1 | Confirm whether Wix Blog, Groups, and Chat are in use             | Site administrator | Open   | —        | [F2](../04-open-questions.md#facts-somebody-needs-to-go-and-find)             |
| Phase 0        | Record Azure grant activation and renewal owner                   | Board              | Open   | —        | [Platform budget](../03-azure-platform-costs.md#the-budget)                   |
| Phase 1        | Configure budget alerts and log-ingestion cap                     | Development team   | Open   | —        | [Budget guardrails](../03-azure-platform-costs.md#budget-guardrails)          |
| Phase 1        | Automate non-production database shutdown                         | Development team   | Open   | —        | [Budget guardrails](../03-azure-platform-costs.md#budget-guardrails)          |
| Before launch  | Confirm domain registrar and DNS control                          | Board              | Open   | —        | [F6](../04-open-questions.md#facts-somebody-needs-to-go-and-find)             |
| Before launch  | Rehearse a backup restore                                         | Development team   | Open   | —        | [Application design](../01-application-design.md#non-functional-requirements) |
| Before launch  | Complete privacy, accessibility, and licence reviews              | Board              | Open   | —        | [External expertise](../04-open-questions.md#needs-outside-expertise)         |
```

- [ ] **Step 4: Verify the accountability contract**

Run: `rg -n '^\| ID \| Outcome \| Owner \| Date \| Evidence \| Source \|$|^\| Deadline \| Prerequisite \| Owner \| Status \| Evidence \| Source \|$|X[123]' docs/decisions/README.md docs/decisions/delivery-checklist.md`

Expected: Both schemas exist and all external-review items appear.

- [ ] **Step 5: Commit the accountability documents**

Run: `git add docs/decisions/README.md docs/decisions/delivery-checklist.md && git commit -m "docs: add decision register and delivery checklist"`

Expected: The commit contains only the two new documents.

### Task 4: Add Targeted Cross-Record Navigation

**Files:**
- Modify: `docs/01-application-design.md`
- Modify: `docs/02-interface-design-brief.md`
- Modify: `docs/03-azure-platform-costs.md`
- Modify: `docs/04-open-questions.md`

**Interfaces:**
- Consumes: Tasks 1 and 3.
- Produces: Navigation from detailed records to decision and accountability surfaces.

- [ ] **Step 1: Write and run the failing navigation check**

Run: `rg -n '^## Related Records$' docs/0*.md`

Expected: FAIL because no detailed record has a related-records section.

- [ ] **Step 2: Add the related-records blocks after each metadata paragraph**

Add this to the application, interface, and platform records:

```markdown
## Related Records

- [Open Questions](04-open-questions.md)
- [Decision Register](decisions/README.md)
```

Add this to the open-questions record:

```markdown
## Related Records

- [Decision Register](decisions/README.md)
- [Delivery Checklist](decisions/delivery-checklist.md)
```

Do not change existing recommendations, citations, or question wording.

- [ ] **Step 3: Verify the navigation passes**

Run: `rg -n '^## Related Records$|\[Open Questions\]\(04-open-questions\.md\)|\[Decision Register\]\(decisions/README\.md\)|\[Delivery Checklist\]\(decisions/delivery-checklist\.md\)' docs/0*.md`

Expected: Every record has one related-records section; detailed records link to the register; the backlog links to the checklist.

- [ ] **Step 4: Commit the navigation**

Run: `git add docs/01-application-design.md docs/02-interface-design-brief.md docs/03-azure-platform-costs.md docs/04-open-questions.md && git commit -m "docs: link design records to decisions"`

Expected: The commit changes only targeted navigation sections.

### Task 5: Validate The Complete Documentation Set

**Files:**
- Verify: `README.md`
- Verify: `docs/01-application-design.md`
- Verify: `docs/02-interface-design-brief.md`
- Verify: `docs/03-azure-platform-costs.md`
- Verify: `docs/04-open-questions.md`
- Verify: `docs/decisions/README.md`
- Verify: `docs/decisions/delivery-checklist.md`

**Interfaces:**
- Consumes: Tasks 1 through 4.
- Produces: Evidence that organization, consistency, and worktree scope meet the spec.

- [ ] **Step 1: Check repository-local Markdown targets and anchors**

Create a temporary checker configuration that ignores external URLs, then run the checker against every repository document:

```bash
config=$(mktemp)
printf '%s\n' '{"ignorePatterns":[{"pattern":"^https?://"}]}' > "$config"
for source in README.md $(rg --files docs -g '*.md'); do pnpm dlx markdown-link-check -q -c "$config" "$source"; done
rm "$config"
```

Expected: The command exits zero after resolving every repository-local relative link and heading anchor.

- [ ] **Step 2: Check critical-path consistency**

Run: `rg -n 'maintainer|two named owners|licence|Blog, Groups, and Chat' README.md docs/04-open-questions.md docs/decisions/delivery-checklist.md`

Expected: Each concern appears in the README, detailed backlog, and checklist.

- [ ] **Step 3: Check documentation quality**

Run: `! rg -n 'T(BD|ODO)' README.md docs --glob '*.md' && git diff --check HEAD`

Expected: No unfinished markers or whitespace errors are reported.

- [ ] **Step 4: Check protected worktree scope**

Run: `git status --short && ! git diff --name-only --cached | rg '^HANDOFF\.md$'`

Expected: `HANDOFF.md` remains a user-side deletion and is not staged.

- [ ] **Step 5: Confirm the final worktree state**

Run: `git status --short`

Expected: No uncommitted documentation changes remain. Do not stage or commit `HANDOFF.md`.