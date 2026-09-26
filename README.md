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