# Estuary Hub Documentation Organization Design

Sep 26, 2026 · Approved design for organizing the Estuary Hub design repository

## Purpose

Turn the existing working papers into a decision-first design repository that serves both board members and future contributors. The repository must make the project's current status, critical decisions, ownership, and authoritative technical rationale easy to find without duplicating the substantive design.

## Goals

- Give board members a concise entry point that identifies the decisions required before implementation can begin.
- Preserve the application, interface, platform, and open-question documents as the authoritative detailed design records.
- Record resolved decisions with a durable owner, date, evidence, and source links.
- Make operational prerequisites and launch responsibilities visible and accountable.
- Keep production data out of the repository.

## Non-goals

- Reconsider application scope, architecture, design recommendations, or platform choices.
- Replace the detailed documents with summaries.
- Turn the repository into an implementation plan or application scaffold.
- Restore or modify user-managed worktree changes, including the deleted `HANDOFF.md`.

## Information Architecture

```text
README.md
docs/
  01-application-design.md
  02-interface-design-brief.md
  03-azure-platform-costs.md
  04-open-questions.md
  decisions/
    README.md
    delivery-checklist.md
```

### Root README

The root README is the entry point. It must state:

- The rebuild's purpose and v1 scope.
- The current status: design is ready for decisions, not approved for implementation.
- The four critical-path blockers: named maintainer, nonprofit-owned accounts with two owners, licence choice, and confirmation of whether the Wix Blog, Groups, and Chat apps are in use.
- Recommended reading paths for board members and contributors.
- Links to the detailed records and the decision index.

It is a navigational summary only. It must not become a second source of technical design or a copy of the open-questions document.

### Design Records

The numbered documents are moved beneath `docs/` and retain their authority:

| Record                         | Owns                                                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `01-application-design.md`     | Product scope, workflows, data model, modules, public API, and non-functional requirements                   |
| `02-interface-design-brief.md` | User experience, information architecture, visual direction, accessibility, and design deliverables          |
| `03-azure-platform-costs.md`   | Hosting architecture, verified platform facts, cost model, and operating guardrails                          |
| `04-open-questions.md`         | Pending decisions, responsible decision-makers, recommended defaults, external reviews, and discovered facts |

The records may link to each other and to resolved decisions, but the detailed rationale remains in the owning record.

## Decision Lifecycle

`docs/04-open-questions.md` is the live backlog. It remains grouped by board, development, external-review, and fact-finding responsibilities.

When a question is resolved:

1. Add an entry to `docs/decisions/README.md` with its identifier, outcome, decision owner, date, evidence, and links to the detailed source record.
2. Update every design record whose implementation or scope depends on the result.
3. Mark the source open question resolved with a short link to the decision entry; preserve its original context and recommendation.
4. Keep a decision that requires qualified advice marked as requiring external review until that advice and the resulting outcome are recorded.

The decision index is a register, not an alternate architecture document. It records conclusions and points readers to their rationale.

## Delivery Checklist

`docs/decisions/delivery-checklist.md` records accountable evidence for prerequisites, including:

- Named maintainer and backup maintainer.
- Nonprofit ownership and two named owners for the GitHub organization and Azure subscription.
- Grant activation and renewal ownership.
- Domain registrar and DNS control.
- Budget alerts, log-ingestion caps, and non-production shutdown automation.
- Backup restore rehearsal.
- Required privacy, licence, and accessibility reviews.

Each checklist item has a phase or launch deadline, a named owner, a status, and evidence. It does not repeat the full rationale from the platform or open-questions records.

## Migration Scope

The organization change will:

1. Replace the empty root README with the decision-first entry point.
2. Move the four numbered design documents into `docs/` and clarify the platform filename.
3. Add the decision index and delivery checklist.
4. Add targeted internal links and concise resolved-status references.
5. Preserve all current substantive recommendations and external source links.

It will not add production data, rewrite design conclusions, or change unrelated worktree files.

## Validation

- Every internal Markdown link resolves.
- The README, open-question backlog, decision index, and delivery checklist agree on the four critical-path blockers.
- Each major decision has one detailed source of rationale and one concise status entry.
- No document contains unresolved placeholders such as `TBD` or `TODO`.
- The repository contains no production contact information.