o to https://github.com/EstuaryHub/estuary-hub-design and create the following 10 issues. Use the exact titles, labels, and body text below for each one.

Issue 1
Title: Decide on database technology (SQLite vs Cosmos DB vs Postgres)
Labels: decision, backend, needs-discussion
Body:
We need to settle on a data storage approach before building out the dynamic member/admin app.

Options on the table:

SQLite + Entity Framework — simplest, but need to solve file storage/locking across nodes (e.g., exposing blob storage to a single process)
Cosmos DB (free tier) + Entity Framework — need to confirm EF Core support/patterns for Cosmos
Postgres Flexible Server — more standard relational option, but not free

Acceptance criteria: a documented recommendation with cost estimate and any lock-in tradeoffs, reviewed by Joseph, Nathan, and Jason.

Issue 2
Title: Confirm nonprofit/free-tier pricing assumptions (Azure)
Labels: research, infra, cost
Body:
Several Azure "free" claims need verification before we build around them (e.g., "Azure SQL Database free tier" appears to be free only in year one, not indefinitely).

Tasks:

Verify actual limits/duration for Azure SQL free tier, Cosmos DB free tier, Static Web Apps free plan, Key Vault, Blob Storage, transactional email service
Document what happens when free-tier limits are exceeded
Note nonprofit-specific credit ($2,000 Azure nonprofit grant mentioned) and how it applies

Issue 3
Title: Evaluate multi-cloud approach (Azure + Google nonprofit stack)
Labels: decision, infra, needs-discussion
Body:
Nathan raised using Google Cloud nonprofit offerings alongside Azure to reduce cost, since the app will be containerized.

Google options to evaluate:

Google Workspace (nonprofit) for email/login
Gmail-based user login (vs. building our own identity flow)
Google Maps API nonprofit credits
Google Ad Grants (~$10K/month ad spend for nonprofits)

Acceptance criteria: a short writeup on which pieces (if any) make sense to run on GCP vs. keeping everything on Azure, and how IaC would handle a multi-cloud split.

Issue 4
Title: Build static front end (MVP 1.0) on Azure Static Web Apps
Labels: frontend, mvp
Body:
Stand up the public-facing site on the Azure Static Web Apps free tier as the first deliverable, so we can get board and designer (Rachel/Emily) input early without touching the dynamic backend yet.

Tasks:

Scaffold static site project structure in the repo
Confirm free tier supports our expected traffic/custom domain/TLS needs
Determine how to add analytics (Google Analytics or equivalent) since native traffic tracking may not be available on the free tier
Migrate/rewrite existing copy from the current Wix site as needed
Placeholder buttons/sections for future dynamic features

Issue 5
Title: Set up dev/prod environment strategy
Labels: infra, blocker
Body:
We need a plan for how local development, containerization, and eventual cloud deployment will work together — including whether to invest in Infrastructure as Code (IaC) now or defer it.

Tasks:

Schedule working session with Dan (experienced with Blazor + env setup) — Joseph & Nathan
Decide: build/demo locally only for now, vs. stand up a minimal cloud dev environment early
Document containerization approach (so it's portable to Azure or GCP if needed)

Issue 6
Title: Link Azure tenant to domain and set up org accounts
Labels: infra, admin
Body:
The Azure tenant exists but isn't linked to the estuaryhub.com domain yet, which blocks creating any real user accounts/logins.

Tasks:

Link domain to Azure tenant
Decide on Google Workspace vs. other option for org email addresses (e.g., nathan@estuaryhub.com)
Set up a contributor-level account separate from personal owner accounts (currently Joseph and Jason are both owners)

Issue 7
Title: Pursue nonprofit/discount pricing for AI tools + GitHub Copilot
Labels: research, tooling, cost
Body:
Tasks:

Check whether GitHub for Nonprofits includes Copilot
Research nonprofit/discount pricing for OpenAI, Claude, and Grok
Confirm with John (board) before formally applying using org nonprofit paperwork
Decide on billing/reimbursement approach if team members want individual subscriptions

Issue 8
Title: Governance — licensing, maintenance, and succession plan
Labels: governance, board, needs-discussion
Body:
Before launch, the board needs clarity on:

Open-source license selection
Contributing documentation/guidelines
Trusted-committer list / what happens if a maintainer steps back
Accessibility obligations
Data protection compliance (GDPR applies — some members are UK-based)

Issue 9
Title: Board/design liaison and rollout plan
Labels: process, design
Body:
Tasks:

Jason to formally reconnect with Rachel and Emily as brand/design leads and board liaisons
Invite Rachel and Emily to join the second half of an upcoming team call to preview progress before a full board presentation
Define what "showing the board something" looks like at each milestone (static site demo, then dynamic app demo)

Issue 10
Title: Explore recurring donor support ("Sponsor your local Estuary")
Labels: feature, fundraising, needs-discussion
Body:
Board previously discussed a small recurring-donation option (e.g., $5/month) but didn't finalize due to the platform migration in progress. Revisit once the static site is live and there's a natural place to add a donate/sponsor CTA.

If any of these labels don't already exist in the repo, create them first, then apply them to the matching issue.