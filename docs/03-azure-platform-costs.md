# Estuary Hub — Azure Platform and Costs

Sep 26, 2026 · @joseph · Companion to the Application Design · For the development team and the treasurer

## Related Records

- [Open Questions](04-open-questions.md)
- [Decision Register](decisions/README.md)

## The budget

The Azure nonprofit grant is **$2,000 in sponsorship credits per year** — about $167 a month. The architecture below fits inside it with room to spare, and the database is the line item that decides whether it stays that way.

Four terms of the grant shape the design more than the dollar figure does.

| Term | Consequence |
| --- | --- |
| Credits must be activated within 90 days of issue | Start the clock deliberately, in Phase 0, not the moment someone gets curious |
| One-year term, renewed by responding to renewal emails | A named person owns that renewal, with a calendar reminder. Missing it converts the subscription to pay-as-you-go |
| Credits do not roll over | No banking an underspend for a future year |
| First-party Azure services only — no reserved instances, no third-party marketplace, **no support plans** | Production incidents are the team's own problem. This is why the plan has a runbook rather than a support contract |

GitHub is separate and also free: verified 501(c)(3) organisations get the **GitHub Team plan at no cost**, or 25% off Enterprise Cloud. Worth knowing that public repositories already get Actions on standard runners free, so for an open-source project the Team plan mainly buys private repos and organisation controls rather than CI minutes.

Both grants require validated nonprofit status, so the validation is the real long pole in Phase 0, not the applications themselves.

## Reference architecture

Sized for a few hundred members and a directory in the low hundreds of records. Everything except the database lands inside a free allowance at this scale.

| Concern | Service | Free allowance | Verdict |
| --- | --- | --- | --- |
| Static public site | Azure Static Web Apps, Free plan | 100 GB bandwidth/month, 2 custom domains, free auto-renewing TLS, globally distributed | Free |
| Application and API | Azure Container Apps, Consumption | 180,000 vCPU-seconds, 360,000 GiB-seconds, 2M HTTP requests per subscription per month | Free at this traffic |
| Database | Azure Database for PostgreSQL Flexible Server | None — not on the always-free list | **The only real cost** |
| Identity | Microsoft Entra External ID | First 50,000 monthly active users | Free |
| Maps and geocoding | Azure Maps, Gen2 | 5,000 Search and 5,000 base-map-tile transactions/month; 15 tiles per tile transaction, so 75,000 tiles | Free at this scale |
| Transactional email | Azure Communication Services Email | Priced per message and per MB | Cents |
| Files | Azure Blob Storage | Priced per GB | Cents |
| Secrets | Azure Key Vault with GitHub OIDC federation | Negligible | Near-free |
| Observability | Application Insights / Log Analytics | Free amounts per feature | **Cap it on day one** |
| Infrastructure as code | OpenTofu | n/a | An open-source project should be reproducible by anyone who clones it |

PostGIS is supported on Azure Database for PostgreSQL Flexible Server (version 3.5.2 on PostgreSQL 13 and above), so the radius search is a native spatial query rather than something bolted on in application code. That is the main reason Postgres is the recommendation.

On infrastructure as code: OpenTofu keeps the "clone it and run it" promise true without a licence asterisk, which matters for an open-source project. Bicep is a perfectly good substitute if the team would rather stay first-party.

One refinement to the table above, argued in full under Options: the **public directory does not read from the database at runtime**. It is built into a static JSON artifact at deploy time and served from the CDN alongside the public pages, with the geo search running in the browser. The database remains the source of truth and serves the member area, admin and API — but it sits off the hot path, which is why a burstable tier is comfortable here.

## The static/dynamic split

Serve the public pages from Static Web Apps and the application from Container Apps. This is the single decision that gives an always-on public face for nothing.

Container Apps scales to zero, which is what keeps it free — but a scaled-to-zero app cold-starts on the first request. For a newcomer arriving from a search engine, that first request is the whole impression. The obvious fix, pinning one replica so it never sleeps, does not survive contact with the free grant.

**The arithmetic.** The minimum Container Apps replica is 0.25 vCPU and 0.5 GiB. A 30-day month is 2,592,000 seconds.

| Meter | One always-on minimum replica | Free grant | Over by |
| --- | --- | --- | --- |
| vCPU-seconds | 0.25 × 2,592,000 = 648,000 | 180,000 | 3.6× |
| GiB-seconds | 0.5 × 2,592,000 = 1,296,000 | 360,000 | 3.6× |

Put another way, the free grant covers about **8.3 days** of one always-on replica, not a month.

A static site has no process to keep warm — it is files on a CDN, so it is always on by construction and there is no setting to enable. Static Web Apps therefore gives the public site zero cold start at zero cost, while Container Apps keeps scale-to-zero for the directory, member area and API, where the first-request delay is tolerable and daytime traffic keeps it warm anyway.

**Two caveats.** Idle replicas bill at a reduced *rate*, but the grant is denominated in seconds and the documentation does not say whether idle seconds draw it down proportionally — verify before relying on it. And a public site takes enough bot traffic that "truly idle" (under 0.01 vCPU and 1,000 bytes/second) may be rarer than expected.

One constraint to note: Static Web Apps' Free plan supports only preconfigured identity providers. If the static front ever needs sign-in through your own Entra External ID tenant, that requires the Standard plan. Keeping authentication entirely on the Container Apps side avoids the question.

## Options and trade-offs

Five decisions where a reasonable team could choose differently.

**Compute.** Container Apps is recommended: container-based, so a contributor runs the same image locally that runs in production — which matters more for an open-source project than for a closed one. App Service is simpler but its Free tier is disqualified three ways (Always On requires Basic or higher, a 60-minute-per-day CPU quota, and no custom-domain SSL on Free or Shared), so it means paying for Basic. Kubernetes is the wrong shape at this scale; the cluster management is free but the nodes are not, and the operational cost lands on volunteers.

**Database — and the framing matters more than the engine.** This was originally posed as Postgres versus Azure SQL. That question was too narrow, because it assumed one store holds everything.

Start with the size. The entire public directory as it renders today — 54 groups and 106 leader entries — is about **26 KB of text**, under 10 KB compressed. That is a fraction of one photograph on the home page. Writes are a handful per week. Almost every read is "show me groups near this postal code."

At that size the public directory does not need a database. It needs a file. Splitting the data by sensitivity makes the engine choice much less consequential:

|  | Public directory | Private member data |
| --- | --- | --- |
| Contents | Groups, publicly listed leaders | Profiles, applications, consent events, relay messages |
| Size | \~26 KB | Small, and growing slowly |
| Visibility | Public by definition | Must never be public |
| Read pattern | Constant — the hot path | Rare, by few people |
| Needs | Moderation, audit trail, geo search | Access control, deletion, export |

| Option | Cost | Public directory | Private data | Main objection |
| --- | --- | --- | --- | --- |
| Static JSON on the CDN, search in the browser | $0 | Excellent | No | Holds nothing private or writable |
| Git as source of truth, CI rebuilds the site | $0 | Excellent | No | Leaders are not developers; needs a git-backed CMS over it |
| PostgreSQL Flexible Server + PostGIS | The main recurring line item | Good | Good | The only option with a standing bill |
| Azure SQL Database, free tier | $0 within the allowance | Good, native `geography` | Good | Proprietary; contributors cannot readily self-host |
| Azure Cosmos DB, free tier | $0 within 1,000 RU/s and 25 GB | Good, has geo indexing | Workable | Document model fights a relational schema; admin reports get awkward |
| Azure Table Storage | Pennies | Workable | Workable | No joins, no ad-hoc queries; poor developer ergonomics |
| SQLite | Varies | Good | Good | Unsafe on Container Apps — see the section below |
| Managed Postgres off Azure (Neon, Supabase) | Free tier | Good | Good | A nonprofit platform resting on a startup's free tier, outside the grant |
| Airtable or Google Sheets | Free tier | Workable | **No** | 150 people's contact details in a service the board does not control |

On the Azure SQL free allowance: 100,000 serverless vCore-seconds a month is roughly 55 hours of active compute at the 0.5 vCore serverless minimum, so it leans entirely on auto-pause suiting the traffic pattern. I have not verified the minimum vCore for that offer — check it against real traffic before treating the tier as comfortably free.

**Recommendation: split the data, then keep one engine behind it.** Serve the public directory as a **static JSON artifact built at deploy time**, with the geo search running in the browser. At 26 KB that beats any database round trip, costs nothing, cannot leak private data because it contains none, and keeps working if the backend is down. Keep **PostgreSQL as the single source of truth** behind it — one schema, one migration path, one backup, one engine contributors run locally — and generate the static file from it.

Two alternatives deserve a real hearing rather than a dismissal. **Azure SQL's free tier** would zero out the only recurring cost; the objection is portability, not capability. And **git as the source of truth for the public directory** is unusually well matched here — moderation becomes pull request review, the audit log becomes git history, backup becomes every clone, all free and already built on a platform the project is already using. Its limit is hard rather than soft: private member data cannot live in a public repository, so it solves half the problem and leaves the other half needing a store anyway.

**Database sizing.** Burstable (B-series) fits a directory this size, but Microsoft's own guidance is blunt: burstable is "primarily designed for nonproduction scenarios," does not qualify for 24/7 support, and can become unreachable if CPU credits deplete under sustained load. For a few hundred users that is an acceptable trade with an alert on CPU credits remaining. Note that B1ms caps at 35 user connections, so pool connections in the application rather than opening one per request.

**Identity.** Entra External ID, free to 50,000 monthly active users — effectively free forever at this scale, with social providers included. The legacy Azure AD B2C carries the same 50,000 MAU allowance; External ID is its successor and the right choice for a new build.

**Maps.** Azure Maps covers both geocoding and tiles inside one free allowance. Geocode once at import and cache the coordinates in the database, and allow a manual latitude/longitude override on any record — international geocoding is uneven, and a third of the leader list is outside the US.

## SQLite on Azure

SQLite is a better fit for this **data** than people assume, and a worse fit for this **hosting model** than people assume. Those two facts pull in opposite directions, and the hosting one wins.

**The workload is not the objection.** SQLite's own documentation says it handles most sites under 100,000 hits a day and has been demonstrated at ten times that; sqlite.org itself serves 400,000–500,000 HTTP requests a day on SQLite. This directory is 54 groups, a few hundred members, overwhelmingly read-heavy, with writes measured in a handful per week. Nobody should dismiss SQLite here on performance grounds — it would be comfortable.

Even the spatial argument is weaker than it looks. PostGIS is genuinely nice, but at 54 rows a full table scan computing great-circle distance in application code takes microseconds. Spatial indexing is not what decides this.

### The actual constraint

SQLite needs a real local filesystem and exactly one writer. Azure Container Apps offers neither.

Container Apps has three storage types. Container-scoped storage disappears when the container restarts. Replica-scoped storage (`EmptyDir`) survives only for the life of the replica. The **only** persistent option is an Azure Files mount — and Container Apps does not support mounting Blob Storage or NetApp Files, so Azure Files over SMB or NFS is the whole menu.

That is precisely the configuration SQLite's documentation tells you to avoid. Its guidance on network filesystems is unambiguous: file locking is buggy in many implementations, performance suffers from latency, and simultaneous modification risks corrupting the database. Add scale-to-zero and the possibility of two replicas, and you have multiple writers against one file over SMB — the textbook corruption scenario.

### Four ways to host it

| Configuration | Works? | Notes |
| --- | --- | --- |
| SQLite on an Azure Files mount | **No** | The obvious path and the wrong one. Network filesystem locking plus possible multiple replicas. Do not ship this |
| SQLite on ephemeral disk + Litestream replication to Blob Storage | Yes, with care | Database lives on a proper local filesystem; a sidecar streams changes to object storage and restores on start. Requires max replicas pinned to 1, and you can lose the last few seconds of writes on an ungraceful shutdown |
| Single VM with a managed disk | Yes | A real block device; SQLite behaves perfectly. You now patch an OS, own your own backups, and lose scale-to-zero |
| Read-only SQLite published as a build artifact | Yes | Rebuild a read-only directory file whenever a listing changes; no locking problem at all. But submissions, members, applications and relay messages still need somewhere writable — this is a cache, not a database |

### It probably doesn't save money

This is the non-obvious part. SQLite removes the Postgres line item but adds cost elsewhere, because every viable configuration forces an always-on component.

The Litestream approach needs max replicas of one and effectively a warm instance. One always-on minimum replica is 648,000 vCPU-seconds against a 180,000 free grant — 3.6× over, as computed above. A single VM plus a managed disk lands in the same neighbourhood as burstable Postgres once you include the disk. The read-only-artifact approach still needs a writable store, so it saves nothing on its own.

There is one configuration that is genuinely cheaper: **one small VM running both the application and SQLite**, with no Container Apps and no managed database. That is how a great many small nonprofits actually run, and it is not a foolish answer. The trade is that a volunteer team with no Azure support plan takes on OS patching, backup verification and restore rehearsal — all of which managed services were doing for free.

### Where SQLite genuinely wins here

Local development and CI. A contributor clones the repository and runs the full test suite with no database to install, no container to start, no connection string. For an open-source project trying to lower the barrier to a first contribution, that is a real benefit.

The trap is using SQLite in development and Postgres in production. Dialect drift produces bugs that appear only after deploy — different type affinities, different constraint enforcement, different date handling — and they surface in the environment with no support plan. Run the same engine everywhere; Postgres in a container is one command, and the setup cost is paid once per contributor rather than every release.

### Recommendation

Keep Postgres, unless the team is willing to change the hosting model with it. SQLite is a legitimate choice for a single always-on instance with a real block device, and an unsafe one on serverless container hosting whose only persistent storage is a network file share. The architecture chose Container Apps for reasons that still hold, and SQLite does not fit inside that choice.

If the team wants to revisit this, revisit it as a **whole-architecture** question — one VM, one file, one process, own your own backups — rather than as a database swap underneath the current design. That version is coherent. The halfway version, SQLite on a file share behind autoscaling containers, is the one that corrupts data at an inconvenient moment.

## Cost model

The shape is reliable; the dollar figures should be your own. Azure pricing moves, and SKU prices vary by region, so run the actual configuration through the pricing calculator before committing.

| Line item | Basis | Expected monthly |
| --- | --- | --- |
| Static Web Apps | Free plan, within 100 GB bandwidth | $0 |
| Container Apps | Scale-to-zero, within the free grant | $0 |
| Entra External ID | Far below 50,000 MAU | $0 |
| Azure Maps | Geocode once at import; well under 5,000 searches and 75,000 tiles | $0 |
| Blob Storage | A few hundred MB of PDFs | Under $1 |
| Container Registry | Basic tier | A few dollars |
| ACS Email | \~2,000 messages/month at $0.00025 each, plus data transfer | Under $1 |
| Key Vault | Operation-based | Under $1 |
| **PostgreSQL Flexible Server** | Burstable, plus storage and backup | **The figure that decides the budget** |
| Application Insights | Ingestion volume | $0 if capped, unbounded if not |

**The email arithmetic**, as a worked example of how small the variable costs are: 2,000 messages at $0.00025 is $0.50, and 2,000 messages averaging 50 KB is 100 MB at $0.00012 per MB, which is about 1.2 cents. Call it 51 cents a month. Transactional email is not a cost concern here.

**Where the money actually goes.** Three environments, but only production needs to run continuously. Development and staging databases can be stopped when idle — Flexible Server bills no compute while stopped, and a server stays stopped for up to seven days before restarting. Used deliberately, that is the single largest lever on the non-production spend.

One likely surprise: at this scale the cloud bill is dominated by things that are on all the time, not by traffic. Doubling the number of groups in the directory changes almost nothing. Adding a second always-running database changes a lot.

## Budget guardrails

Five specific ways a $2,000 grant gets drained. None of them is application traffic.

**1. Observability ingestion.** Application Insights bills on data volume, and a chatty application in a debug configuration can outspend the database. Set a daily ingestion cap **before anything is generating logs**, not after the first surprise. This is the most common way a small Azure budget disappears.

**2. Anything that forces a virtual network.** Container Apps environments are free at rest, but VNet integration, private endpoints and load balancers all add charges. Putting the database behind a private endpoint is a defensible security position and a real line item — price it as a decision rather than adopting it as a default.

**3. Non-production environments left running.** Two idle databases cost as much as one busy one. Stop development and staging servers when not in use, and automate it rather than relying on someone remembering.

**4. The renewal.** Credits do not roll over and renewal depends on someone answering an email. A missed renewal converts the subscription to pay-as-you-go with a live credit card behind it.

**5. Burstable CPU credit exhaustion.** Not a cost risk so much as an availability one, but it arrives looking like a cost decision: if credits deplete, the server can become unreachable, and the fix is a larger SKU.

| Guardrail | Set up in |
| --- | --- |
| Daily cap on Log Analytics ingestion | Phase 1, before first deploy |
| Budget alerts at 50% and 80% of the annual grant | Phase 1 |
| Auto-stop for non-production databases | Phase 1 |
| Alert on PostgreSQL CPU credits remaining | Phase 1 |
| Calendar reminder for grant renewal, owned by a named person | Phase 0 |

All five are cheap to set up in the first week and expensive to retrofit after an incident.

## Always-free services worth knowing

Azure lists 65 always-free services. These are the ones that bear on this build, with the monthly amount each carries.

| Service | Free monthly amount |
| --- | --- |
| Azure Container Apps | 180,000 vCPU-seconds, 360,000 GiB-seconds, 2 million requests |
| Static Web Apps | 100 GB bandwidth per subscription, 2 custom domains, 0.5 GB storage per app |
| Azure Functions | 1 million requests |
| Azure Maps | 1,000–5,000 transactions depending on the feature |
| Microsoft Entra ID | 50,000 stored objects with single sign-on |
| Azure Active Directory B2C | 50,000 monthly active users |
| Bandwidth (data transfer) | 100 GB outbound |
| Azure Private Link | Free (private *endpoints* still bill separately) |
| Azure Virtual Network | 50 virtual networks |
| Azure SQL Database | 10 databases, 100,000 serverless vCore-seconds, 32 GB each |
| Azure Cosmos DB | 1,000 RU/s provisioned, 25 GB storage |
| Event Grid | 100,000 operations |
| API Management | 1 million calls on the Consumption tier |
| App Configuration | 1,000 requests/day, 10 MB storage |
| Azure DevOps | 5 users, unlimited private Git repos |
| Microsoft Cost Management | Free |
| Microsoft Defender for Cloud | Free policy assessment and recommendations |
| Azure Advisor | Unlimited |
| Azure Monitor | Free amounts vary per feature — check before relying on it |

**Read the amounts carefully.** About a dozen entries on the full list are free *control planes* rather than free services — AKS, Azure Arc, Deployment Environments, Automanage, VM Image Builder and Resource Mover all cost nothing themselves while the resources they create bill normally. App Service appears on the list but its free tier caps at one hour of compute per day, which rules it out for production whatever the row implies.

Two entries on Microsoft's own page are visibly inconsistent: Content Safety displays the AKS description, and Cloud Shell is tagged always-free while describing a 12-month allowance. Treat the list as a map and confirm anything load-bearing on the service's own pricing page.

## What is verified, and what is not

Every figure in this document came from first-party Microsoft or GitHub documentation on 26 September 2026, not from recollection. Three things are worth flagging as unconfirmed, because the plan leans on them.

| Claim | Status |
| --- | --- |
| Grant amount, term, activation window, exclusions | Verified — Microsoft Learn |
| Free allowances for Container Apps, Static Web Apps, Entra External ID, Azure Maps | Verified — first-party pricing and billing docs |
| PostGIS availability and version on Flexible Server | Verified — Microsoft Learn extensions list |
| Container Apps minimum replica size and the resulting arithmetic | Verified; the arithmetic is shown above so it can be checked |
| **How always-free allowances behave under an Azure Sponsorship subscription specifically** | **Not verified.** Microsoft's framing is that they continue "for as long as you have an Azure account," but a sponsorship subscription is a distinct offer. Confirm the two or three you depend on |
| **Whether idle Container Apps seconds draw down the free grant proportionally** | **Not verified.** Idle replicas bill at a reduced rate, but the grant is denominated in seconds |
| **SKU-level prices in your region** | **Not priced.** Azure pricing moves; run the real configuration through the calculator |

A fourth item is out of scope for me entirely. Publishing the names, emails and approximate locations of leaders in Canada, Europe and Australia on a new platform touches data-protection law — GDPR at minimum. I have not summarised those obligations here because I would be guessing at the specifics. Get a qualified read before importing the contact list. It is not a blocker for building; it is a blocker for launching with the existing list imported wholesale.

## Sources

All retrieved 26 September 2026.

- [Activate your Azure grant](https://learn.microsoft.com/en-us/industry/nonprofit/microsoft-for-nonprofits/claim-activate-nonprofit-azure-grant) — $2,000/year sponsorship, 90-day activation window, no rollover, first-party services only, support plans excluded
- [Nonprofit offerings and products](https://learn.microsoft.com/en-us/industry/nonprofit/microsoft-for-nonprofits/nonprofit-offerings-products)
- [GitHub for Nonprofits quickstart](https://docs.github.com/en/nonprofit/quickstart) — free Team plan or 25% off Enterprise Cloud for verified 501(c)(3) organisations
- [Microsoft Entra External ID pricing](https://azure.microsoft.com/en-us/pricing/details/microsoft-entra-external-id/) — first 50,000 MAU free
- [Billing in Azure Container Apps](https://learn.microsoft.com/azure/container-apps/billing) — 180,000 vCPU-seconds, 360,000 GiB-seconds, 2M requests free monthly
- [Containers in Azure Container Apps](https://learn.microsoft.com/azure/container-apps/containers#configuration) — minimum replica 0.25 vCPU / 0.5 GiB
- [Understanding Azure Maps transactions](https://learn.microsoft.com/en-us/azure/azure-maps/understanding-azure-maps-transactions) — 15 tiles per tile transaction
- [Azure Static Web Apps hosting plans](https://learn.microsoft.com/azure/static-web-apps/plans) and [quotas](https://learn.microsoft.com/azure/static-web-apps/quotas) — Free plan limits, no SLA, custom providers require Standard
- [Compute options in Azure Database for PostgreSQL flexible server](https://learn.microsoft.com/azure/postgresql/compute-storage/concepts-compute) — burstable guidance and connection limits
- [PostgreSQL extensions by engine version](https://learn.microsoft.com/azure/postgresql/extensions/concepts-extensions-by-engine) — PostGIS support
- [Email pricing in Azure Communication Services](https://learn.microsoft.com/azure/communication-services/concepts/email-pricing)
- [Azure subscription and service limits — App Service](https://learn.microsoft.com/azure/azure-resource-manager/management/azure-subscription-service-limits#azure-app-service-limits) — Always On requires Basic or higher
- [Explore free Azure services](https://azure.microsoft.com/en-us/pricing/free-services/) — the always-free catalogue

* [Use storage mounts in Azure Container Apps](https://learn.microsoft.com/azure/container-apps/storage-mounts) — ephemeral vs Azure Files persistence; Blob Storage and NetApp Files mounts are not supported
* [Appropriate uses for SQLite](https://www.sqlite.org/whentouse.html) — the network filesystem warning, the single-writer limit, and the traffic levels SQLite handles comfortably
