# Estuary Hub Design

Estuary Hub is a sanctioned, nonprofit-backed, open-source rebuild of estuaryhub.com. This repository holds its design: what the product does, how it will be built, and the decisions still open.

## The product in one table

Estuary Hub is two products, each with an MVP and a V1.

| | MVP | V1 |
| --- | --- | --- |
| **Public site.** No sign-in; anyone can use it | **Static MVP.** Find a group near you and contact its leader privately. No email address is ever published. | **Static V1.** Trained leaders nearby, "tell us you're interested", German, and listing freshness shown |
| **Application.** Signed in: leaders, members, administrators | **App MVP.** Leaders claim and edit their own listings, ELSNet applications are tracked, administrators get a review queue | **App V1.** Member profiles with field-by-field privacy, the member finder, reports, stale-listing review; the Wix member area retired |

**Order:** Static MVP ships first and on its own. Static V1 and App MVP follow in parallel. App V1 comes last. See the [Roadmap](docs/product/roadmap.md).

## Current status

The design is ready for review and decisions. Nothing is approved for implementation.

To start the **Static MVP build**, these must be settled:

1. The release order: Static MVP ships alone ([P1](docs/decisions/open-questions.md#p1-does-the-static-mvp-ship-first-and-on-its-own--blocking))
2. A maintainer for the public site ([B3](docs/decisions/open-questions.md#b3-who-maintains-this-after-launch--blocking))
3. The GitHub organisation and Azure subscription owned by the nonprofit, with two named owners each ([B2](docs/decisions/open-questions.md#b2-who-owns-the-accounts--blocking))
4. The licence ([B1](docs/decisions/open-questions.md#b1-which-licence--blocking))

The [question index](docs/decisions/open-questions.md#question-index) shows what each later release is waiting on.

## Who owns what

| Owner | Decides | Owns these documents |
| --- | --- | --- |
| **Product owners.** Estuary leadership and community members | What each release does and for whom; P-questions | [`docs/product/`](docs/product/) |
| **Board** | Licence, accounts, maintainer, data stewardship; B-questions | Decisions in [`docs/decisions/`](docs/decisions/) |
| **Estuary Technology team.** Technical product owners | How each release is built; D-questions | [`docs/technical/`](docs/technical/) |

## Reading paths

**Product owners:**

1. [Roadmap](docs/product/roadmap.md): the four releases and what you are asked to decide
2. [Public Site](docs/product/static-site.md): Static MVP and Static V1
3. [Member and Admin Application](docs/product/application.md): App MVP and App V1
4. [Open Questions: for the product owners](docs/decisions/open-questions.md#for-the-product-owners)

**Board:** [Open Questions](docs/decisions/open-questions.md#for-the-board), then the [Decision Register](docs/decisions/README.md) and [Delivery Checklist](docs/decisions/delivery-checklist.md).

**Technology team:**

1. [Roadmap](docs/product/roadmap.md), for scope and order
2. [Requirements by Release](docs/technical/requirements-by-release.md): what each release must guarantee, and the seam between the two products
3. [Application Architecture](docs/technical/application-architecture.md) and [Azure Platform and Costs](docs/technical/azure-platform-and-costs.md): the current proposal for meeting them
4. [Open Questions: for the development team](docs/decisions/open-questions.md#for-the-development-team)

**Designers:** [Interface Design Brief](docs/product/interface-design-brief.md), then the two product documents.

## Repository map

```text
docs/
  product/                        owned by the product owners
    roadmap.md                    the four releases, their order, and the gaps each closes
    static-site.md                Static MVP and Static V1 functions (S1–S17)
    application.md                App MVP and App V1 functions (A1–A17)
    interface-design-brief.md     experience, brand, accessibility, design deliverables
  technical/                      owned by the Estuary Technology team
    requirements-by-release.md    guarantees per release (G, SM, SV, AM, AV) and the seam contract
    application-architecture.md   end-state data model, modules, API, non-functional requirements
    azure-platform-and-costs.md   hosting, verified platform facts, costs, guardrails
  decisions/                      shared
    open-questions.md             live backlog: P, B, D, X questions and F facts
    README.md                     decision register: resolved outcomes
    delivery-checklist.md         prerequisites per release, with owners and evidence
  superpowers/                    working records from design sessions (not authoritative)
```

## How a decision moves

1. It is raised in [Open Questions](docs/decisions/open-questions.md) with a recommended default, under the group that decides it.
2. If nobody objects, the default stands. Otherwise the owner decides.
3. The outcome is recorded in the [Decision Register](docs/decisions/README.md), and every document that depends on it is updated.

## Ground rules

- **No production data in this repository, ever.** It is public, and the real directory holds around 150 people's contact details. Only synthetic seed data.
- **No email address or phone number is ever rendered** by either product.
- Licence and data-protection notes describe common practice. They are not legal advice.
